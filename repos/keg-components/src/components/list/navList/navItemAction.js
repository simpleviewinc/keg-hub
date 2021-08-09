import React from 'react'
import { Icon } from 'KegIcon'
import { View } from 'KegView'
import { Touchable } from '../../touchable'
import { Text } from '../../typography/text'
import { useStyle } from '@keg-hub/re-theme'
import { capitalize, noOpObj, exists } from '@keg-hub/jsutils'

/**
 * ListItemAction - Default component to render an Action of a ListItem
 * @param {Object} props
 * @param {function} props.onPress - Called when the component is pressed
 * @param {Object} props.parentStyles - Custom styles from the Action parent ListItem
 * @param {Object} props.iconProps - Custom props to pass to the actions Icon component
 * @param {string} props.name - Text name of the action that should be rendered
 * @param {boolean} props.showFeedback - Show feedback when the action is pressed
 * @param {Object} props.styles - Custom styles for the component
 *
 * @returns {Component}
 */
export const NavItemAction = props => {
  const {
    onPress,
    parentStyles=noOpObj,
    iconProps=noOpObj,
    name,
    showFeedback,
    styles=noOpObj
  } = props

  const mergedStyles = useStyle(parentStyles, styles)
  const iconStyles = useStyle(mergedStyles.icon, iconProps.styles)

  return (
    <View
      className='list-item-action-main'
      style={mergedStyles.main}
    >
      <Touchable
        onPress={onPress}
        showFeedback={exists(showFeedback) ? showFeedback : true}
        style={mergedStyles.touchable}
        className={'list-item-action'}
      >
      {(iconProps) && (
        <Icon
          className='list-item-action-icon'
          {...iconProps}
          styles={iconStyles}
        />
      )}
      {name && (
        <Text
          className={'list-item-action-name'}
          style={mergedStyles.name}
        >
          { capitalize(name) }
        </Text>
      )}
      </Touchable>
    </View>
  )
  
}