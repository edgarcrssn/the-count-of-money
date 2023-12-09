import React from 'react'
import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MoonSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path
      d="M 12 5 C 8.146 5 5 8.146 5 12 C 5 15.854 8.146 19 12 19 C 15.854 19 19 15.854 19 12 C 19 8.146 15.854 5 12 5 Z M 12 7 C 14.773 7 17 9.227 17 12 C 17 14.773 14.773 17 12 17 C 9.227 17 7 14.773 7 12 C 7 9.227 9.227 7 12 7 Z"
      transform="matrix(1, 0, 0, 1, 0, 2.220446049250313e-16)"
    />
  </svg>
)

export const MoonOutlined = (props: Partial<CustomIconComponentProps>) => <Icon component={MoonSvg} {...props} />
