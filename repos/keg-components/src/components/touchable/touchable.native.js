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
 * @param {String} props.className - Value to set the className to (web platform only)
 * @param {Object} props.style - custom style - Set inline with the style prop
 * @param {Function} props.onPress - function to do when button is pressed
 * @param {Object} props.children - Child components of the component
 * @param {Object} props.ref - reference to native element
 * @param {*} props.* - any prop from 'Pressable' propTypes
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
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
}
