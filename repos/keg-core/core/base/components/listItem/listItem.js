import React from 'react'
import { ListItem as MListItem } from 'material-bread'
import { withTheme } from 're-theme'

export const ListItem = withTheme(props => {
  const {
    children,
    contentL,
    contentR,
    disabled,
    icon,
    media,
    onPress,
    ripple,
    selected,
    style,
    styles,
    subText,
    text,
    theme,
  } = props
  const itemStyles = theme.join(
    theme.components.listItem,
    styles && styles.item,
    style
  )

  return (
    <MListItem
      actionItem={contentR}
      disabled={disabled}
      icon={icon}
      leadingActionItem={contentL}
      media={media}
      onPress={onPress}
      rippleProps={ripple}
      secondaryText={subText}
      secondaryTextStyle={styles && styles.subText}
      selected={selected}
      style={itemStyles}
      text={text}
      textStyle={styles && styles.text}
    >
      { children }
    </MListItem>
  )
})
