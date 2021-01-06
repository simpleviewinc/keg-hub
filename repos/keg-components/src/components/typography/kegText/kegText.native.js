import React from 'react'
import { useClassName } from 'KegClassName'
import { Text as RNText } from 'react-native'
import { useTextAccessibility } from '../../../hooks/useTextAccessibility'
import PropTypes from 'prop-types'

/**
 * Default props used for ellipsis
 * @object
 */
const ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}

/**
 * KegText
 * @summary Text component that wraps the React Native Text component
 * @function
 * @param {Object} props - see touchablePropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {Object} props.style - custom style - Set inline with the style prop
 * @property {Function} props.accessibilityRole - Accessibility Role of the text component
 * @property {Object} props.children - Child components of the component
 * @property {Object} props.ref - reference to native element
 */
export const KegText = element => {
  return React.forwardRef((props, ref) => {
    const {
      accessibilityRole,
      children,
      className,
      ellipsis,
      ...attrs
    } = props

    const classRef = useClassName(`keg-${element}`, className, ref)
    const a11y = useTextAccessibility(element, accessibilityRole)

    return (
      <RNText
        {...attrs}
        {...a11y}
        {...(ellipsis && ellipsisProps)}
        ref={classRef}
      >
        { children }
      </RNText>
    )
  })
}

KegText.propTypes = {
  ...RNText.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}



