import { Input } from 'antd'
import React, { useState } from 'react'

type Props = {
  defaultValue: string
  onBlur: (value: string) => void
}

export const TableInput = ({ defaultValue, onBlur }: Props) => {
  const [value, setValue] = useState(defaultValue)

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        onBlur(value)
        setValue(defaultValue)
      }}
    />
  )
}
