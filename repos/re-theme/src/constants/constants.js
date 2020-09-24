import { deepFreeze } from '@keg-hub/jsutils'

export const Constants = deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize',
  ADD_EVENT: 'addEventListener',
  REMOVE_EVENT: 'removeEventListener',
  KEG_STYLES_TAG_ID: `keg-components-stylesheet`,
  PLATFORM: {
    NATIVE: '$native',
    IOS: '$ios',
    android: '$android',
    WEB: '$web',
    ALL: '$all',
  },
})
