import React from 'react'
import { withTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { Text } from '../../typography/text'

export const Radio = withTheme(props => {
  const { theme, children, style, onClick, onPress, text, ...args } = props
  const radioStyle = theme.join(get(theme, [ 'form', 'radio' ]), style)

  return (
    <Text
      {...args}
      style={radioStyle}
    >
      { text }
    </Text>
  )
})

Radio.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string,
}
