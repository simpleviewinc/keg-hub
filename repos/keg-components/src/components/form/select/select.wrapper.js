import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { getOnChangeHandler, getValueFromChildren, getInputValueKey, getReadOnly } from '../../../utils'

/**
 * Gets the key value pair for the select components value
 * @param {*} props - Props passed to the component
 * @param {*} isWeb - Is the platform equal to web
 *
 * @returns {Object} - key / value pair for the select component
 */
const getValue = ({ children, onChange, onValueChange, readOnly, value }, isWeb) => {
  
  const setValue = getValueFromChildren(value, children)

  const valKey = getInputValueKey(isWeb, onChange, onValueChange, readOnly)

  return { [valKey]: setValue }
}

/**
 * Builds the styles for the select component
 * @param {string} styleId - Cached id of the styles
 * @param {Object} theme - Global theme object
 * @param {string} type - Type of select theme to use
 * @param {string} elType - Platform type
 *
 * @returns {Object} - Contains all built stlyes
 */
const buildStyles = (styleId, theme, type, elType) => {
  styleId = styleId || `keg-${elType}-select`

  const select = theme.get(
    `${styleId}-${type || 'default'}`,
    'form.select.default',
    type && `form.select.${type}`
  )
  
  return { select }
}

export const SelectWrapper = props => {
  const theme = useTheme()
  const { 
    children,
    editable,
    disabled,
    elType,
    Element,
    readOnly,
    onChange,
    onValueChange,
    style,
    styleId,
    type,
    value,
    ...elProps
  } = props
  
  const styles = buildStyles(styleId, theme, type, elType)
  const isWeb = elType === 'web'

  return (
    <Element
      elProps={ elProps }
      style={ theme.join(styles.select, style) }
      {  ...getReadOnly(isWeb, readOnly, disabled, editable) }
      { ...getValue(props, isWeb) }
      { ...getOnChangeHandler(isWeb, onChange, onValueChange) }
    >
      { children }
    </Element>
  )

}

SelectWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  elType: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  styleId: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])
}
