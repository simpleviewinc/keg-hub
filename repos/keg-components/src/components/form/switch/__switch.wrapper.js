import React, { useState } from 'react'
import { useTheme, useThemeActive, useThemeHover } from 'KegReTheme'
import { Text } from '../../'
import { View } from 'KegView'
import { get, isStr, toBool, checkCall } from 'jsutils'
import { getOnChangeHandler, getChecked, getStyles, isValidComponent } from '../../../utils'
import PropTypes from 'prop-types'

const buildStyles = (styles, styleId, theme, checked, type) => {
  styleId = styleId || `keg-${type}`
  const status =  checked && 'on' || 'off'

  const wrapper = theme.get(
    `${styleId}-${type}-wrapper`,
    `form.${type}.wrapper`,
    styles && styles.wrapper
  )

  const area = theme.get(
    `${styleId}-area`,
    `form.${type}.area`,
    styles && styles.bounds
  )

  const indicator = theme.get(
    `${styleId}-indicator-${status}`,
    `form.${type}.indicator`,
    `form.${type}.${status}`,
    styles && styles.indicator
  )

  const leftText = theme.get(
    `${styleId}-leftText}`,
    `form.${type}.text`,
    `form.${type}.leftText`,
    styles && styles.text,
    styles && styles.leftText
  )

  const rightText = theme.get(
    `${styleId}-rightText}`,
    `form.${type}.text`,
    `form.${type}.rightText`,
    styles && styles.text,
    styles && styles.rightText
  )

  return { wrapper, area, indicator, leftText, rightText }

}

const setCheckedValue = (isChecked, setChecked, onChange) => {
  return event => {
    setChecked(!isChecked)
    checkCall(onChange, event, !isChecked)
  }
}

const SideText = ({ text, styles, side }) => {
  return isValidComponent(text) ? text : isStr(text) && (
    <View style={ { ...styles.wrapper, width: 'initial' } } >
      <Text style={ styles[`${side}Text` ] } >{ text }</Text>
    </View>
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
    styleId,
    style,
    styles,
    type,
    value,
    children,
    ...elProps
  } = props
  
  const [ isChecked, setChecked ] = useState(toBool(checked || value))

  const builtStyles = buildStyles(styles, styleId, theme, isChecked, type || 'switch')


  return (
    <>
      <SideText text={ leftText } styles={ builtStyles } side={ 'left' } />
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
      <SideText text={ rightText } styles={ builtStyles } side={ 'right' } />
    </>
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
