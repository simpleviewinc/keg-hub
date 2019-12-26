import React from 'react'
import { withTheme } from 're-theme'
import typeMap from './typeMap'
import { get } from 'jsutils'

const getNode = element => {
  const node = element && element.toLowerCase()
  return typeMap.web[node] || node || 'span'
}

export const KegText = element => {
  return withTheme(props => {
    const { theme, style, children, onPress, onClick, ...attrs } = props
    const useFont = get(theme, [ 'typeface', 'font', 'family' ])
    const textStyles = get(theme, [ 'typeface', element ], get(theme, [ 'typeface', 'default' ]))
    const Node = getNode(element)

    return (
      <Node
        { ...attrs }
        style={ theme.join(useFont, textStyles, style) }
        onClick={ onClick || onPress }
      >
        { children }
      </Node>
    )
  })
}
