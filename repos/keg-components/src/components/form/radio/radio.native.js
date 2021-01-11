import React from 'react'
import { withTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../typography/text'

export const Radio = withTheme(props => {
  const { theme, children, style, onClick, onPress, text, ...args } = props

  return (
    <Text
      {...args}
      style={[ get(theme, [ 'form', 'radio' ]), style ]}
    >
      { text }
    </Text>
  )
})

Radio.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}
