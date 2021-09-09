import React from 'react'
import {render, fireEvent} from '@testing-library/react'
//import {prettyDOM} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('Blog component', () => {
  let component
  const messageHandler = jest.fn()
  const removeButton = jest.fn()
  const likeButton = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 20,
      user: {name: 'name'}
    }
     
    component = render(
      <Blog blog={blog} 
        likeHandler={likeButton}
        removeHandler={removeButton}
        messageHandler={messageHandler} />
    )
  })
  describe('Blog renders correctly', () => {

    test('<Blog /> Shows only title and author in preview', () => {
      const url = component.queryByText('url')
      expect(url).toBeNull() // it doesn't exist

      const user = component.queryByText('name')
      expect(user).toBeNull() // it doesn't exist

      const likes = component.queryByText('20')
      expect(likes).toBeNull() // it doesn't exist

      expect(component.container).toHaveTextContent(
        'title'
      )
      expect(component.container).toHaveTextContent(
        'author'
      )
    })

    test('<Blog /> Shows also url and likes in fullview', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      expect(component.container).toHaveTextContent(
        'title'
      )
      expect(component.container).toHaveTextContent(
        'author'
      )
      expect(component.container).toHaveTextContent(
        'likes: 20'
      )
      expect(component.container).toHaveTextContent(
        'name'
      )
      const like = component.getByText('like')
      expect(like).toBeDefined()
    })
  })

  test('If like button is clicked twice likeHandler is called twice', () => {
    
    const preview = component.container.querySelector('.preview')
    expect(preview).toBeDefined()

    const view = preview.querySelector('button')
    expect(view).toBeDefined()
    fireEvent.click(view)

    const like = component.container.querySelector('.likeButton')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(likeButton.mock.calls).toHaveLength(2)
  })
})