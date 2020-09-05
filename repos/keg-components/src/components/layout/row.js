import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { Container } from './container'
import PropTypes from 'prop-types'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

export const Row = ({ className, children, style, ...props }) => {
  const theme = useTheme()

  return (
    <Container
      {...props}
      className={spacedJoin(className, 'keg-row')}
      style={{ ...get(theme, 'layout.grid.row'), ...style }}
      flexDir='row'
    >
      { children }
    </Container>
  )
}

Row.propTypes = {
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
}
