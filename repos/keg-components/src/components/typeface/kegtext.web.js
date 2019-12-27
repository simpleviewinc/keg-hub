import React from 'react'
import { withTheme } from 're-theme'
import typeMap from './typeMap'

const getNode = element => {
  const node = element && element.toLowerCase()
  return typeMap.web[node] || 'span'
}

export const KegText = element => {
  return withTheme(props => {
    const { theme, style, children, onPress, onClick, ...attrs } = props

    // Get the styles for the text element
    const textStyles = theme.join(theme, [
      [ 'typeface', 'font', 'family' ],
      [ 'typeface', 'default' ],
      [ 'typeface', element ]
    ])

    // Get the Node type to be built
    const Node = getNode(element)

    return (
      <Node
        { ...attrs }
        style={ theme.join(textStyles, style) }
        onClick={ onClick || onPress }
      >
        { children }
      </Node>
    )
  })
}
