import React from 'react'
import { FormWrapper } from './form.wrapper'
import { View } from 'KegView'
import PropTypes from 'prop-types'

/**
 * Form
 * @summary Custom button component. All props are optional
 *
 * @param {Object} props - see formPropTypes
 * @property {String} props.type - default ''
 * @property {Object} props.style - custom style
 * @property {Function} props.onSubmit - function when form is submitted
 * @property {Object} props.children
 * @property {Object} ref - reference to native element
 *
 */
const Element = React.forwardRef(({ elProps, children, ...props }, ref) => {
  return (
    <View
      {...elProps}
      {...props}
      ref={ref}
    >
      { children }
    </View>
  )
})

export const Form = props => (
  <FormWrapper
    {...props}
    Element={Element}
    elType='native'
  />
)

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  onSubmit: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
}
