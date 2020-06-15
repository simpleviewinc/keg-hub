import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from './input.wrapper'

const Element = React.forwardRef(({ elProps, ...args }, ref) => {
  return <input
    {...args}
    {...elProps}
    ref={ref}
  />
})

export const Input = props => {
  return <InputWrapper
    Element={Element}
    isWeb={true}
    {...props}
  />
}

Input.propTypes = {
  ...InputWrapper.propTypes,
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
}
