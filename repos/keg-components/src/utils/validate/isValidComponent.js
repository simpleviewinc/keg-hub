import { isValidElement } from 'react'
import { isFunc } from '@svkeg/jsutils'

export const isValidComponent = Component =>
  isValidElement(Component) || isFunc(Component)
