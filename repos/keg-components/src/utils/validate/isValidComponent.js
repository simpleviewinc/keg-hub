import { isValidElement } from 'react'
import { isFunc } from '@ltipton/jsutils'

export const isValidComponent = Component =>
  isValidElement(Component) || isFunc(Component)
