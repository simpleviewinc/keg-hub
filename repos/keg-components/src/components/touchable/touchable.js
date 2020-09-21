import React from 'react'
import { Touchable as KegTouchable } from './touchable.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'


export const Touchable = StyleInjector(
  KegTouchable,
  { displayName: 'Touchable', className: 'keg-touchable' }
)

Touchable.propTypes = KegTouchable.propTypes
