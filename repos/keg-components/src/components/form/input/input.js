import React, { forwardRef } from 'react'
import { TextInput } from 'react-native'
import { getValueFromChildren, getReadOnly } from '../../../utils'
import {
  useThemePath,
  useInputHandlers,
  usePressHandlers,
} from '../../../hooks'
import { useClassName } from '../../../hooks/useClassName'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { withTouch } from '../../../hocs'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

/**
 * Gets the key value pair for the select components value
 * @param {*} props - Props passed to the component
 * @param {*} isWeb - Is the platform equal to web
 *
 * @returns {Object} - key / value pair for the select component
 */
const getValue = ({ children, value }) => {
  const setValue = getValueFromChildren(value, children)

  return value !== undefined ? { value: setValue } : {} // return empty object, otherwise we would not be able to type into input since it would be waiting on value prop to change
}

export const Input = forwardRef((props, ref) => {
  const theme = useTheme()
  const {
    className,
    children,
    dataSet,
    disabled = false,
    editable = true,
    Element,
    onChange,
    onValueChange,
    onChangeText,
    onClick,
    onPress,
    readOnly = false,
    type = 'default',
    themePath = `form.input.${type}`,
    style,
    value,
    ...elProps
  } = props

  const [inputStyles] = useThemePath(themePath)
  const inputRef = useClassName(className, dataSet, ref, 'keg-input')

  const TextInputTouch = withTouch(TextInput, { showFeedback: false })

  return (
    <TextInputTouch
      accessibilityRole='textbox'
      onPress={onPress}
      {...getReadOnly(isWeb, readOnly, disabled, editable)}
      {...getValue(props, isWeb)}
      {...useInputHandlers({ onChange, onValueChange, onChangeText })}
      {...usePressHandlers(isWeb, { onClick, onPress })}
      {...elProps}
      style={[inputStyles, style]}
      ref={inputRef}
    />
  )
})

Input.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
}


