import { flex } from '../flex'
import { helpers } from '../helpers'
import { getThemeDefaults } from '../themeDefaults'

export const modal = (config) => {
  const { colors } = getThemeDefaults()

  return {
    default: {
      main: {
        zIndex: 9998,
        ...flex.center,
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'stretch',
      },
      backdrop: {
        ...helpers.abs,
        backgroundColor: 'rgba(1,1,1,0.2)',
      },
      content: {
        $xsmall: {
          position: 'absolute',
          zIndex: 9999,
          alignSelf: 'center',
          backgroundColor: colors.palette.white01,
        },
        $medium: {
          maxWidth: '80%',
        },
      },
    },
  }

}
