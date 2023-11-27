import React from 'react'
import { render } from '@testing-library/react'

import { BrowserRouter } from 'react-router-dom'

import Home from './home'

describe('Home', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )
    expect(baseElement).toBeTruthy()
  })

  // it('should have a greeting as the title', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Home />
  //     </BrowserRouter>,
  //   )
  //   expect(getByText(/Welcome ui/gi)).toBeTruthy()
  // })
})
