import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { View } from '../'

export const Divider = ({ style, ...props }) => {
  const theme = useTheme()

  return (
    <View
      { ...props }
      style={ theme.join(
        get(theme, [ 'components', 'divider' ]),
        style
      )}
    />
  )
}

Divider.propTypes = {
  style: PropTypes.object,
}