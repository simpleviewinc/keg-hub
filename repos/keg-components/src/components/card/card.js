import React from 'react'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { View } from 'KegView'

export const Card = props => {
  const { theme, children, style, ...args }  = props

  return (
    <View
      { ...args }
      style={ theme.join(get(theme, [ 'components', 'card', 'main' ]), style) }
    >
      { children }
    </View>
  )

}