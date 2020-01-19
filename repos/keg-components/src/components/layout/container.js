/* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import React from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { getPlatform, getPressHandler } from '../../utils'

export const Container = args => {
  const { onPress, onClick, children, flexDir, size, style, ...props } = args

  // Get flex type based on size or style
  const flex = size ? 0 : props.style && props.style.width ? 0 : 1

  return (
    <View
      { ...props }
      style={{ flex, flexDirection: flex && flexDir, ...style }}
      { ...getPressHandler(getPlatform(), onClick || onPress)  }
    >
      { children }
    </View>
  )
}

Container.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
  flexDir: PropTypes.string,
  size: PropTypes.number,
}
