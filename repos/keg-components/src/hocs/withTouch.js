import React from 'react'
import { TouchableOpacity } from "react-native";
import { useThemePath } from '../hooks'
import { useTheme } from 're-theme'
import PropTypes from 'prop-types'

/**
 * Returns a new component that wraps the passed in component with TouchableOpacity. 
 * @param {Function} Component - a react component to be wrapped
 * @returns {Function} - react component that wraps Component
 */
export const withTouch = (Component) => {
  /**
   * Wrapped react component
   * @param {Object} props
   * @param {String} props.touchThemePath - optional theme path for TouchableOpacity wrapping the component
   * @param {Object} props.touchStyle - optional style object for TouchableOpacity wrapping the component
   * @param {Function} props.onPress - callback on touch
   * @param {...*} props.remaining - remaining props get passed down to the wrapped component
   */
  const wrapped = React.forwardRef((props, ref) => {
    const { 
      touchThemePath='', 
      touchStyle={}, 
      onPress, 
      ...otherProps 
    } = props

    const theme = useTheme()
    const [ style ] = useThemePath(touchThemePath)

    return (
      <TouchableOpacity
        style={ theme.join(style, touchStyle) }
        onPress={onPress}
      >
        <Component 
          ref={ref}
          { ...otherProps } 
        />
      </TouchableOpacity>  
    )
  })

  wrapped.propTypes = {
    touchThemePath: PropTypes.string,
    touchStyle: PropTypes.object,
    onPress: PropTypes.func,
  }

  return wrapped
}