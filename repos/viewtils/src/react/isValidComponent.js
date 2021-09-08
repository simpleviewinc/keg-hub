import { isValidElement } from 'react'
import { isFunc } from '@keg-hub/jsutils'

/**
 * Checks if the passed in Component is a valid React Component
 * @param {*} Component - Item to check if it's a valid React Component
 *
 * @returns {Boolean} - True if the Component is a valid React Component
 */
export const isValidComponent = Component => (
  isValidElement(Component) || isFunc(Component)
)