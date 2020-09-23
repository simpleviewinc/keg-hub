import React from 'react'
import { getValueFromChildren, getReadOnly } from '../../../utils'
import {
  useThemePath,
  useInputHandlers,
  usePressHandlers,
} from '../../../hooks'
import { Input as KegInput } from './kegInput'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

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
 * @summary Default Input component that wraps the KegInput component with the styles injector. All props are optional
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
  const InjectedComp = StyleInjector(
    KegInput,
    { displayName: 'Input', className: 'keg-input' }
  )
  
  return (
    <InjectedComp
      accessibilityRole='textbox'
      onPress={onPress}
      {...getReadOnly(false, readOnly, disabled, editable)}
      {...getValue(props, false)}
      {...useInputHandlers({ onChange, onValueChange, onChangeText })}
      {...usePressHandlers(false, { onClick, onPress })}
      {...elProps}
      style={[ inputStyles, style ]}
    />
  )
})


Input.propTypes = KegInput.propTypes
