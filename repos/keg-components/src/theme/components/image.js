import { transition } from '../transition'
import { get } from '@keg-hub/jsutils'
import { getThemeDefaults } from '../themeDefaults'

export const image = (config) => {
  const { colors } = getThemeDefaults()
  const colorPalette = get(colors, 'palette')

  return {
    image: {
      default: {
        container: {
          $all: {
            display: 'flex',
          },
        },
        loadingComp: {
          main: {
            position: 'absolute',
            alignSelf: 'stretch',
            display: 'flex',
            width: '100%',
            height: '100%',
            zIndex: 1,
            background: colorPalette.white03,
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
        },
        loading: {
          opacity: 0,
        },
        loaded: {
          opacity: 1,
        },
        image: {
          $web: {
            ...transition('opacity', 0.8),
          },
        },
        hover: {},
      }
    }
  }

}
