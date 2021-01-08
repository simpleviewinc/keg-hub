import React from 'react'
import { useTheme } from './useTheme'
import { deepMerge } from '@keg-hub/jsutils'
import { useThemeActive } from './useThemeActive'
import { useThemeHover } from './useThemeHover'
import { useThemeFocus } from './useThemeFocus'
import PropTypes from 'prop-types'

export const UseTheme = props => {
  const theme = useTheme()
  return <button style={theme.button.default}>{ props.children }</button>
}

UseTheme.propTypes = {}

export const UseThemeActive = props => {
  const { button } = useTheme()
  const [ ref, theme ] = useThemeActive(button.default, button.active)

  return (
    <button
      ref={ref}
      style={theme}
    >
      { props.children }
    </button>
  )
}

UseThemeActive.propTypes = {
  defaultThemeState: PropTypes.object,
  activeThemeState: PropTypes.object,
}

export const UseThemeHover = props => {
  const { button } = useTheme()
  const [ ref, theme ] = useThemeHover(button.default, button.hover)

  return (
    <button
      ref={ref}
      style={theme}
    >
      { props.children }
    </button>
  )
}

UseThemeHover.propTypes = {
  defaultThemeState: PropTypes.object,
  hoverThemeState: PropTypes.object,
}

export const UseThemeFocus = props => {
  const { customInput } = useTheme()

  const focusInput = deepMerge(customInput.hover, customInput.focus)
  const [ ref, theme ] = useThemeFocus(customInput.default, focusInput)

  return (
    <label
      htmlFor='focusInput'
      style={theme.label}
    >
      <input
        ref={ref}
        type='text'
        id='focusInput'
        placeholder='&nbsp;'
        style={theme.input}
      />
      <span style={theme.spanText}>Focus Label</span>
      <span style={theme.spanBorder}></span>
    </label>
  )
}

UseThemeFocus.propTypes = {
  defaultThemeState: PropTypes.object,
  focusThemeState: PropTypes.object,
}
