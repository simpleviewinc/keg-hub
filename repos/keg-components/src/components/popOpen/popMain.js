import React, {useRef, useEffect, useMemo} from 'react'
import PropTypes from 'prop-types'
import { PopCaret } from './popCaret'
import { Animated } from 'react-native'
import {
  PopAnimated,
  PopContainer,
  PopMain as PMain,
  PopText
} from './popReStyle'

/**
 * Sets the translate style property based on the position and layout
 * @param {boolean} isHorizontal - Should render the component horizontally
 * @param {Object} opacity - Animated value that sets the components opacity
 * @param {string} position - Render position of the component
 * 
 * @return {Object} - Contains properties to animate to the components styles
 */
const useAnimationTranslation = (isHorizontal, opacity, position) => {
  return useMemo(() => {
    return isHorizontal
      ? {
          translateX: opacity.interpolate({
            inputRange: [0, 1],
            outputRange: position === 'left' ? [5, 0] : [-5, 0],
          }),
        }
      : {
        translateY: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: position === 'top' ? [5, 0] : [-5, 0],
        }),
      }
  }, [isHorizontal, opacity, position])
}

/**
 * Helper hook to get the styles for the Animated view component
 * @param {boolean} isHorizontal - Should render the component horizontally
 * @param {Object} opacity - Animated value that sets the components opacity
 * @param {string} position - Render position of the component
 *
 * @return {Object} - Style object to pass to the Animated View component
 */
const useAnimatedStyle = (isHorizontal, opacity, position, styles) => {
  const translation = useAnimationTranslation(
    isHorizontal,
    opacity,
    position
  )

  return useMemo(() => {
    return {
      ...styles.animated,
      opacity,
      transform: [translation],
      ...(isHorizontal && { flexDirection: 'row' }),
    }
  }, [isHorizontal, opacity, styles, translation])
}

/**
 * Helper hook to memoize the caret's display and it's position
 * @param {boolean} animated - Should the PopOpen component be animated
 * @param {string} animationType - Type of animation to use
 * @param {Object} opacity - Animated value of the components opacity
 * @param {Object} prevVisible - React ref holding the visible value of from the last render 
 * @param {boolean} visible - Should the component be visible
 *
 * @return {void}
 */
const useAnimated = (animated, animationType, opacity, prevVisible, visible) => {
  useEffect(() => {
    let animation

    if (animated) {
      if (visible && !prevVisible.current)
        animation = Animated[animationType](opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        })
      else if (!visible && prevVisible.current)
        animation = Animated[animationType](opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })

      animation?.start()
    }

    prevVisible.current = visible

    return () => animation?.stop()
  }, [visible])
}

/**
 * Helper hook to memoize the caret's display and it's position
 * @param {boolean} caret - Should the caret be displayed
 * @param {boolean} position - Position of the caret on the PopOpens component
 * 
 * @return {Object} - Contains properties the describe where the caret should be rendered 
 */
const useCaretPosition = (caret, position) => {
  return useMemo(() => {
    return {
      caretStart: caret && (position === 'bottom' || position === 'right'),
      caretEnd: caret && (position === 'top' || position === 'left')
    }
  }, [caret, position])
}

/**
 * PopMain - Pops open a view to display extra content
 */
export const PopMain = React.forwardRef((props, ref) => {

  const {
    animated=true,
    animationType='timing',
    backgroundColor,
    caret,
    caretPosition='center',
    children,
    numberOfLines,
    position='bottom',
    style,
    styles,
    visible=true,
    ...extraProps
  } = props

  const isChildText = typeof children === 'string'
  const isHorizontal = position === 'left' || position === 'right'

  const prevVisible = useRef(visible)
  const { caretStart, caretEnd } = useCaretPosition(caret, position)
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current

  const animatedStyle = useAnimatedStyle(
    isHorizontal,
    opacity,
    position,
    styles
  )

  useAnimated(
    animated,
    animationType,
    opacity,
    prevVisible,
    visible
  )

  const CaretComponent = (
    <PopCaret
      align={caretPosition}
      position={position}
      backgroundColor={backgroundColor}
      style={styles.caret}
    />
  )

  return (
    <PMain
      ref={ref}
      styles={styles}
      pointerEvents={visible ? 'auto' : 'none'}
      {...extraProps}
    >
      <PopAnimated style={animatedStyle} >
        {caretStart && CaretComponent}

        <PopContainer
          styles={styles}
          textOnly={isChildText}
          backgroundColor={backgroundColor}
        >
          {isChildText ? (
            <PopText
              numberOfLines={numberOfLines}
              styles={styles}
            >
              {children}
            </PopText>
          ) : (
            children
          )}
        </PopContainer>

        {caretEnd && CaretComponent}
      </PopAnimated>
    </PMain>
  )
})

PopMain.propTypes = {
  style: PropTypes.object,
  animated: PropTypes.bool,
  animationType: PropTypes.string, // 'spring' | 'timing',
  backgroundColor: PropTypes.string,
  caret: PropTypes.bool,
  caretPosition: PropTypes.string, // 'left' | 'center' | 'right',
  children: PropTypes.node,
  numberOfLines: number,
  visible: PropTypes.bool,
  position: PropTypes.string, // 'top' | 'right' | 'bottom' | 'left',
}