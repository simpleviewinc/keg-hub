import { get, set, deepClone } from '@keg-hub/jsutils'
import { buildSurfaceStyles } from '../../utils/styles/buildColorStyles'
import { getThemeDefaults } from '../themeDefaults'

export const loading = (config) => {
  const { colors } = getThemeDefaults()
  const colorPalette = get(colors, 'palette')

  const styles = {
    main: {
      position: 'relative',
    },
    progress: {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    indicator: {
      icon: {
        fontSize: '100px',
        color: colorPalette.gray02,
      },
    },
  }

  return {
    loading: buildSurfaceStyles((colorType, surfaces) => {
      const surfaceStyles = deepClone(styles)
      set(
        surfaceStyles,
        'indicator.icon.color',
        get(surfaces, `${colorType}.colors.main`)
      )

      return surfaceStyles
    })
  }

}

