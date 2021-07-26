import { View } from '../view'
import PropTypes from 'prop-types'
import { get } from '@keg-hub/jsutils'
import { useThemePath } from '../../hooks'
import { noOpObj } from '@keg-hub/jsutils'
import { Animated } from 'react-native'
import { useClassName } from 'KegClassName'
import React, { useState, useLayoutEffect, useCallback, useRef } from 'react'
import { isValidComponent } from '../../utils/validate/isValidComponent'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

/**
 * Checks if the animation should NOT run
 * @param {boolean} toggled - Current state of the Drawer toggled open
 * @param {number} current - Current height of the Drawer / animated.value
 * @param {number} contentMaxHeight
 * @param {number} collapsedHeight
 *
 * @returns {boolean} - If the animation should NOT run
 */
const noAnimate = (toggled, current, collapsedHeight, contentMaxHeight) =>
  (!toggled && current === collapsedHeight) ||
  (toggled && current === contentMaxHeight)

/**
 * Drawer
 * @param {Object} props - props passed from parent component
 * @param {Function|Component} props.children - Child components placed inside the drawer
 * @param {Number=} props.collapsedHeight - optional. height of the collapsed view
 * @param {string=} props.className
 * @param {Function|Component} props.Element - Child Element of the Drawer. Overrides the default children prop
 * @param {string} props.type - Animation type from the Animated API that accepts an animated config
 * @param {Object} props.config - Animation config object passed on to the Animated type method
 * @param {Object} props.styles - Custom styles to applied to the slider
 * @param {boolean} props.toggled - Is the slider toggled open
 * @param {boolean} props.* - All other props passed on to the Element Component prop if it exists
 *
 * @returns {Component} - Drawer Component
 */
export const Drawer = React.forwardRef((props, ref) => {
  const {
    Element,
    styles,
    toggled,
    className,
    type = 'timing',
    config = noOpObj,
    collapsedHeight = 0,
    ...childProps
  } = props

  // Define the default max height as a ref
  const contentMaxHeight = useRef(null)

  // Define the animated value as a ref
  const [ animation, setAnimation ] = useState(
    new Animated.Value(collapsedHeight)
  )

  // Define a helper to update the total max height of the slider
  // Gets called from the onLayout callback of the View wrapper
  const setMaxHeight = useCallback(
    event => {
      const maxHeight = event.nativeEvent.layout.height
      if (contentMaxHeight.current === maxHeight) return

      contentMaxHeight.current = maxHeight
      toggled && setAnimation(new Animated.Value(maxHeight))
    },
    [ contentMaxHeight, toggled, setAnimation ]
  )

  // Use useLayoutEffect to check if the slider should be animated
  // Within the hook, toggled flag defines how to update the animated value
  // To Open: toggled === true === should animate open
  // To Close: toggled === false === should animate close
  useLayoutEffect(() => {
    // Check if we should animate the slider
    // If the values have not changed, no need to animate
    if (
      noAnimate(
        toggled,
        animation._value,
        collapsedHeight,
        contentMaxHeight.current
      )
    )
      return

    // Define the from and to values for the animation based on toggled flag
    const heightChanges = toggled
      ? { from: collapsedHeight, to: contentMaxHeight.current }
      : { from: contentMaxHeight.current, to: collapsedHeight }

    // Update the animation value to animate from
    animation.setValue(heightChanges.from)
    // Start the animation, from value ==> to value
    const animationConfig = config
      ? { ...config, toValue: heightChanges.to }
      : { toValue: heightChanges.to }

    // If on web, then don't use the animated driver
    animationConfig.useNativeDriver = !isWeb
    Animated[type](animation, animationConfig).start()

    // Add toggled as a dep, so anytime it changes, we run the hook code
  }, [ toggled, type, config, collapsedHeight ])

  const drawerStyles = useThemePath(`drawer`, styles)
  const classRef = useClassName('keg-drawer', className, ref)

  return (
    <Animated.View
      ref={classRef}
      style={[ drawerStyles.main, get(styles, 'main'), { maxHeight: animation }]}
    >
      <View
        className='keg-drawer-content'
        onLayout={setMaxHeight}
        style={get(styles, 'content')}
      >
        { isValidComponent(Element) ? (
          <Element
            {...childProps}
            styles={styles}
          />
        ) : (
          props.children
        ) }
      </View>
    </Animated.View>
  )
})

Drawer.propTypes = {
  className: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
  config: PropTypes.object,
  Element: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
  styles: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  toggled: PropTypes.bool,
  type: PropTypes.oneOf([ 'decay', 'spring', 'timing' ]),
  collapsedHeight: PropTypes.number,
}
