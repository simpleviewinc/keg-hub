import React from 'react'
import { withTheme } from 're-theme'
import typeMap from './typeMap'

const getNode = elementType => {
  const node = elementType && elementType.lowerCase()
  return typeMap.web[node] || node || 'span'
}

const textWrapper = elementType => {
  return withTheme(props => {
    const { theme, style, children, onPress, onClick, ...attrs } = props
    const textStyles = (theme.text && theme.text[elementType]) || theme[elementType]
    const Node = getNode(elementType)

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

export { textWrapper }
