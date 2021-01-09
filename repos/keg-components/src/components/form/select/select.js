import React from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Select as InternalSelect } from '../../internal/select'
import { useThemePath } from '../../../hooks'
import { useSelectHandlers } from '../../../hooks/useSelectHandlers'
import { getValueFromChildren, getInputValueKey } from '../../../utils'
import { useClassName } from 'KegClassName'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import { ChevronDown } from '../../../assets/icons'
import { Icon } from 'KegIcon'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * Wrap the internal component with the Styles Injector Hoc
 * <br/>This allows us to add the styles as css classes
 */
const KegSelect = StyleInjector(InternalSelect, {
  displayName: 'Select',
  className: 'keg-select',
})

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

/**
 * Select
 * @summary Default Select component that wraps the Internal Select component with the styles injector. All props are optional
 *
 * @param {Object} props - see KegSelect PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 *
 */
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
      <KegSelect
        ref={classRef}
        {...elProps}
        enabled={!disabled}
        style={[selectStyles.select]}
        {...getValue(props)}
        {...useSelectHandlers({ onChange, onValueChange })}
      >
        { children }
      </KegSelect>
      <Icon
        styles={selectStyles.icon}
        Component={ChevronDown}
        color={disabled && selectStyles.icon?.disabled?.color}
      />
    </View>
  )
})

Select.propTypes = {
  ...InternalSelect.propTypes,
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
