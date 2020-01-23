import React from 'react'
import { List as MList } from 'material-bread'
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
    <MList style={listStyles}>
      { checkCall(buildItems, props) }
      { children }
    </MList>
  )
})
