import React, { useState } from 'react'
import { useTheme, useThemeActive, useThemeHover } from 'KegReTheme'
import { get, toBool, checkCall } from 'jsutils'
import { getOnChangeHandler, getChecked, getStyles } from '../../../utils'
import PropTypes from 'prop-types'

const buildStyles = (styles, styleId, theme, checked) => {
  styleId = styleId || `keg-switch`
  const status =  checked && 'on' || 'off'

  const wrapper = theme.get(
    `${styleId}-wrapper`,
    'form.switch.wrapper',
    styles && styles.wrapper
  )

  const knob = theme.get(
    `${styleId}-knob-${status}`,
    `form.switch.knob`,
    `form.switch.${status}`,
    styles && styles.knob
  )
  
  const slider = theme.get(
    `${styleId}-slider`,
    'form.switch.slider',
    styles && styles.slider
  )

  return { wrapper, slider, knob }

}

const setCheckedValue = (isChecked, setChecked, onChange) => {
  return event => {
    setChecked(!isChecked)
    checkCall(onChange, event, !isChecked)
  }
}

export const SwitchWrapper = props => {
  const theme = useTheme()

  const {
    checked,
    Element,
    disabled,
    isWeb,
    onChange,
    onValueChange,
    ref,
    styleId,
    style,
    styles,
    value,
    ...elProps
  } = props
  
  const [ isChecked, setChecked ] = useState(toBool(checked || value))

  const builtStyles = buildStyles(styles, styleId, theme, isChecked)

  return (
    <Element
      elProps={ elProps }
      disabled={ disabled }
      style={ style }
      { ...getChecked(isWeb, isChecked) }
      { ...getStyles(isWeb, builtStyles) }
      { ...getOnChangeHandler(
        isWeb, setCheckedValue(isChecked, setChecked, onChange || onValueChange)
      )}
    />
  )

}

SwitchWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}
