/* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import React, { useMemo } from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { getPlatform, getPressHandler } from '../../utils'
import { pickKeys } from 'jsutils'

/**
 * Checks the for width styles in the props styles object
 * @param {Object} style - passed in styles for the Container
 *
 * @return {boolean} - If a width style rule exists
 */
const hasWidth = style =>
  useMemo(() => {
    return Object.keys(pickKeys(style, [ 'width', 'minWidth', 'maxWidth' ]))
      .length
  }, [style])

/**
 * Container
 * General Wrapper component that's use to build the Grid / Row / Column components
 * @param {Object} props - see PropTypes below
 *
 */
export const Container = ({
  onPress,
  onClick,
  children,
  flexDir,
  size,
  style,
  ...props
}) => {
  // Get flex type based on size or style
  const flexStyle =
    flexDir === 'row'
      ? { flexDirection: flexDir, flex: size ? size : hasWidth(style) ? 0 : 1 }
      : {}

  return (
    <View
      {...props}
      style={{ ...flexStyle, ...style }}
      {...getPressHandler(getPlatform(), onClick || onPress)}
    >
      { children }
    </View>
  )
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  flexDir: PropTypes.string,
  onPress: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
}
