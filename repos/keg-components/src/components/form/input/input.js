import React from 'react'
import { getValueFromChildren, getReadOnly } from '../../../utils'
import {
  useThemePath,
  useInputHandlers,
  usePressHandlers,
} from '../../../hooks'
import PropTypes from 'prop-types'
import { Input as InternalInput } from '../../internal/input.js'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * Wrap the internal component with the Styles Injector Hoc
 * <br/>This allows us to add the styles as css classes
 */
const KegInput = StyleInjector(InternalInput, {
  displayName: 'Input',
  className: 'keg-input',
})

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

/**
 * Input
 * @summary Default Input component that wraps the Internal Input component with the styles injector. All props are optional
 *
 * @param {Object} props - see KegInput PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
export const Input = React.forwardRef((props, ref) => {
  const {
    className,
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
    ...elProps
  } = props

  const inputStyles = useThemePath(themePath)

  return (
    <KegInput
      accessibilityRole='textbox'
      onPress={onPress}
      {...getReadOnly(false, readOnly, disabled, editable)}
      {...getValue(props, false)}
      {...useInputHandlers({ onChange, onValueChange, onChangeText })}
      {...usePressHandlers(false, { onClick, onPress })}
      {...elProps}
      style={[ inputStyles, style ]}
      ref={ref}
    />
  )
})

Input.propTypes = {
  ...KegInput.propTypes,
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
