import React from 'react'
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
  ({ elProps, children, readOnly, ...props }, ref) => (
    <select
      {...elProps}
      {...props}
      ref={ref}
    >
      { children }
    </select>
  )
)

export const Select = props => (
  <SelectWrapper
    {...props}
    Element={Element}
    isWeb={true}
  />
)

Select.propTypes = { ...SelectWrapper.propTypes }
