import React, { useMemo } from 'react'
import { Icon } from 'KegIcon'
import { View } from 'KegView'
import { Row } from '../../layout'
import { Animated } from 'react-native'
import { H6 } from '../../typography/h6'
import { Touchable } from '../../touchable'
import { reStyle } from '@keg-hub/re-theme/reStyle'
import { useToggleAnimate } from '../../../hooks/useToggleAnimate'
import { useTheme, useThemeHover, useStyle } from '@keg-hub/re-theme'
import { overrideComponent } from '../../../utils/components/overrideComponent'
import { get, noOpObj, wordCaps, isStr, isArr, deepMerge} from '@keg-hub/jsutils'

export const NavHeaderRoot = reStyle(Touchable)((_, { first, listStyles, toggledStyle }) => {
  return [
    listStyles?.main,
    toggledStyle?.main,
    first && listStyles?.first?.main,
    first && toggledStyle?.first?.main,
  ]
})

/**
 * Helper hook to build the props passed to the Icon component
 * @param {Object|string} icon - Defines if and how the icon component should be rendered
 *
 * @returns {Object} - Props to pass to the Icon component
 */
const useIconProps = icon => {
  const theme = useTheme()
  return useMemo(() => ({
    name: 'list-header-icon',
    color: theme?.colors?.palette?.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }), [ icon, theme ])
}

/**
 * HeaderIcon
 * @summary Renders the header component for a section from the items passed to NavList component
 * @function
 * @private
 * @param {Object} props
 * @param {Component|Object} props.Icon - Custom Icon component
 * @param {Object} props.iconProps - Defines if and how the icon component should be rendered
 * @param {Object} props.styles - Custom styles for the NavHeader component
 * @param {boolean} props.toggled - True if the header is toggled open
 *
 */
const HeaderIcon = ({ Icon, iconProps, styles, toggled }) => {
  const builtProps = useIconProps(iconProps)
  const { animation } = useToggleAnimate({
    toggled,
    values: {from: 0, to: 1},
    config: {duration: 400}
  })

  return (
    <Animated.View 
      className='list-header-icon'
      style={[
        get(styles, 'icon.animate'),
        {
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg']
            })
          }]
        }
      ]}
    >
      <Icon { ...builtProps } styles={styles} />
    </Animated.View>
  )
}

/**
 * NavHeader - Default item component used to display an item in the NavList component
 * @param {Object} props
 * @param {string} props.uuid - Id of the NavHeader
 * @param {string} props.id - Id of the NavHeader
 * @param {string} props.title - String name of the section
 * @param {Component|Object} props.Icon - Custom Icon component
 * @param {boolean} props.toggled - True if the header is toggled open
 * @param {function} props.onPress - Called when the header is pressed
 * @param {Component} props.children - Child components of the NavHeader
 * @param {Object} props.styles - Custom styles for the NavHeader component
 * @param {Object} props.iconProps - Defines if and how the icon component should be rendered
 * @param {Object} props.components - Allows overriding default components with custom components
 * @param {boolean} [props.first=false] - True if is the first section header of the parent NavList
 * @param {Component|Object} props.actions - Component or object defining how the item actions are rendered
 *
 * @returns {Component}
 */
export const NavHeader = props => {
  const {
    first,
    last,
    onPress,
    styles,
    title,
    Icon,
    toggled,
    children,
    components=noOpObj,
  } = props

  const [rowRef, listStyles] = useThemeHover(styles.default, styles.hover)
  const toggledStyle = toggled ? styles.active : noOpObj
  const rowStyle = useStyle(listStyles.row, toggledStyle?.row)

  const { pos:iconPos, ...iconProps } = (props.iconProps || noOpObj)
  const hasIcon = Boolean(Icon || components.icon)
  const iconLeft = hasIcon && iconPos === 'left'

  const iconStyles = useStyle(listStyles.toggle, toggledStyle?.toggle)
  const textStyles = useStyle(listStyles.title, toggledStyle?.title)

  return (
    <NavHeaderRoot
      touchRef={rowRef}
      last={last}
      first={first}
      onPress={onPress}
      listStyles={listStyles}
      toggledStyle={toggledStyle}
      className={`keg-list-header-main`}
      activeOpacity={ get(styles, 'active.main.opacity') }
    >
    {children || (
      <Row
        style={rowStyle}
        className="list-header-row"
      >
        {iconLeft && (
          overrideComponent(components.icon, HeaderIcon, {
            Icon: Icon,
            styles: styles,
            toggled: toggled,
            iconProps: iconProps,
          })
        )}
        {title && overrideComponent(
          components.title,
          React.memo(({ styles, title }) => (
            <H6 className="list-header-title" style={styles}>
              {title}
            </H6>
          )),
          {title, style: textStyles}
        )}
        {hasIcon && !iconLeft && (
          overrideComponent(components.icon, HeaderIcon, {
            Icon: Icon,
            styles: styles,
            toggled: toggled,
            iconProps: iconProps,
          })
        )}
      </Row>
    )}
  </NavHeaderRoot>
  )
}