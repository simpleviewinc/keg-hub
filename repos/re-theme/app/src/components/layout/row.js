import React from 'react'
import { withTheme } from 're-theme'
import { Container } from './container'
import PropTypes from 'prop-types'

export const Row = withTheme(({ children, ...props }) => {
  const theme = props.theme || { layout: {} }

  return (
    <Container
      {...props}
      theme={theme}
      style={{ ...theme.layout.row, ...props.style }}
      flexDir='row'
    >
      { children }
    </Container>
  )
})

Row.propTypes = {
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
}
