import { isValidElement } from 'react'
import { isFunc } from '@keg-hub/jsutils'

export const isValidComponent = Component =>
  isValidElement(Component) || isFunc(Component)
