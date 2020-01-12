import React, { forwardRef } from 'react'
import { useTheme } from 're-theme'
import { reduceObj } from 'jsutils'
import domMap from './domMap'

const domAttrKeys = Object.keys(domMap.attrKeyMap.web)

const filterAttrs = attrs => reduceObj(attrs, (key, value, updated) => {
  domAttrKeys.indexOf(key) === -1
    ? (updated[key] = value)
    : domMap.attrKeyMap.web[key] !== false &&
      ( updated[ domMap.attrKeyMap.web[key] || key ] = value )

  return updated
}, {})

const getNode = element => {
  const node = element && element.toLowerCase()
  return domMap.elMap.web[node] || element || 'span'
}

const Text = forwardRef((props, ref) => {
  const theme = useTheme()
  const { children, element, style, styleId, onPress, onClick, ...attrs } = props

  // Get the styles for the text element
  const textStyles = theme.get(
    styleId || `keg-typography-${element}`,
    'typography.font.family',
    'typography.default',
    element && `typography.${element}`,
  )

  // Get the Node type to be built
  const Node = getNode(element)

  return (
    <Node
      { ...filterAttrs(attrs) }
      style={ theme.join(textStyles, style) }
      onClick={ onClick || onPress }
      ref={ ref }
    >
      { children }
    </Node>
  )
})

export const KegText = element => {
  return forwardRef((props, ref) => (
    <Text {...props} element={ element } ref={ ref } />
  ))
}
