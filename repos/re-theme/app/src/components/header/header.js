import React from 'react'
import { useThemeHover, useTheme } from '@keg-hub/re-theme'
import { H2 } from '../../components'
import { get } from '@keg-hub/jsutils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export const Header = ({ title, isToggled, setToggled, TextComp, style }) => {
  
  TextComp = TextComp || H2
  const theme = useTheme()

  const iconStyle = theme.get(
    'app.icons.header.grid',
    'transition.rotate.default',
    'layout.float.right',
    isToggled && 'transition.rotate.180'
  )

  const headerTheme = get(theme, 'app.header')
  const [ ref, headerStyle ] = useThemeHover(headerTheme.default, headerTheme.hover)
  
  const styledHeader = isToggled
    ? theme.get(headerTheme.default, headerTheme.hover)
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