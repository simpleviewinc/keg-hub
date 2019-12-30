import React from 'react'
import { withTheme } from 're-theme'
import { reduceObj } from 'jsutils'
import domMap from './domMap'

const filterAttrs = attrs => reduceObj(attrs, (key, value, updated) => {
  domMap.attrKeyMap.web[key] !== false &&
    ( updated[ domMap.attrKeyMap.web[key] || key ] = value )

  return updated
}, {})

const getNode = element => {
  const node = element && element.toLowerCase()
  return domMap.elMap.web[node] || 'span'
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
        { ...filterAttrs(attrs) }
        style={ theme.join(textStyles, style) }
        onClick={ onClick || onPress }
      >
        { children }
      </Node>
    )
  })
}
