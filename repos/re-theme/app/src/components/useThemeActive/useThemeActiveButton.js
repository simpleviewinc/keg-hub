import React from 'react'
import { useThemeActive, useTheme } from '@svkeg/re-theme'

export const UseThemeActiveButton = props => {
  const { components: { button } } = useTheme()
  const [ ref, theme ] = useThemeActive(button.default, button.hover)

  return (
    <button ref={ ref } style={ theme } >
      { props.children }
    </button>
  )
}