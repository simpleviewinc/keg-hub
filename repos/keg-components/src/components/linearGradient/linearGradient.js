import React, { useState, useCallback } from 'react'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { noPropArr } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'

/**
 * converted from https://github.com/react-native-web-community/react-native-web-linear-gradient
 * see this link for detailed info on each prop
 *     - https://github.com/https://docs.expo.io/versions/latest/sdk/linear-gradient/
 *
 * @param {object} props
 * @param {Array=} props.locations - An optional array of numbers defining the location of each gradient color stop
 * @param {Array} props.colors - An array of at least two color values that represent gradient colors. Example: ['red', 'blue']
 * @param {{x: number, y:number}=} props.start - An optional object of the following type: { x: number, y: number }
 * @param {{x: number, y:number}=} props.end - Same as start, but for the end of the gradient.
 * @param {boolean=} props.useAngle - used to turn on/off angle based calculation (as opposed to start/end). uses angleCenter and angle prop
 * @param {{x: number, y:number}=} props.angleCenter - the center point of the angle
 * @param {Number} props.angle - is the angle in degrees
 * @param {Component} props.children
 * @param {object} props.style
 * @param {string=} props.className
 */
export const LinearGradient = props => {
  const {
    start = {
      x: 0.5,
      y: 0,
    },
    end = {
      x: 0.5,
      y: 1,
    },
    colors = noPropArr,
    locations = noPropArr,
    useAngle = false,
    angleCenter,
    angle = 0,
    style,
    children,
    className,
    ...otherProps
  } = props

  const [ width, setWidth ] = useState(1)
  const [ height, setHeight ] = useState(1)

  const measure = useCallback(
    ({ nativeEvent }) => {
      setWidth(nativeEvent.layout.width)
      setHeight(nativeEvent.layout.height)
    },
    [ setWidth, setHeight ]
  )

  const newAngle =
    useAngle && angle
      ? `${angle}deg`
      : calculateAngle(width, height, start, end)

  return (
    <View
      className={useClassList(`keg-linear-gradient`, className)}
      {...otherProps}
      style={[
        style,
        {
          backgroundImage: `linear-gradient(${newAngle},${getColors(
            colors,
            locations
          )})`,
        },
      ]}
      onLayout={measure}
    >
      { children }
    </View>
  )
}

/**
 * calculateAngle
 * @param {Number} width
 * @param {Number} height
 * @param {{x: number, y:number}=} start - An optional object of the following type: { x: number, y: number }
 * @param {{x: number, y:number}=} end - Same as start, but for the end of the gradient.
 */
const calculateAngle = (width, height, start, end) => {
  // Math.atan2 handles Infinity
  const newAngle =
    Math.atan2(width * (end.y - start.y), height * (end.x - start.x)) +
    Math.PI / 2
  return newAngle + 'rad'
}
/**
 * getColors
 * @param {Array} colors - array of valid colors
 * @param {Array} locations - array of numbers defining the location of each gradient color stop
 */
const getColors = (colors = noPropArr, locations = noPropArr) => {
  return colors
    .map((color, index) => {
      const location = locations[index]
      let locationStyle = ''
      if (location) {
        locationStyle = ' ' + location * 100 + '%'
      }
      return color + locationStyle
    })
    .join(',')
}

LinearGradient.propTypes = {
  locations: PropTypes.array,
  colors: PropTypes.array,
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  useAngle: PropTypes.bool,
  angleCenter: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  angle: PropTypes.number,
  children: PropTypes.oneOfType([ PropTypes.func, PropTypes.elementType ]),
  style: PropTypes.object,
  className: PropTypes.string,
}
