import { deepMerge } from 'jsutils'
import { contained } from './contained'
import { padding } from '../../padding'

export const full = deepMerge(contained, {
  main: {
    $all: {
      padding: 0,
    },
  },
  header: {
    container: {
      paddingTop: padding.size / 2,
      paddingBottom: padding.size / 2,
    },
    text: {
      paddingLeft: padding.size,
      paddingRight: padding.size,
    },
    divider: {
      display: 'none',
    },
  },
  body: {
    padding: padding.size,
    paddingTop: 0,
  },
})
