///<reference types='cypress' />
import authorization from '../../src/utils/authorization'

const user = {
  username: 'visitor',
  name: 'visitor',
  password: 'letmein'
}

Cypress.Commands.add('typeLogin', (user) => {
  cy.get('#username').type(user.username)
  cy.get('#password').type(user.password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'http://localhost:3003/api/login', user)
    .then(response => {
      authorization.setUser(response.body)
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({title, author, url}) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {title, author, url},
    headers: authorization.authHeader().headers
  })
  cy.visit('http://localhost:3000')
})

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.typeLogin(user)
      cy.contains('visitor logged in')
    })

    it('fails with wrong credentials', function () {
      cy.typeLogin({username: 'Iines', password: 'letmein'})
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'visitor logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user)
      cy.contains('visitor logged in')
    })

    describe('create and remove blog', () => {
      it('A blog can be created', function () {
        cy.get('#toggle-button').click()
  
        cy.get('#titleInput').type('Lame Test Blog')
        cy.get('#authorInput').type('no-one')
        cy.get('#urlInput').type('http://mockurl.com/')
  
        cy.get('#submit-blog').click()
  
        cy.get('.success')
          .should('contain', 'Lame Test Blog by no-one added')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.contains('Lame Test Blog')
      })

      it('A blog can be removed', function () {
        cy.createBlog({title: 'Blog to be removed', author: 'no-one', url: 'http://mockurl.com/'})
        cy.contains('Blog to be removed').parent().find('#view').click()
        cy.get('.preview').parent().find('.remove-button').click()
      })
    })

    describe('like blog', () => {
      it('like', function () {
        cy.createBlog({title: 'Blog to be liked', author: 'no-one', url: 'http://mockurl.com/'})
        cy.contains('Blog to be liked').parent().find('#view').click()
        cy.get('.likeButton').click()

        cy.get('.blog')
          .should('contain', 'likes: 1')
      })
      
      it('sort', function () {
        cy.createBlog({title: 'A-blog', author: 'no-one', url: 'http://mockurl.com/'})
        cy.createBlog({title: 'B-blog', author: 'no-one', url: 'http://mockurl.com/'})

        // A-blog should be first
        cy.get('.preview-blog:first')
          .should('contain', 'A-blog')

        // Open both blogs
        cy.contains('A-blog').parent().find('#view').click()
        cy.contains('B-blog').parent().find('#view').click()
        
        // Like B-blog
        cy.get('.likeButton:last').click()

        cy.wait(500)

        // B-blog should be first of class 'blog' to be found
        cy.get('.blog:first')
          .should('contain', 'B-blog')

        // A-blog should be last of class 'blog' to be found
        cy.get('.blog:last')
          .should('contain', 'A-blog')
      })
    })
  })
})