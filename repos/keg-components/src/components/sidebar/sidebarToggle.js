import React, { useEffect, useMemo } from 'react'
import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Touchable } from '../touchable'
import { Text } from '../typography/text'
import { ChevronDown } from 'KegIcons/chevronDown'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useWindowClick } from 'KegUseWindowClick'
import { useStyle, useThemeHover, useTheme } from '@keg-hub/re-theme'
import { useToggledStyles } from '../../hooks/useToggledStyles'
import { ToggleMain, ToggleAction, ToggleContent, ToggleIcon } from './sidebar.restyle'

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

/**
 * Styles to rotate the Icon. Defined outside the component to keep reference identity
 * @type {Object}
 */
const iconRotate = {
  on: { transform: 'rotate(90deg)' },
  off: { transform: 'rotate(270deg)' }
}

/**
 * Helper hook to memoize the props for the Icon
 * @function
 * @private
 * @param {boolean} toggled - Is the sidebar toggled open
 * @param {Object} themeStyles - Styles built from the theme and passed in style object
 *
 * @returns {Object} - Memoized Icon props
 */
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

/**
 * ToggleContainer
 * @type {React.Component}
 * @param {Object} props
 * @param {string} props.text - Text to display when no icon is shown
 * @param {Object} props.styles - Defines how the component should look
 * @param {boolean} props.toggled - State of the sidebar, true if sidebar is open
 * @param {function} props.onPress - Method called when the component is pressed
 * @param {function} props.setIsToggled - Method to switch the toggled state when called
 * @param {number} props.sidebarWidth - Width of the sideBar component
 * @param {React.Component} props.Icon - Overrides the default Icon Component
 *
 */
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
      <View
        className={`sidebar-toggle-content`}
        style={themeStyles?.content}
      >
        { !text
          ? (<Icon {...iconProps}/>)
          : (
              <Text
                className={`sidebar-toggle-text`}
                style={themeStyles?.text}
              >
                { text }
              </Text>
            )
        }
      </View>
    </ToggleAction>
  )
}

/**
 * SidebarToggle
 * @type {React.Component}
 * @param {Object} props - see Sidebar PropTypes below
 * @param {function} props.onPress - Method called when the component is pressed
 * @param {boolean} props.toggled - State of the sidebar, true if sidebar is open
 * @param {Object} props.styles - Defines how the component should look
 * @param {string} props.text - Text to display when no icon is shown
 * @param {React.Component} props.children - Components to be render as Children of this component
 * @param {function} props.setIsToggled - Method to switch the toggled state when called
 * @param {number} props.sidebarWidth - Width of the sideBar component
 *
 */
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

SidebarToggle.propTypes = {
  children: PropTypes.node,
  /**
   * Method called when the component is pressed
   */
  onPress: PropTypes.func,
  /**
   * State of the sidebar, true if sidebar is open
   */
  toggled: PropTypes.bool,
  /**
   * Method called when the component is pressed
   */
  setIsToggled: PropTypes.func,
  /**
   * Defines how the component should look
   */
  styles: PropTypes.object,
  /**
   * Text to display when no icon is shown
   */
  text: PropTypes.string,
  /**
   * Width of the sidebar in pixels
   */
  sidebarWidth: PropTypes.number
}