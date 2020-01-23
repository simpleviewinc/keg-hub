import React from 'react'
import { View } from 'SVComponents/native'
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
    <View onPress={onPress} style={itemStyles} >
      { children }
    </View>
  )
})
