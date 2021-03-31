import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'
import { useScrollIntoView } from 'KegHooks'

/**
 * Wraps `Component` such that it is
 * scrolled into view within its surrounding list
 * if the caller passes in a `scrollIntoView={true}` prop
 * @param {Function} Component - component to wrap. Must be a component that accepts a ref,
 * pointing to the underlying Element.
 * @param {boolean|Object} defaultOptions - Default scroll options.
 *  See: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView#parameters
 * @return {Function} - wrapped component, with same props as `Component` and two additional:
 *   - scrollIntoView: if true, this component will scroll into view
 *   - scrollOptions: if defined, will overwrite defaultOptions
 */
export const withScrollIntoView = (Component, defaultOptions = true) => {
  // This hoc is unsupported on native platforms, nor should it be needed.
  // On native, the user scrolls via swiping. There
  // isn't a keyboard arrow cluster for secondary scrolling.
  if (getPlatform() !== 'web') return Component

  const Wrapped = props => {
    const {
      scrollIntoView = false,
      scrollOptions = undefined,
      ...clientProps
    } = props

    const options = scrollOptions !== undefined ? scrollOptions : defaultOptions

    const ref = useRef()

    useScrollIntoView(ref, scrollIntoView, options)

    return <Component
      ref={ref}
      {...clientProps}
    />
  }

  Wrapped.propTypes = {
    ...Component.propTypes,
    scrollIntoView: PropTypes.bool,
    scrollOptions: PropTypes.oneOfType([ PropTypes.bool, PropTypes.object ]),
  }

  return Wrapped
}
