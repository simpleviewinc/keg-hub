import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { View } from '../'

export const Divider = ({ style, styleId, ...props }) => {
  const theme = useTheme()

  return (
    <View
      { ...props }
      style={ theme.get(
        styleId || `key-divider`,
        'components.divider',
        style
      )}
    />
  )
}

Divider.propTypes = {
  style: PropTypes.object,
}