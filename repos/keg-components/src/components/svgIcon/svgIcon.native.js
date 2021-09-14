import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import Svg, { Path } from 'react-native-svg'
import { useTheme, useStyle } from '@keg-hub/re-theme'
import {
  get,
  deepMerge,
  isArr,
  noPropObj,
  isStr,
  eitherArr,
} from '@keg-hub/jsutils'
import { getPlatform } from 'KegGetPlatform'
const isWeb = getPlatform() === 'web'

const defClass = 'keg-svg-icon'

/**
 * Custom hook to check if the size prop is an array, and merge it. Otherwise just returns the style object
 * @param {Object|Array=} style - Style object used to apply custom styles to the component
 *
 * @returns {Object} - Merged style object
 */
const useIconStyle = style => {
  return useMemo(() => {
    return isArr(style) ? deepMerge(...style) : style
  }, [style])
}

/**
 * Custom hook to find the size from the props and styles
 * @param {string=} size - Size of the Svg Component
 * @param {Object=} style - Style object used to apply custom styles to the component
 * @param {Object=} theme - Global theme object
 *
 * @returns {Object} - Contains the height and width props for the Svg element
 */
const useSize = (size, width, height, style, theme) => {
  return useMemo(() => {
    const iconSize = size || get(style, 'fontSize')
    const themeSize = get(theme, 'typography.default.fontSize', 15) * 2
    return {
      height: height || iconSize || get(style, 'height', themeSize),
      width: width || iconSize || get(style, 'width', themeSize),
    }
  }, [ size, width, height, style ])
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
 * Custom hook to get the classes for the SVG component on web
 * @param {Array|string=} className - Class name(s) to add
 *
 * @returns {Object} - Contains a className prop if on a web platform, otherwise it's empty
 */
const useClassName = className => {
  if (!isWeb) return noPropObj

  const deps = eitherArr(className, [className]).join(' ')
  return useMemo(() => {
    const classes = isArr(className)
      ? className.join(' ')
      : isStr(className)
        ? className
        : ''
    return {
      className: classes.includes(defClass)
        ? classes
        : `${defClass} ${classes}`,
    }
  }, [deps])
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
export const SvgIcon = React.forwardRef((props, ref) => {
  const {
    border,
    className,
    color,
    clipRule,
    delta,
    fill,
    fillRule,
    height,
    size,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    style = noPropObj,
    svgFill,
    viewBox,
    width,
    children,
    ...attrs
  } = props

  const theme = useTheme()
  const iconStyle = useIconStyle(style)
  const sizeStyle = useSize(size, width, height, iconStyle, theme)
  const svgStyles = useStyle(iconStyle, sizeStyle)
  const colorStyle = useColor(fill, stroke, color, border, iconStyle, theme)
  const classProps = useClassName(className)

  return (
    <Svg
      {...attrs}
      {...classProps}
      fill={svgFill}
      viewBox={viewBox}
      style={svgStyles}
    >
      { delta && 
          <Path
            clipRule={clipRule}
            d={delta}
            fill={colorStyle.fill}
            fillRule={fillRule}
            stroke={colorStyle.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
          />
      }
      { children }
    </Svg>
  )
})

SvgIcon.propTypes = {
  border: PropTypes.string,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  color: PropTypes.string,
  clipRule: PropTypes.string,
  delta: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  stroke: PropTypes.string,
  style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  svgFill: PropTypes.string,
  viewBox: PropTypes.string,
}

export * from 'react-native-svg'
