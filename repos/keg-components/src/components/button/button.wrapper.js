import React from 'react'
import { useTheme, useThemeActive, useThemeHover } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

const getPressHandler = (isWeb, onClick, onPress) => {
  return { [ isWeb ? 'onClick' : 'onPress' ]: onClick || onPress }
}

const buildStyles = (styleId, theme, style, type, btnType) => {
  styleId = styleId || `keg-${btnType}-button`

  const normal = theme.get(
    `${styleId}-${type || 'default'}`,
    'components.button.default',
    `components.button.${type}`,
    style
  )

  const disabled = theme.get(
    `${styleId}-${type || 'normal'}-disabled`,
    normal,
    'components.button.disabled',
  )


  return { normal, disabled }

}

const getActiveOpacity = (isWeb, props, style) => {
  // Check if opacity is passed from the props, or use the opacity from disabled styles
  return isWeb
    ? {}
    : {
      activeOpacity:  props.activeOpacity || props.opacity || (style && style.opacity) || 0.3,
      accessibilityRole: "button"
    }

}

export const ButtonWrapper = props => {
  const theme = useTheme()
  
  const {
    text,
    type,
    style,
    onClick,
    onPress,
    disabled,
    children,
    styleId,
    btnType,
    Btn,
    ref,
    ...btnProps
  } = props

  const isWeb = btnType === 'web'
  const builtStyles = buildStyles(styleId, theme, style, type, btnType)

  const [ hoverRef, hoverStyle ] = useThemeHover(
    builtStyles.normal,
    get(theme, 'components.button.hover'),
    { ref }
  )

  const [ useRef, useStyle ] = useThemeActive(
    hoverStyle,
    get(theme, 'components.button.active'),
    { ref: hoverRef }
  )

  return (
    <Btn
      btnProps={ btnProps }
      ref={ useRef }
      disabled={ disabled }
      style={ disabled ? builtStyles.disabled : useStyle }
      children={ children || text || 'button' }
      { ...getPressHandler(isWeb, onClick, onPress) }
      { ...getActiveOpacity(isWeb, props, useStyle) }
    />
  )

}

ButtonWrapper.propTypes = {
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
