import React from 'react'
import { ItemHeader } from './itemHeader'
import { deepMerge } from '@svkeg/jsutils'

/**
 * AppHeader
 * @todo implement native status bar functionality. ref: https://jira.simpleviewtools.com/browse/ZEN-362
 * @param {object} props
 */
export const AppHeader = props => {
  const { dataSet, ...otherProps } = props
  return (
    <ItemHeader
      dataSet={deepMerge(AppHeader.dataSet, dataSet)}
      {...otherProps}
    />
  )
}

AppHeader.dataSet = {
  main: { class: 'app-header-main' },
  content: {
    left: { class: 'app-header-content-left' },
    right: { class: 'app-header-content-right' },
    center: { class: 'app-header-content-center' },
  },
}
