import React from 'react'
import { withTheme } from '@simpleviewinc/re-theme'
import PropTypes from 'prop-types'
import { View } from 'KegView'

export const Section = withTheme(props => {
  const { theme, children, style, type, ...args } = props

  return (
    <View
      {...args}
      style={theme.get(
        `keg-section-${type || 'default'}`,
        `section.default`,
        type && `section.${type}`,
        style
      )}
    >
      { children }
    </View>
  )
})

Section.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
}
