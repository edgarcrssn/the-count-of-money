import React from 'react'
import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import Login from './login'

describe('Login', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })
})
