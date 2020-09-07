import React from 'react'
import { Touchable } from '../components/touchable'
import { TouchableWithoutFeedback } from 'react-native'
import { useThemePath } from '../hooks'
import { useTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { noPropObj } from '../utils/helpers/noop'

/**
 * Returns a new component that wraps `Component` with touchable capabilities.
 * @param {Function} Component - a react component to be wrapped
 * @param {Object} options - options obj
 * @param {Boolean} options.showFeedback - if true, show feedback opacity animation (Touchable), otherwise show none (TouchableWithoutFeedback)
 * @returns {Function} - react component that wraps Component
 */
export const withTouch = (Component, options = {}) => {
  const { showFeedback = true } = options

  /**
   * Wrapped react component
   * @param {Object} props
   * @param {String} props.touchThemePath - optional theme path for Touchable wrapping the component
   * @param {Object} props.touchStyle - optional style object for Touchable wrapping the component
   * @param {Function} props.onPress - callback on touch
   * @param {...*} props.remaining - remaining props get passed down to the wrapped component
   */
  const wrapped = React.forwardRef((props, ref) => {
    const {
      touchThemePath = '',
      touchStyle = noPropObj,
      onPress,
      ...otherProps
    } = props

    const theme = useTheme()
    const [style] = useThemePath(touchThemePath)

    const TouchWrapper = showFeedback
      ? Touchable
      : TouchableWithoutFeedback

    return (
      <TouchWrapper
        style={[touchStyle , style]}
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
