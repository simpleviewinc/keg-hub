import React, { useMemo } from 'react'
import { get } from '@keg-hub/jsutils'
import Svg, { Path } from 'react-native-svg'
import { useTheme } from '@keg-hub/re-theme'
import { noPropObj } from '../../../utils/helpers/noop'

const useSize = (size, style, theme) => {
  return useMemo(() => {
    const iconSize = size || get(style, 'fontSize')
    const themeSize = get(theme, 'typography.default.fontSize', 15) * 2
    return {
      height: iconSize || get(style, 'height', themeSize),
      width: iconSize || get(style, 'width', themeSize)
    }
  }, [size, style])
}

const useColor = (fill, stroke, color, border, style, theme) => {
  return useMemo(() => {
    const themeColor = get(theme, 'typography.default.color')
    return {
      stroke: stroke || border || style.border || color || style.color || themeColor,
      fill: fill || color || style.color || stroke
    }
  }, [ fill, stroke, color, border, style ])
}

export const SvgIcon = props => {
  const {
    border,
    color,
    delta,
    fill,
    name,
    size,
    stroke,
    style = noPropObj,
    viewBox,
    ...attrs
  } = props

  const theme = useTheme()
  const strokeColor = stroke || border || style.border || color || style.color
  const fillColor = fill || color || style.color || stroke

  const sizeStyle = useSize(size, style, theme)
  const colorStyle = useColor(fill, stroke, color, border, style, theme)

  return (
    <Svg
      {...attrs}
      viewBox={viewBox}
      style={[ style, sizeStyle ]}
    >
      <Path
        stroke={colorStyle.stroke}
        fill={colorStyle.fill}
        d={delta}
      />
    </Svg>
  )
}
