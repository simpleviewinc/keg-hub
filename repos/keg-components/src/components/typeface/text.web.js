import React from 'react'
import { withTheme } from 're-theme'
import typeMap from './typeMap'

const getNode = element => {
  const node = element && element.lowerCase()
  return typeMap.web[node] || node || 'span'
}

export const Text = element => {
  return withTheme(props => {
    const { theme, style, children, onPress, onClick, ...attrs } = props
    const textStyles = (theme.typeface && theme.typeface[element]) || theme[element]
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
