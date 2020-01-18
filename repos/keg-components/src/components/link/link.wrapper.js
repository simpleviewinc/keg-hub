import React from 'react'
import { useTheme, useThemeHover } from 'KegReTheme'
import { getPressHandler, getTarget } from '../../utils'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import { KegText } from 'KegText'


const getSpacer = (isWeb) => {
  return isWeb ? ' ' : '\n'
}

export const LinkWrapper = props => {

  const theme = useTheme()
  const {
    children,
    Element,
    isWeb,
    elType,
    href,
    onPress,
    onClick,
    space,
    style,
    styleId,
    target,
    type 
  } = props

  const linkStyle = theme.get(
    styleId || `keg-${elType}-link-${ type || 'default' }`,
    'typography.font.family',
    'components.link.default',
    type && `components.link.${type}`,
  )

  const [ ref, themeStyle ] = useThemeHover(
    theme.join(linkStyle, style),
    get(theme, `components.link.hover` ),
  )

  const spacer = space && getSpacer(space, isWeb)

  return (
    <>
      { spacer }
      <Element
        ref={ ref }
        href={ href }
        style={ themeStyle }
        { ...getPressHandler(isWeb, onClick, onPress) }
        { ...getTarget(isWeb, target) }
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
  styleId: PropTypes.string,
  target: PropTypes.string,
  type: PropTypes.string,
}