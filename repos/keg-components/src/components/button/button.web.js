import React from 'react'
import { ButtonWrapper } from './button.wrapper'
import PropTypes from 'prop-types'

/**
 * Button Element
 * @summary Passed to the ButtonWrapper to be rendered
 * @param {Object} props - see ButtonWrapper PropTypes
 * @param {Object} ref - React Ref Object
 *
 */
const Element = React.forwardRef(({ elProps, children, ...props }, ref) => {
  return (
    <button
      { ...elProps }
      { ...props }
      ref={ ref }
    >
      { children }
    </button>
  )
})


/**
 * Button
 * @summary Custom button component. All props are optional
 * @param {Object} props - see ButtonWrapper PropTypes
 *
 */
export const Button = props => (
  <ButtonWrapper
    { ...props }
    Element={ Element }
    isWeb={ true }
  />
)

Button.propTypes = { ...ButtonWrapper.propTypes }
