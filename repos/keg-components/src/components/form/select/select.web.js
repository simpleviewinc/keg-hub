import React from 'react'
import PropTypes from 'prop-types'
import { SelectWrapper } from './select.wrapper'

/**
 * Select
 * @summary Custom select component. All props are optional
 *
 * @param {Object} props - see selectPropTypes
 * @property {String} props.text - select text
 * @property {String} props.type - flat, text, outlined, contained; default 'flat'
 * @property {Object} props.style - custom style
 * @property {Function} props.onPress - function to do when select is pressed
 * @property {Boolean} props.disabled
 * @property {Object} props.children
 * @property {Object} props.ref - reference to native element
 *
 */
const Slt = React.forwardRef(({ elProps, children, ...props }, ref) => (
  <select
    { ...elProps }
    { ...props }
    ref={ ref }
  >
    { children }
  </select>
))

export const Select = props => (
  <SelectWrapper
    styleId={ `keg-native-select` }
    { ...props }
    Element={ Slt }
    elType='web'
  />
)

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
}