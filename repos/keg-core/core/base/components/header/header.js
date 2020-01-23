import React from 'react'
import { Appbar } from 'material-bread'
import { withTheme } from 're-theme'
import PropTypes from 'prop-types'
import { get } from 'jsutils'
/**
 * Header
 * @summary Custom Header bar via material-bread. Customize the contents via 'children'
 *
 * @param {Object} props
 * @property {String} props.theme - SVTheme
 * @property {String} props.style - button text
 * @property {String} props.color - button color
 * @property {String} props.barType - regular, prominent, dense, prominent dense. Default regular
 * @property {Object} props.children
 *
 */
export const Header = withTheme(props => {
  const { theme, style, color, barType, children } = props

  const barColor = color || get(theme, 'colors.primary.main', 'transparent')

  return (
    <Appbar style={style} barType={barType || 'regular'} color={barColor}>
      { children }
    </Appbar>
  )
})

Header.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  color: PropTypes.string,
  barType: PropTypes.string,
}
