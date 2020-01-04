import React from 'react'
import { uuid } from 'jsutils'
import { IndicatorImage } from './indicatorImage'

const ImgComp = ({ resizeMode, ...attrs }) => (
  <img { ...attrs } />
)

export const Indicator = ({ alt, src, source, style, styleId }) => (
  <IndicatorImage 
    alt={ alt || 'Loading' }
    ImgComp={ ImgComp }
    isWeb={ true }
    src={ src || source }
    style={ style }
    styleId={ styleId || `${uuid()}-web-indicator` }
  />
)