import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { View } from 'KegView'

export const Section = withTheme(props => {
  const { theme, children, style, ...args }  = props

  return (
    <View
      { ...args }
      style={ theme.join(get(theme, [ 'components', 'section', 'main' ]), style) }
    >
      { children }
    </View>
  )

})