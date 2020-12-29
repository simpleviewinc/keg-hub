import React, { useState, useLayoutEffect, useRef } from 'react'
import { get, isFunc } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'

const getHeight = (height, toggled) => {
  return toggled
    ? height
    : height && !toggled
      ? 0
      : null
}

export const Slider = props => {
  
  const theme = useTheme()

  const slideRef = useRef(null)

  const { defHeight, Element } = props
  const [ height, setHeight ] = useState(defHeight || null)

  useLayoutEffect(() => {
    const curHeight = get(slideRef, 'current.offsetHeight')

    if(curHeight === 0) return

    height !== curHeight && setHeight(curHeight)
  }, [ height ])

  const sliderStyle = theme.get(
    'transition.height',
    'layout.full.width',
    props.style,
    { maxHeight: getHeight(height, props.toggled) },
  )

  return (
    <div ref={ slideRef } style={ sliderStyle } >
      { isFunc(Element) && <Element setHeight={ setHeight } parentHeight={ height } /> }
      { props.children }
    </div>
  )
}
