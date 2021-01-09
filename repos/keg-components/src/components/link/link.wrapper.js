import React from 'react'
import { useTheme, useThemeHover } from '@keg-hub/re-theme'
import { getPressHandler, getTarget } from '../../utils'
import { get } from '@keg-hub/jsutils'
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
    'link.default',
    type && `link.${type}`
  )

  const [ ref, themeStyle ] = useThemeHover(
    theme.get(linkStyle, style),
    get(theme, `link.hover`)
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
