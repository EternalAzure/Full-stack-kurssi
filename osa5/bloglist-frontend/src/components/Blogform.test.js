import React from 'react'
import {render, fireEvent} from '@testing-library/react'
//import {prettyDOM} from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  let component
  const messageHandler = jest.fn()
  const createHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <BlogForm messageHandler={messageHandler} createHandler={createHandler} />
    )
  })
  
  describe('Everything is rendered', () => {
    test('buttons are rendered', () => {
      const cancel = component.queryByText('cancel')
      expect(cancel).toBeDefined() // it does exist
      const submit = component.queryByText('submit')
      expect(submit).toBeDefined() // it does exist
      const button = component.container.querySelector('button')
      expect(button).toBeDefined()
    })

    test('inputs are rendered', () => {
      expect(component.container).toHaveTextContent(
        'Title'
      )
      expect(component.container).toHaveTextContent(
        'Author'
      )
      expect(component.container).toHaveTextContent(
        'URL'
      )
      const inputs = component.container.querySelectorAll('input')
      expect(inputs).toHaveLength(3)
    })
  })

  describe('callback function is given right specs', () => {

    test('foo bar', () => {
      expect(component).toBeDefined()
      const form = component.container.querySelector('form')
      const title = component.container.querySelector('.titleInput')
      const author = component.container.querySelector('.authorInput')
      const url = component.container.querySelector('.urlInput')

      fireEvent.change(title, {
        target: {value: 'title text'}
      })
      fireEvent.change(author, {
        target: {value: 'author'}
      })
      fireEvent.change(url, {
        target: {value: 'url text'}
      })

      fireEvent.submit(form)

      expect(createHandler.mock.calls).toHaveLength(1)
      expect(createHandler.mock.calls[0][0]).toBe('title text') //First call first argument
      expect(createHandler.mock.calls[0][1]).toBe('author') //First call second argument
      expect(createHandler.mock.calls[0][2]).toBe('url text') //First call third argument
    })
  })
})

