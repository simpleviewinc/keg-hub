import { flex } from '../flex'
import { helpers } from '../helpers'
import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const modal = (config = noOpObj) => {
  const { colors } = getThemeDefaults()
  const __helpers = helpers(config)
  const __flex = flex(config)

  const defStyles = {
    default: {
      main: {
        zIndex: 9998,
        ...__flex.center,
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'stretch',
      },
      backdrop: {
        ...__helpers.abs,
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

  return {
    modal:
      checkCall(config.modal, defStyles) || deepMerge(defStyles, config.modal),
  }
}
