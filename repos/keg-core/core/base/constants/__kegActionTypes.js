import { keyMap, deepMerge } from 'jsutils'
import { ActionTypes as TapActionTypes } from 'SVConstants/actionTypes'

export const ActionTypes = deepMerge(
  keyMap(
    [
      // App
      'APP_INIT',

      // Items
      'UPSERT_ITEM',
      'UPSERT_ITEMS',
      'REMOVE_ITEM',

      // Taps
      'SWITCHING_TAP',
    ],
    true
  ),
  TapActionTypes
)
