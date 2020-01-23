import React from 'react'
import { View } from 'SVComponents'
import { withTheme } from 're-theme'
import { isObj, checkCall } from 'jsutils'

export const List = withTheme(props => {
  const { theme, children, buildItems, style, styles } = props
  const listStyles = theme.join(
    theme.components.list,
    isObj(styles) && styles.list,
    style
  )

  return (
    <View style={listStyles}>
      { checkCall(buildItems, props) }
      { children }
    </View>
  )
})
