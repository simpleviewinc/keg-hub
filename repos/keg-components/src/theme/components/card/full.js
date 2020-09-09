import { deepMerge } from '@keg-hub/jsutils'
import { contained } from './contained'
import { padding } from '../../padding'

export const full = deepMerge(contained, {
  main: {
    $all: {
      padding: 0,
    },
  },
  header: {
    main: {
      paddingTop: padding.size / 2,
      paddingBottom: padding.size / 2,
    },
    text: {
      paddingLeft: padding.size,
      paddingRight: padding.size,
    },
  },
  footer: {
    main: {
      paddingTop: padding.size / 2,
      paddingBottom: padding.size / 2,
    },
    text: {
      paddingLeft: padding.size,
      paddingRight: padding.size,
    },
  },
  content: {
    body: {
      padding: padding.size,
      paddingTop: 0,
    },
  },
})
