import React from 'react'
import { useTheme, useThemeActive, useThemeHover } from 're-theme'
import { get } from 'jsutils'
import { getPressHandler, getActiveOpacity } from '../../utils'
import PropTypes from 'prop-types'

const buildStyles = (styleId, theme, type, btnType) => {
  styleId = styleId || `keg-${btnType}-button`

  const normal = theme.get(
    `${styleId}-${type || 'default'}`,
    'components.button.default',
    type && `components.button.${type}`
  )

  const disabled = theme.get(
    `${styleId}-${type || 'default'}-disabled`,
    normal,
    'components.button.disabled',
  )

  return { normal, disabled }

}

export const ButtonWrapper = props => {
  const theme = useTheme()
  
  const {
    Btn,
    btnType,
    children,
    disabled,
    onClick,
    onPress,
    ref,
    styleId,
    style,
    text,
    type,
    ...btnProps
  } = props

  const isWeb = btnType === 'web'
  const builtStyles = buildStyles(styleId, theme, type, btnType)

  const [ hoverRef, hoverStyle ] = useThemeHover(
    theme.join(builtStyles.normal, style),
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
