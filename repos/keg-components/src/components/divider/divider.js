import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@svkeg/re-theme'
import { get } from '@svkeg/jsutils'
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
