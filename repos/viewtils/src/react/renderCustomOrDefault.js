import React from 'react'
import { isValidComponent } from './isValidComponent'

/**
 * Validates a passed in component, and renders it
 * Renders the default component when Component param is an invalid React component
 * @function
 * @public
 * @export
 * @param {Object} Component - Custom component to be rendered
 * @param {Object} DefComponent - Default component to be rendered when Component is invalid
 * @param {Object} props - Props to pass to the component when rendered
 *
 * @return {Object} - Rendered React component
 */
export const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component)
    ? (<Component { ...props } />)
    : (<DefComponent { ...props } />)
}
