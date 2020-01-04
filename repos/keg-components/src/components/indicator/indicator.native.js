import React from 'react'
import { Image } from 'react-native'
import { uuid } from 'jsutils'
import { IndicatorImage } from './indicatorImage'

export const Indicator = ({ alt, src, source, style, styleId }) => (
  <IndicatorImage 
    alt={ alt || 'Loading' }
    ImgComp={ Image }
    isWeb={ false }
    src={ src || source }
    style={ style }
    styleId={ styleId || `${uuid()}-native-indicator` }
  />
)