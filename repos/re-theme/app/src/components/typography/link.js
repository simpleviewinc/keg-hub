import React from 'react'
import { withTheme } from '@keg-hub/re-theme'

const Link = withTheme(props => {

  const { children, style, theme, ...attrs } = props

  return (
    <a {...attrs} style={theme.get(theme.link, style)}>
      { children }
    </a>
  )

})

export { Link, Link as A }
