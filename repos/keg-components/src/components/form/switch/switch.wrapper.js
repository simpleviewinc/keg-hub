import React from 'react'
import { useTheme, useThemeActive, useThemeHover } from 'KegReTheme'
import { get } from 'jsutils'
import { getPressHandler, getChecked, getStyles } from '../../../utils'
import PropTypes from 'prop-types'

const buildStyles = (styles, styleId, theme, elType, checked) => {
  styleId = styleId || `keg-${elType}-switch`

  const wrapper = theme.get(
    `${styleId}-wrapper`,
    'components.switch.wrapper',
    styles && styles.wrapper
  )

  const knob = theme.get(
    `${styleId}-knob`,
    `components.switch.knob.${ checked && 'on' || 'off' }`,
    styles && styles.knob
  )

  const slider = theme.get(
    `${styleId}-slider`,
    'components.switch.slider',
    styles && styles.slider
  )

  return { wrapper, slider, knob }

}

export const SwitchWrapper = props => {
  const theme = useTheme()
  
  const {
    checked,
    Element,
    elType,
    disabled,
    isWeb,
    onClick,
    onPress,
    ref,
    styleId,
    style,
    styles,
    value,
    ...elProps
  } = props

  const builtStyles = buildStyles(styles, styleId, theme, elType, Boolean(checked || value))

  return (
    <Element
      elProps={ elProps }
      disabled={ disabled }
      style={ style }
      { ...getChecked(isWeb, checked, value) }
      { ...getPressHandler(isWeb, onClick, onPress) }
      { ...getStyles(isWeb, builtStyles) }
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
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
}
