import React from 'react'
import { useThemeHover, useTheme } from 're-theme'

export const UseThemeHoverButton = props => {
  const { components: { button } } = useTheme()
  const [ ref, theme ] = useThemeHover(button.default, button.hover)

  return (
    <button ref={ ref } style={ theme } >
      { props.children }
    </button>
  )
}