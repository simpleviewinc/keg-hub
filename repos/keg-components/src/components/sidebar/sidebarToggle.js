import React, { useEffect } from 'react'
import { View } from 'KegView'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { ChevronDown } from 'KegIcons/chevronDown'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useWindowClick } from 'KegUseWindowClick'
import { useStyle, useThemeHover } from '@keg-hub/re-theme'
import { useToggledStyles } from '../../hooks/useToggledStyles'

const ToggleMain = reStyle(View)((theme, props) => {
  return {
    position: 'absolute',
  }
})

const Action = reStyle(Touchable)((theme, props) => {
  return {
    pH: 1,
    pV: 15,
    left: 150,
    width: 20,
    minH: 50,
    top: `45vh`,
    shadowRadius: 2,
    shadowOpacity: 0.20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    bRad: 3,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: theme.colors.palette.black01,
    shadowColor: theme.colors.palette.black03,
    shadowOffset: { width: 2, height: 2 },
    transitionDuration: '0.8s',
    transitionProperty: 'width height background-color',
  }
})
const Content = reStyle(View)((theme, props) => {
  return {

  }
})

const ToggleText = reStyle(Text)((theme, props) => {
  return {

  }
})

const ToggleIcon = reStyle(ChevronDown)((theme, props) => {
  return {
    fontSize: 18,
    pos: 'relative',
    left: -1,
    color: theme.colors.palette.white01,
    transitionDuration: '0.8s',
    transitionProperty: 'width height transform stroke color',
  }
})


/**
 * Helper to listen for click events
 * @function
 * @private
 * <br/>Checks if the sidebar should be closed based on click location
 * @param {boolean} toggled - Is the sidebar toggled open
 * @param {function} setIsToggled - Toggle the state of the sidebar open or closed
 * @param {Object} event - Native dom event
 *
 * @returns {void}
 */
const onWindowClick = (toggled, setIsToggled, event) => {
  if(!toggled) return

  const sideBarEl = event && event.target.closest('.sidebar-main')
  !sideBarEl && setIsToggled(false)
}


const ToggleContent = props => {
  const { text, styles, toggled, onPress, setIsToggled, sidebarSize, Icon=ToggleIcon } = props
  const iconStyles = { transform: toggled ? 'rotate(90deg)' : 'rotate(270deg)' }

  const [ ref, themeStyles ] = useThemeHover(styles, styles?.hover)

  const iconSize = themeStyles?.icon?.fontSize || 20
  const iconStroke = themeStyles?.icon?.c || themeStyles?.icon?.color

  useWindowClick(onWindowClick, toggled, setIsToggled)

  return (
    <Action
      touchRef={ref}
      className={`sidebar-toggle-action`}
      onPress={onPress}
      style={themeStyles?.action}
    >
      <Content
        className={`sidebar-toggle-content`}
        style={themeStyles?.content}
      >
      { !text ? (
        <Icon
          size={iconSize}
          stroke={iconStroke}
          style={[ themeStyles.icon, iconStyles ]}
        />
      ) : (
        <ToggleText
          className={`sidebar-toggle-text`}
          style={themeStyles?.text}
        >
          { text }
        </ToggleText>
      )}

      </Content>
    </Action>
  )
}

export const SidebarToggle = props => {
  const {
    onPress,
    toggled,
    styles,
    text,
    children,
    setIsToggled
  } = props

  const joinedStyles = useStyle('sidebar.toggle', styles)
  const toggleStyles = useToggledStyles(toggled, joinedStyles)

  return (
    <ToggleMain
      className={`sidebar-toggle-main`}
      style={toggleStyles?.main}
    >
    {children || (
        <ToggleContent
          text={text}
          toggled={toggled}
          setIsToggled={setIsToggled}
          styles={toggleStyles}
          onPress={onPress}
        />
      )}
    </ToggleMain>
  )
}

