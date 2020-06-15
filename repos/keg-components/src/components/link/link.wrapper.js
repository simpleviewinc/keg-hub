import React from 'react'
import { useTheme, useThemeHover } from '@simpleviewinc/re-theme'
import { getPressHandler, getTarget } from '../../utils'
import { get } from 'jsutils'
import PropTypes from 'prop-types'

const getSpacer = isWeb => {
  return isWeb ? ' ' : '\n'
}

export const LinkWrapper = props => {
  const theme = useTheme()
  const {
    children,
    Element,
    isWeb,
    href,
    onPress,
    onClick,
    space,
    style,
    target,
    type,
  } = props

  const linkStyle = theme.get(
    'typography.font.family',
    'components.link.default',
    type && `components.link.${type}`
  )

  const [ ref, themeStyle ] = useThemeHover(
    theme.join(linkStyle, style),
    get(theme, `components.link.hover`)
  )

  const spacer = space && getSpacer(space, isWeb)

  return (
    <>
      { spacer }
      <Element
        ref={ref}
        href={href}
        style={themeStyle}
        {...getPressHandler(isWeb, onClick, onPress)}
        {...getTarget(isWeb, target)}
      >
        { children }
      </Element>
      { spacer }
    </>
  )
}

LinkWrapper.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  type: PropTypes.string,
}
