import React, { forwardRef } from 'react'
import { getValueFromChildren, getReadOnly } from '../../../utils'
import {
  useThemePath,
  useInputHandlers,
  usePressHandlers,
} from '../../../hooks'
import { useTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'

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

export const InputWrapper = forwardRef((props, ref) => {
  const theme = useTheme()
  const {
    children,
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
    isWeb,
    ...elProps
  } = props

  const [inputStyles] = useThemePath(themePath)

  return (
    <Element
      elProps={elProps}
      style={theme.join(inputStyles, style)}
      ref={ref}
      {...getReadOnly(isWeb, readOnly, disabled, editable)}
      {...getValue(props, isWeb)}
      {...useInputHandlers({ onChange, onValueChange, onChangeText })}
      {...usePressHandlers(isWeb, { onClick, onPress })}
    >
      { children }
    </Element>
  )
})

InputWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  isWeb: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onChangeText: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
}
