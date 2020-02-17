import React, { useState } from 'react'
import { useTheme, useThemeHover } from 're-theme'
import { Text } from '../../typography'
import { View } from 'KegView'
import { get, isStr, toBool, checkCall } from 'jsutils'
import { getOnChangeHandler, getChecked, getStyles, isValidComponent } from '../../../utils'
import PropTypes from 'prop-types'

const buildStyles = (styles, theme, checked, type) => {
  const status =  checked && 'on' || 'off'

  const container = theme.get(
    `form.${type}.container`,
    styles && styles.container
  )

  const wrapper = theme.get(
    `form.${type}.wrapper`,
    styles && styles.wrapper
  )

  const area = theme.get(
    `form.${type}.area`,
    styles && styles.bounds
  )

  const indicator = theme.get(
    `form.${type}.indicator`,
    `form.${type}.${status}`,
    styles && styles.indicator
  )

  const leftText = theme.get(
    `form.${type}.text`,
    `form.${type}.leftText`,
    styles && styles.text,
    styles && styles.leftText
  )

  const rightText = theme.get(
    `form.${type}.text`,
    `form.${type}.rightText`,
    styles && styles.text,
    styles && styles.rightText
  )

  return { container, wrapper, area, indicator, leftText, rightText }

}

const setCheckedValue = (isChecked, setChecked, onChange) => {
  return event => {
    setChecked(!isChecked)
    checkCall(onChange, event, !isChecked)
  }
}

const SideText = ({ text, style }) => {
  return isValidComponent(text) ? text : isStr(text) && (
    <Text style={ style } >{ text }</Text>
  )
}

export const SwitchWrapper = props => {
  const theme = useTheme()

  const {
    checked,
    Element,
    disabled,
    isWeb,
    leftText,
    onChange,
    onValueChange,
    ref,
    rightText,
    style,
    styles,
    type,
    value,
    children,
    ...elProps
  } = props
  
  const [ isChecked, setChecked ] = useState(toBool(checked || value))

  const builtStyles = buildStyles(styles, theme, isChecked, type || 'switch')


  return (
    <View style={ builtStyles.container } >
      <SideText text={ leftText } style={ builtStyles.leftText } />
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
      <SideText text={ rightText } style={ builtStyles.rightText } />
    </View>
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
