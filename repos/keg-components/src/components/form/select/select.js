import React from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Picker } from 'react-native'
import { useThemePath } from '../../../hooks'
import { useSelectHandlers } from '../../../hooks/useSelectHandlers'
import { getValueFromChildren, getInputValueKey } from '../../../utils'
import { useClassName } from 'KegClassName'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import { ChevronDown } from '../../../assets/icons'
import { Icon } from 'KegIcon'

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
    disabled,
    readOnly,
    onChange,
    onValueChange,
    style,
    styles,
    type = 'default',
    themePath = `form.select.${type}`,
    value,
    ...elProps
  } = props

  const selectStyles = useThemePath(themePath, styles)
  const selectClasses = useThemeTypeAsClass(
    themePath || type,
    'keg-select',
    className
  )
  const classRef = useClassName('keg-select', selectClasses, ref)

  return (
    <View style={[ selectStyles.main, style ]}>
      <Picker
        ref={classRef}
        {...elProps}
        enabled={!disabled}
        style={[selectStyles.select]}
        {...getValue(props)}
        {...useSelectHandlers({ onChange, onValueChange })}
      >
        { children }
      </Picker>
      <Icon
        styles={selectStyles.icon}
        Component={ChevronDown}
        color={disabled && selectStyles.icon?.disabled?.color}
      />
    </View>
  )
})

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
}
