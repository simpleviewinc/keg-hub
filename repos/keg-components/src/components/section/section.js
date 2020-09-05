import React from 'react'
import { withTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

export const Section = withTheme(props => {
  const { className, theme, children, style, type, ...args } = props

  return (
    <View
      {...args}
      className={spacedJoin(className, 'keg-section')}
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
