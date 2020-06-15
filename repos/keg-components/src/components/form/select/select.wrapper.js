import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@simpleviewinc/re-theme'
import { useThemePath } from '../../../hooks'
import {
  getValueFromChildren,
  getInputValueKey,
  getReadOnly,
} from '../../../utils'
import { useSelectHandlers } from '../../../hooks/useSelectHandlers'

/**
 * Gets the key value pair for the select components value
 * @param {*} props - Props passed to the component
 * @param {*} isWeb - Is the platform equal to web
 *
 * @returns {Object} - key / value pair for the select component
 */
const getValue = (
  { children, onChange, onValueChange, readOnly, value },
  isWeb
) => {
  const setValue = getValueFromChildren(value, children)

  const valKey = getInputValueKey(isWeb, onChange, onValueChange, readOnly)

  return { [valKey]: setValue }
}

export const SelectWrapper = props => {
  const theme = useTheme()
  const {
    children,
    editable,
    disabled,
    Element,
    isWeb,
    readOnly,
    onChange,
    onValueChange,
    type = 'default',
    themePath = `form.select.${type}`,
    style,
    value,
    ...elProps
  } = props

  const [selectStyles] = useThemePath(themePath)

  return (
    <Element
      elProps={elProps}
      style={theme.join(selectStyles, style)}
      {...getReadOnly(isWeb, readOnly, disabled, editable)}
      {...getValue(props, isWeb)}
      {...useSelectHandlers({ onChange, onValueChange })}
    >
      { children }
    </Element>
  )
}

SelectWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
}
