import React from 'react'
import { useThemeHover, useTheme } from 're-theme'
import { H2 } from '../../components'
import { get } from 'jsutils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export const Header = ({ title, isToggled, setToggled, TextComp, style }) => {
  
  TextComp = TextComp || H2
  const theme = useTheme()

  const iconStyle = theme.join(
    get(theme, 'app.icons.header.grid'),
    get(theme, 'transition.rotate.default'),
    get(theme, 'layout.float.right'),
    isToggled && get(theme, 'transition.rotate.180')
  )

  const headerTheme = get(theme, 'app.header')
  const [ ref, headerStyle ] = useThemeHover(headerTheme.default, headerTheme.hover)
  
  const styledHeader = isToggled
    ? theme.join(headerTheme.default, headerTheme.hover)
    : headerStyle
  
  return (
    <TextComp style={ style } onClick={ () => setToggled(!isToggled) } >
      <div ref={ ref } style={ styledHeader } >
        { title }
        <span style={ iconStyle } >
          <FontAwesomeIcon icon={ faAngleDown } />
        </span>
      </div>
    </TextComp>
  )
}