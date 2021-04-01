import React, {useRef, useEffect, useMemo} from 'react'
import { View } from 'KegView'
import { Animated } from 'react-native'
import { Text } from '../typography/text'
import { reStyle } from '@keg-hub/re-theme/reStyle'

/**
 * Main component - Root View of the PopOver component
 */
export const PopMain = reStyle(View)((theme, { styles }) => ({
  width: 100,
  overflow: 'hidden',
  ...styles?.main
}))

/**
 * Animated Container component - Animates the PopOpen in and out of view
 */
export const PopAnimated = reStyle(Animated.View)((theme, { style }) => ({
  ...style
}))

/**
 * Child Container component - Wraps all child content
 */
export const PopContainer = reStyle(View)(
    (theme, { backgroundColor, styles, textOnly}) => ({
      flex: 1,
      zIndex: 1,
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: theme?.colors?.palette?.black01,
      ...(textOnly && { padding: 6 }),
      ...(!!backgroundColor && { backgroundColor }),
      ...styles?.container
  })
)

/**
 * Text component - When the children prop is only single string
 */
export const PopText = reStyle(Text)((theme, { styles }) => ({
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme?.colors?.palette?.white01,
    ...styles?.text
}))

/**
 * Caret component - Renders the arrow on the side of the PopOver component
 */
export const PopCaret = reStyle(View)((theme, props) => {
  const {
    align,
    caretStyles,
    backgroundColor,
    position,
    styles
  } = props

  return {
    zIndex: 0,
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: theme?.colors?.palette?.black01,
    transform: [{ rotate: '45deg' }],
    ...styles.caret,
    ...caretStyles.align[align],
    ...caretStyles.position[position],
    ...(!!backgroundColor && { backgroundColor }),
  }
})
