import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { View } from 'KegView'

export const Divider = ({ style, ...props }) => {
  const theme = useTheme()

  return (
    <View
      accessibilityRole='separator'
      {...props}
      style={[ get(theme, ['divider']), style ]}
    />
  )
}

Divider.propTypes = {
  style: PropTypes.object,
}
