import { deepFreeze } from '@ltipton/jsutils'

export const Constants = deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize',
  ADD_EVENT: 'addEventListener',
  REMOVE_EVENT: 'removeEventListener',
  NO_CACHE: '__$$RE_NO_CACHE__',
  PLATFORM: {
    NATIVE: '$native',
    WEB: '$web',
    ALL: '$all',
  },
  CSS_UNITS: [
    '%',
    'cm',
    'ch',
    'em',
    'rem',
    'ex',
    'in',
    'mm',
    'pc',
    'pt',
    'px',
    'vw',
    'vh',
    'vmin',
    'vmax',
  ],
})
