import React from 'react'
import PropTypes from 'prop-types'
import { Picker } from 'react-native'
import { useThemePath } from '../../../hooks'
import { useSelectHandlers } from '../../../hooks/useSelectHandlers'
import { getValueFromChildren, getInputValueKey } from '../../../utils'
import { useClassName } from 'KegClassName'
import { useThemeTypeAsClass } from 'KegTypeAsClass'

/**
 * Gets the key value pair for the select components value
 * @param {*} props - Props passed to the component
 *
 * @returns {Object} - key / value pair for the select component
 */
const getValue = props => {
  const { children, onChange, onValueChange, readOnly, value } = props

  const setValue = getValueFromChildren(value, children)
  const valKey = getInputValueKey(false, onChange, onValueChange, readOnly)

  return { [valKey]: setValue }
}

export const Select = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    editable,
    disabled,
    readOnly,
    onChange,
    onValueChange,
    type = 'default',
    themePath = `form.select.${type}`,
    style,
    value,
    ...elProps
  } = props

  const selectStyles = useThemePath(themePath)
  const selectClasses = useThemeTypeAsClass(
    themePath || type,
    'keg-select',
    className
  )
  const selectRef = useClassName('keg-select', selectClasses, ref)

  return (
    <Picker
      ref={selectRef}
      {...elProps}
      enabled={editable}
      style={[ selectStyles, style ]}
      {...getValue(props)}
      {...useSelectHandlers({ onChange, onValueChange })}
    >
      { children }
    </Picker>
  )
})

Select.propTypes = {
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
