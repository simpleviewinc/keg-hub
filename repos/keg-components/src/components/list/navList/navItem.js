import React, { useCallback, useMemo } from 'react'
import { Icon } from 'KegIcon'
import { View } from 'KegView'
import { Row } from '../../layout'
import { Touchable } from '../../touchable'
import { Text } from '../../typography/text'
import { NavItemAction } from './navItemAction'
import { useThemeHover, useStyle } from '@keg-hub/re-theme'
import { isStr, checkCall, isFunc, noOpObj, noPropArr } from '@keg-hub/jsutils'
import { overrideComponent } from '../../../utils/components/overrideComponent'

/**
 * RenderActions - Default component to render the actions of the NavItem
 * @param {Object} props
 * @param {Array} props.actions - Group of action props to be pass on to NavItemAction component
 * @param {Object} props.style - Custom style for the component
 *
 * @returns {Component}
 */
const RenderActions = ({ actions=noPropArr, styles=noOpObj, ...props }) => {
  return actions && (
    <View
      className='list-item-actions'
      style={ styles.main }
      >
      { actions.map(action => action && (
        <NavItemAction
          key={ action.name || action.title }
          parentStyles={styles.action}
          { ...props }
          { ...action }
        />
      ))}
    </View>
  ) || null
}

/**
 * RenderAvatar - Default component to render the Avatar of the NavItem
 * @param {Object} props
 * @param {Object} props.avatar - Custom avatar props to pass to the avatar component
 * @param {Object} props.style - Custom style for the component
 *
 * @returns {Component}
 */
const RenderAvatar = ({ avatar, ...props }) => {
  return avatar && (
    <View className='list-item-avatar' {...props} >
      
    </View>
  ) || null
}

/**
 * RenderIcon - Default component to render the icon of the NavItem
 * @param {Object} props
 * @param {Object} props.icon - Custom Icon props to pass to the keg-components Icon
 * @param {Object} props.style - Custom style for the component
 *
 * @returns {Component}
 */
const RenderIcon = ({ icon, style, ...props }) => {
  icon = isStr(icon) ? { name: icon } : icon
  return icon && (
    <Icon
      className='list-item-icon'
      styles={ style }
      { ...props }
      { ...icon }
    />
  ) || null
}

/**
 * RenderTitle - Default component to render the title of the NavItem
 * @param {Object} props
 * @param {string} props.title - Text title content
 * @param {Object} [props.style] - Custom style for the component
 *
 * @returns {Component}
 */
const RenderTitle = ({ style, title, ...props }) => {
  return title && (
    <Text
      className='list-item-title'
      style={ style }
      { ...props }
    >
      {title}
    </Text>
  ) || null
}

/**
 * NavItem - Default item component used to display an item in the NavList component
 * @param {Object} props
 * @param {boolean} [props.active=false] - State for if the item is currently active within the List
 * @param {Component|Object} props.actions - Component or object defining how the item actions are rendered
 * @param {boolean|Object} props.avatar - Defines if and how the avatar component should be rendered
 * @param {Component} props.children - Child components of the item
 * @param {Object} props.components - Allows overriding default components with custom components
 * @param {Component|Object} props.icon - Defines if and how the icon component should be rendered
 * @param {function} props.onItemPress - Called when the item is pressed
 * @param {boolean} [props.showFeedback=true] - Should feedback be shown when the item is pressed 
 * @param {Object} props.styles - Custom styles for the NavItem component
 * @param {string} props.title - Defines if and how the title component should be rendered
 * @param {string} props.uuid - UuId of the list item
 * @param {string} props.id - Id of the list item
 *
 * @returns {Component}
 */
export const NavItem = React.memo(props => {
  const {
    active,
    actions,
    avatar,
    children,
    components=noOpObj,
    icon,
    id,
    onItemPress,
    showFeedback,
    styles=noOpObj,
    title,
    uuid,
  } = props

  const activeStyle = active ? styles.active : noOpObj
  const [ rowRef, itemStyles ] = useThemeHover(styles.default, styles.hover)
  const rowStyles = useStyle(itemStyles.row, activeStyle?.row)

  const onPress = useCallback(
    event => checkCall(onItemPress, event, { title, active, uuid, id }),
    [title, active, uuid, id, onItemPress]
  )

  return (
    <Touchable
      showFeedback={showFeedback || true}
      className='list-item'
      touchRef={ rowRef }
      style={[itemStyles.main, activeStyle?.main]}
      onPress={onPress}
    >
      <Row
        className='list-item-row'
        style={rowStyles}
      >
        { children || ([
          avatar && overrideComponent(
            components.avatar,
            RenderAvatar,
            { key: 'list-item-avatar', avatar, style: itemStyles.avatar },
          ),
          icon && overrideComponent(
            components.icon,
            RenderIcon,
            { key: 'list-item-icon', icon, style: itemStyles.icon }
          ),
          title && overrideComponent(
            components.title,
            RenderTitle,
            { key: 'list-item-title', title, style: [ itemStyles.title, activeStyle?.title ] }
          ),
          actions && overrideComponent(
            components.actions,
            RenderActions,
            { key: 'list-item-actions', actions, styles: itemStyles.actions }
          )
        ])}
      </Row>
    </Touchable>
  )
})


NavItem.Avatar = RenderAvatar
NavItem.Icon = RenderIcon
NavItem.Title = RenderTitle
NavItem.Actions = RenderActions