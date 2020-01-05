import React from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import { Container } from './container'
import PropTypes from 'prop-types'

export const Column = withTheme(({ children, size, center, theme, ...props }) => {

  const total = get(theme, [ 'layout', 'columns' ], 12)

  size = size > total ? total : size
  const colWidth = parseFloat(size * (100 / total)).toFixed(4)

  return (
    <Container
      {...props}
      size={ size }
      flexDir='column'
      style={ theme.join(
        get(theme, [ 'layout', 'grid', 'column' ]),
        props.style,
        { minWidth: `${colWidth}%`, maxWidth: `${colWidth}%` },
      )}
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
