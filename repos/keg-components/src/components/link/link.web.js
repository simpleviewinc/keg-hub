import React from 'react'
import { useTheme, useThemeHover } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { KegText } from 'KegText'

const KegLink = KegText('link')

const Link = props => {
  const theme = useTheme()
  const { children, href, onPress, onClick, style, styleId, target, type } = props

  const linkStyle = theme.get(
    styleId || `keg-web-link-${ type || 'default' }`,
    'typography.font.family',
    'components.link.default',
    type && `components.link.${type}`,
  )

  const [ ref, themeStyle ] = useThemeHover(
    theme.join(linkStyle, style),
    get(theme, `components.link.hover` ),
  )

  return (
    <KegLink
      ref={ ref }
      href={ href }
      target={ target }
      style={ themeStyle }
      styleId={ styleId && `${styleId}-link-text` }
      onClick={ onClick || onPress }
    >
      { children }
    </KegLink>
  )
}

Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  styleId: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.string,
}

export { Link, Link as A }