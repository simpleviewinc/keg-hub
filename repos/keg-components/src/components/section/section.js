import React from 'react'
import { withTheme } from '@keg-hub/re-theme'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { useClassList } from '../../hooks/useClassList'

export const Section = withTheme(props => {
  const { className, theme, children, style, type, ...args } = props

  return (
    <View
      {...args}
      className={useClassList(className, ['keg-section'])}
      accessibilityRole='region'
      style={theme.get(`section.default`, type && `section.${type}`, style)}
    >
      { children }
    </View>
  )
})

Section.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string,
}
