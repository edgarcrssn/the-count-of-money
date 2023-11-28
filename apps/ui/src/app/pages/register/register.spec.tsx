import React from 'react'
import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import Register from './register'

describe('Register', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
