import React from 'react'
import PropTypes from 'prop-types'
import { InputWrapper } from './input.wrapper'
import { useClassName } from '../../../hooks/useClassName'

const Element = React.forwardRef(({ className, dataSet, elProps, ...args }, ref) => {
  const inputRef = useClassName(className, dataSet, ref)

  return <input
    {...args}
    {...elProps}
    ref={inputRef}
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
