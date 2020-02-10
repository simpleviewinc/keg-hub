import React from 'react'
import { deepMerge } from 'jsutils'
import { useThemeFocus, useTheme } from 're-theme'

export const UseThemeFocusInput = props => {
  const { components: { customInput } } = useTheme()

  const focusInput = deepMerge(customInput.hover, customInput.focus)
  const [ ref, theme ] = useThemeFocus(customInput.default, focusInput)

  return (
    <label htmlFor="focusInput" style={ theme.label }  >
      <input ref={ ref } type="text" id="focusInput" placeholder="&nbsp;" style={ theme.input }  />
      <span style={ theme.spanText } >Focus Label</span>
      <span style={ theme.spanBorder } ></span>
    </label>
  )
}