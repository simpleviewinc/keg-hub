import React from 'react'
import { useThemeFocus, useThemeHover, useTheme } from 're-theme'

export const ReuseRefInput = props => {
  const { components: { customInput } } = useTheme()

  const [ hoverRef, themeWithHover ] = useThemeHover(customInput.default, customInput.hover)
  const [ ref, theme ] = useThemeFocus(themeWithHover, customInput.focus, { ref: hoverRef })

  return (
    <label htmlFor="customInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="customInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Hover and Focus</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}