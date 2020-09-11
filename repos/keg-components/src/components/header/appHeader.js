import React from 'react'
import { ItemHeader } from './itemHeader'
import { useClassList } from 'KegClassList'
/**
 * AppHeader
 * @todo implement native status bar functionality. ref: https://jira.simpleviewtools.com/browse/ZEN-362
 * @param {object} props
 */
export const AppHeader = props => {
  const { className, ...otherProps } = props
  return (
    <ItemHeader
      accessibilityRole='banner'
      className={useClassList('keg-app-header', className)}
      {...otherProps}
    />
  )
}
