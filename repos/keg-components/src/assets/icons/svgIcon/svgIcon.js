import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { noPropObj } from '../../../utils/helpers/noop'

export const SvgIcon = props => {
  const {
    border,
    color,
    delta,
    fill,
    stroke,
    style = noPropObj,
    viewBox,
    ...attrs
  } = props
  const strokeColor = stroke || border || style.border || color || style.color
  const fillColor = fill || color || style.color || stroke

  return (
    <Svg
      {...attrs}
      viewBox={viewBox}
      style={style}
    >
      <Path
        stroke={strokeColor}
        fill={fillColor}
        d={delta}
      />
    </Svg>
  )
}
