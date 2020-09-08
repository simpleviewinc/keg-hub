import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { Container } from './container'
import PropTypes from 'prop-types'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

const widthFromSize = (size, theme) => {
  const total = get(theme, [ 'layout', 'columns' ], 12)
  size = size > total ? total : size
  const colWidth = parseFloat(size * (100 / total)).toFixed(4)

  return { minWidth: `${colWidth}%`, maxWidth: `${colWidth}%` }
}

const getColumnWidth = (size, theme) => {
  return size ? widthFromSize(size, theme) : { flexGrow: 1 }
}

export const Column = ({ className, children, size, center, ...props }) => {
  const theme = useTheme()

  return (
    <Container
      {...props}
      className={spacedJoin(className, 'keg-column')}
      size={size}
      flexDir='column'
      style={theme.join(
        get(theme, [ 'layout', 'grid', 'column' ]),
        props.style,
        getColumnWidth(size, theme)
      )}
    >
      { children }
    </Container>
  )
}

Column.propTypes = {
  size: PropTypes.number,
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
}
