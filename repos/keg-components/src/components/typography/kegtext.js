import React from 'react'
import { capitalize } from '@keg-hub/jsutils'
import { KegText as NativeText } from './kegtext.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

export const KegText = element => {
  return StyleInjector(
    NativeText(element),
    { displayName: capitalize(element), className: `keg-${element}` }
  )
}
