import { getThemeDefaults } from '../themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const checkGroup = (config = noOpObj) => {
  const { colors } = getThemeDefaults()

  const header = {
    $all: {
      $xsmall: {
        width: '70%',
        color: colors.lightGray,
        lineHeight: 19,
        padding: 1,
        paddingBottom: 6,
        marginBottom: 4,
        borderBottomWidth: 1,
        borderStyle: 'dotted',
      },
      $small: {
        padding: 2,
        paddingBottom: 12,
        marginBottom: 7,
      },
    },
    $web: {
      letterSpacing: '0.105em',
    },
  }

  const simpleHeader = {
    main: {
      marginLeft: 27,
    },
  }

  const defStyles = {
    main: {},
    header,
    simpleHeader,
  }

  return (
    checkCall(config.checkGroup, defStyles) ||
    deepMerge(defStyles, config.checkGroup)
  )
}
