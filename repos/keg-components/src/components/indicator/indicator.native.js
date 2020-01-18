import React from 'react'
import { Image } from 'react-native'
import { IndicatorWrapper } from './indicator.wrapper'

export const Indicator = ({ alt, src, source, style, styleId }) => (
  <IndicatorWrapper 
    alt={ alt || 'Loading' }
    Element={ Image }
    src={ src || source }
    style={ style }
    styleId={ styleId || `keg-native-indicator` }
  />
)