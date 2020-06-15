import React from 'react'
import {
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from 'react-native'
import { useThemePath } from '../hooks'
import { useTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'

const TouchableWithFeedback =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

/**
 * Returns a new component that wraps `Component` with touchable capabilities.
 * @param {Function} Component - a react component to be wrapped
 * @param {Object} options - options obj
 * @param {Boolean} options.showFeedback - if true, show feedback opacity animation (from TouchableOpacity or TouchableNativeFeedback), otherwise show none (TouchableWithoutFeedback)
 * @returns {Function} - react component that wraps Component
 */
export const withTouch = (Component, options = {}) => {
  const { showFeedback = true } = options

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
      touchThemePath = '',
      touchStyle = {},
      onPress,
      ...otherProps
    } = props

    const theme = useTheme()
    const [style] = useThemePath(touchThemePath)

    const TouchWrapper = showFeedback
      ? TouchableWithFeedback
      : TouchableWithoutFeedback

    return (
      <TouchWrapper
        style={theme.join(style, touchStyle)}
        onPress={onPress}
      >
        <Component
          ref={ref}
          {...otherProps}
        />
      </TouchWrapper>
    )
  })

  wrapped.propTypes = {
    touchThemePath: PropTypes.string,
    touchStyle: PropTypes.object,
    onPress: PropTypes.func,
  }

  return wrapped
}
