import React from 'react'
import { Container } from './container'
import { Row } from './row'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { isArr, get } from '@keg-hub/jsutils'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

/**
 * Builds the styles based on the passed in isCenter param
 *
 * @param {*} isCenter - how to center the children. Should be x / y || true
 * @returns { object } - built center styles
 */
const buildCenterStyles = isCenter => {
  return isCenter === 'x' || isCenter === 'xaxis' || isCenter === 'x-axis'
    ? { justifyContent: 'center' }
    : isCenter === 'y' || isCenter === 'yaxis' || isCenter === 'y-axis'
      ? { alignItems: 'center' }
      : (isCenter && { alignItems: 'center', justifyContent: 'center' }) || {}
}

/**
 * Checks each child to determine if it's a column or row and if content is centered
 *
 * @param  { array || object } children - React Components
 * @return { bool }
 */
const getChildAttrs = children => {
  children = (isArr(children) && children) || [children]

  return children.reduce(
    (attrs, child) => {
      if (attrs.isRow && attrs.isCenter) return attrs
      if (!attrs.isRow && child && child.type === Row) attrs.isRow = true
      if (!attrs.isCenter && child && child.props && child.props.center)
        attrs.isCenter = child.props.center.toString().toLowerCase()

      return attrs
    },
    { isRow: false, isCenter: false }
  )
}

export const Grid = ({ className, children, style, ...props }) => {
  const theme = useTheme()
  const { isRow, isCenter } = getChildAttrs(children)

  return (
    <Container
      {...props}
      className={spacedJoin(className, 'keg-grid')}
      flexDir={isRow ? 'column' : 'row'}
      size={1}
      style={theme.join(
        get(theme, [ 'layout', 'grid', 'wrapper' ]),
        style,
        isCenter && buildCenterStyles(isCenter)
      )}
    >
      { children }
    </Container>
  )
}

Grid.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
}
