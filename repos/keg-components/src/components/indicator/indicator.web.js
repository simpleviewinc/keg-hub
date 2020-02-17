import React from 'react'
import { IndicatorWrapper } from './indicator.wrapper'

const Element = ({ resizeMode, ...attrs }) => (
  <img alt={ attrs.alt || 'Loading' } { ...attrs } />
)

export const Indicator = ({ alt, src, source, style }) => (
  <IndicatorWrapper 
    alt={ alt || 'Loading' }
    Element={ Element }
    isWeb={ true }
    src={ src || source }
    style={ style }
  />
)