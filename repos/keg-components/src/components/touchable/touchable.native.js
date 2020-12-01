import React from 'react'
import PropTypes from 'prop-types'
import {
  Pressable
} from 'react-native'
import { useClassName } from 'KegClassName'

/**
 * Touchable
 * @summary Custom Touch component. All props are optional
 *
 * @param {Object} props - see touchablePropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {Object} props.style - custom style - Set inline with the style prop
 * @property {Function} props.onPress - function to do when button is pressed
 * @property {Object} props.children - Child components of the component
 * @property {Object} props.ref - reference to native element
 *
 */
export const Touchable = React.forwardRef((props, ref) => {
  const { className, touchRef, ...attrs } = props
  const classRef = useClassName('keg-touchable', className, touchRef || ref)

  return <Pressable
    accessible={true}
    {...attrs}
    ref={classRef}
  />
})

Touchable.propTypes = {
  ...Pressable.propTypes,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  disabled: PropTypes.bool,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
}
