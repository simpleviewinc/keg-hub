/* eslint-disable */

import React from 'react'
import { reStyle } from './reStyle'

export const Button = reStyle('button')({
  backgroundColor: 'blue',
  color: 'white',
})

export const ReStyleButton = () => {
  return <Button>ReStyled Button</Button>
}
