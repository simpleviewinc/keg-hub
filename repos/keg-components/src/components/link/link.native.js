import React from 'react'
import { useTheme } from 'KegReTheme'
import { get, isStr, checkCall } from 'jsutils'
import { TouchableOpacity, Text, Linking } from 'react-native'
import PropTypes from 'prop-types'

const openLink = (url, onPress) => {
  return event => {
    isStr(url) && Linking.openURL(url).catch((err) => console.error('Could not open url!', err))
    checkCall(onPress, event, url)
  }
}

const Link = props => {

  const theme = useTheme()
  const { children, href, onClick, onPress, style, styleId, type } = props

  const linkStyle = theme.get(
    styleId || `keg-web-link-${ type || 'default' }`,
    'typography.font.family',
    'components.link.default',
    type && `components.link.${type}`,
  )

  return (
    <TouchableOpacity onPress={ openLink(href, onClick || onPress) }>
      <Text style={ theme.join(linkStyle, style) }>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

Link.propTypes = {
  href: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  styleId: PropTypes.string,
  type: PropTypes.string,
}

export { Link, Link as A }
