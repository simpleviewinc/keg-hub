import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import { View } from 'KegView'

export const Divider = ({ style, ...props }) => {
  const theme = useTheme()

  return <View
    {...props}
    style={theme.join(get(theme, ['divider']), style)}
  />
}

Divider.propTypes = {
  style: PropTypes.object,
}
