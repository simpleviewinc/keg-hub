import React from 'react'
import PropTypes from 'prop-types'
import { Picker } from 'react-native'
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
const Element = React.forwardRef(
  ({ elProps, children, editable, ...props }, ref) => (
    <Picker
      {...elProps}
      {...props}
      enabled={editable}
      ref={ref}
    >
      { children }
    </Picker>
  )
)

export const Select = props => <SelectWrapper
  {...props}
  Element={Element}
/>

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
}
