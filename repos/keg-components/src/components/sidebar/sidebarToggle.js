import React, { useEffect, useMemo } from 'react'
import { View } from 'KegView'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { ChevronDown } from 'KegIcons/chevronDown'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useWindowClick } from 'KegUseWindowClick'
import { useStyle, useThemeHover, useTheme } from '@keg-hub/re-theme'
import { useToggledStyles } from '../../hooks/useToggledStyles'
import { ToggleMain, ToggleAction, ToggleContent, ToggleText, ToggleIcon } from './sidebar.restyle'

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

const iconRotate = {
  on: { transform: 'rotate(90deg)' },
  off: { transform: 'rotate(270deg)' }
}

const useIconProps = (toggled, themeStyles) => {
  const theme = useTheme()
  const iconStyle = useStyle(themeStyles.icon, toggled ? iconRotate.on : iconRotate.off)
  return useMemo(() => {
    return {
      style: iconStyle,
      size: themeStyles?.icon?.fontSize || theme?.typography?.default?.fontSize,
      stroke: themeStyles?.icon?.c || themeStyles?.icon?.color || theme.colors.palette.white01
    }
  }, [theme, themeStyles, iconStyle])
}

const ToggleContainer = props => {
  const { text, styles, toggled, onPress, setIsToggled, sidebarSize, Icon=ToggleIcon } = props

  const [ ref, themeStyles ] = useThemeHover(styles, styles?.hover)
  const iconProps = useIconProps(toggled, themeStyles)

  useWindowClick(onWindowClick, toggled, setIsToggled)

  return (
    <ToggleAction
      touchRef={ref}
      className={`sidebar-toggle-action`}
      onPress={onPress}
      style={themeStyles?.action}
    >
      <ToggleContent
        className={`sidebar-toggle-content`}
        style={themeStyles?.content}
      >
        { !text
          ? (<Icon {...iconProps}/>)
          : (
              <ToggleText
                className={`sidebar-toggle-text`}
                style={themeStyles?.text}
              >
                { text }
              </ToggleText>
            )
        }
      </ToggleContent>
    </ToggleAction>
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
        <ToggleContainer
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

