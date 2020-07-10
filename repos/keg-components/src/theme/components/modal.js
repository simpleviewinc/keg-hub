import { modal as defaults } from '../defaults.json'
import { flex } from '../flex'
import { helpers } from '../helpers'
import { colors } from '../colors'

export const modal = {
  default: {
    main: {
      ...flex.center,
      ...helpers.abs,
      position: 'fixed',
    },
    backdrop: {
      zIndex: 100000,
      ...helpers.abs,
      position: 'fixed',
      backgroundColor: 'rgba(1,1,1,0.2)',
    },
    content: {
      $xsmall: {
        zIndex: 100010,
        width: defaults.width,
        maxWidth: '90%',
        padding: 0,
        borderRadius: 4,
        backgroundColor: colors.palette.white01,
      },
      $medium: {
        maxWidth: '80%',
      },
    },
  },
}
