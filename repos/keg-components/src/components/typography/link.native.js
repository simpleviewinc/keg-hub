import React from 'react'
import { withTheme } from 're-theme'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

const Link = withTheme(props => {
  const { onPress, children, style, theme } = props

  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={theme.join(
          { color: theme.colors.third.main },
          theme.text.link,
          style
        )}
      >
        { children }
      </Text>
    </TouchableOpacity>
  )
})

Link.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object,
}

export { Link, Link as A }
