import React from 'react'
import { ButtonWrapper } from './button.wrapper'

/**
 * Button Element
 * @summary Passed to the ButtonWrapper to be rendered
 * @param {Object} props - see ButtonWrapper PropTypes
 * @param {Object} ref - React Ref Object
 *
 */
const Element = React.forwardRef((props, ref) => {
  return <button
    {...props}
    ref={ref}
  />
})

/**
 * Button
 * @summary Custom button component. All props are optional
 * @param {Object} props - see ButtonWrapper PropTypes
 *
 */
export const Button = props => (
  <ButtonWrapper
    {...props}
    Element={Element}
    isWeb={true}
  />
)

Button.propTypes = { ...ButtonWrapper.propTypes }
