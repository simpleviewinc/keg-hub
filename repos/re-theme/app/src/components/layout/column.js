import React from 'react'
import { withTheme } from 're-theme'
import { Container } from './container'
import PropTypes from 'prop-types'

export const Column = withTheme(({ children, size, center, ...props }) => {
  const theme = props.theme || { layout: {} }
  const total = props.theme.layout.columns || 12
  size = size > total ? total : size
  const colWidth = parseFloat(size * (100 / total)).toFixed(4)

  return (
    <Container
      {...props}
      theme={theme}
      size={size}
      style={{
        ...theme.layout.column,
        ...props.style,
        minWidth: `${colWidth}%`,
      }}
      flexDir='column'
    >
      { children }
    </Container>
  )
})

Column.propTypes = {
  size: PropTypes.number.isRequired,
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
}
