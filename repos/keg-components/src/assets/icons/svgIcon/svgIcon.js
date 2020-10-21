import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { get } from '@keg-hub/jsutils'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '@keg-hub/re-theme'
import { noPropObj } from '../../../utils/helpers/noop'

/**
 * Custom hook to find the size from the props and styles
 * @param {string=} size - Size of the Svg Component
 * @param {Object=} style - Style object used to apply custom styles to the component
 * @param {Object=} theme - Global theme object
 *
 * @returns {Object} - Contains the height and width props for the Svg element
 */
const useSize = (size, style, theme) => {
  return useMemo(() => {
    const iconSize = size || get(style, 'fontSize')
    const themeSize = get(theme, 'typography.default.fontSize', 15) * 2
    return {
      height: iconSize || get(style, 'height', themeSize),
      width: iconSize || get(style, 'width', themeSize),
    }
  }, [ size, style ])
}

/**
 * Custom hook to find the fill color from the props and styles
 * @param {string=} fill - Fill color of the path element
 * @param {string=} stroke - Color of the stroke for the path element
 * @param {string=} color - Color of the Svg component
 * @param {string} border - Used as the stroke color when no stroke prop is passed
 * @param {Object=} style - Style object used to apply custom styles to the component
 * @param {Object=} theme - Global theme object
 *
 * @returns {Object} - Contains the stroke and fill props for the path element
 */
const useColor = (fill, stroke, color, border, style, theme) => {
  return useMemo(() => {
    const themeColor = get(theme, 'typography.default.color')
    return {
      stroke:
        stroke || border || style.border || color || style.color || themeColor,
      fill: fill || color || style.color || stroke,
    }
  }, [ fill, stroke, color, border, style ])
}

/**
 * SvgIcon
 * @param {object} props
 * @param {string} props.border - Used as the stroke color when no stroke prop is passed
 * @param {string=} props.color - Color of the Svg component
 *                              - Used as the stroke color when no stroke prop is passed
 *                              - Used as the fill color when no fill prop is passed
 * @param {string=} props.clipRule - Svg rule for clipping
 * @param {string=} props.delta - Path definition for the Svg Component
 * @param {string=} props.fill - Fill color of the path element
 * @param {string=} props.fillRule - Svg rule for the fill attribute
 * @param {string=} props.size - Size of the Svg Component
 * @param {string=} props.stroke - Color of the stroke for the path element
 * @param {Object=} props.style - Style object used to apply custom styles to the component
 * @param {string=} props.style.border - Used as the stroke color when no stroke or border prop is passed
 * @param {string=} props.style.color - Used as the fill color when no fill or color prop is passed
 * @param {string=} props.svgFill - Fill color of the parent SVG element
 * @param {string=} props.viewBox - View box size of the parent SVG element
 *
 */
export const SvgIcon = props => {
  const {
    border,
    color,
    clipRule,
    delta,
    fill,
    fillRule,
    size,
    stroke,
    style = noPropObj,
    svgFill,
    viewBox,
    ...attrs
  } = props

  const theme = useTheme()
  const sizeStyle = useSize(size, style, theme)
  const colorStyle = useColor(fill, stroke, color, border, style, theme)

  return (
    <Svg
      {...attrs}
      fill={svgFill}
      viewBox={viewBox}
      style={[ style, sizeStyle ]}
    >
      <Path
        stroke={colorStyle.stroke}
        fill={colorStyle.fill}
        d={delta}
        fillRule={fillRule}
        clipRule={clipRule}
      />
    </Svg>
  )
}

SvgIcon.propTypes = {
  border: PropTypes.string,
  color: PropTypes.string,
  clipRule: PropTypes.string,
  delta: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  size: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object,
  svgFill: PropTypes.string,
  viewBox: PropTypes.string,
}
