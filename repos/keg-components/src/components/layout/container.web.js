/* eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/

import React from 'react'
import PropTypes from 'prop-types'

export const Container = args => {
  const { onPress, onClick, children, flexDir, size, style, theme, ...props } = args

  // Get flex type based on size or style
  const flex = size ? 0 : props.style && props.style.width ? 0 : 1

  return (
    <div
      { ...props }
      style={{ flex, flexDirection: flex && flexDir, ...style }}
      onClick={ onClick || onPress }
    >
      { children }
    </div>
  )
}

Container.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  onPress: PropTypes.func,
  flexDir: PropTypes.string,
  size: PropTypes.number,
}
