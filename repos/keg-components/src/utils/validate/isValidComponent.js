import { isValidElement } from 'react'
import { isFunc } from 'jsutils'

export const isValidComponent = Component =>
  isValidElement(Component) || isFunc(Component)
