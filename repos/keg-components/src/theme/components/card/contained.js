import { colors } from '../../colors'
import { margin } from '../../margin'
import { padding } from '../../padding'
import { flex } from '../../flex'
import { helpers } from '../../helpers'
import { get } from 'jsutils'

const opacity05 = get(colors, 'opacity._05')
const colorPalette = get(colors, 'palette')

export const contained = {
  main: {
    $native: {
      shadowColor: opacity05,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1,
    },
    $web: {
      boxShadow: `1px 1px 5px ${opacity05}`,
    },
    $all: {
      backgroundColor: colorPalette.white01,
      borderWidth: 1,
      padding: padding.size,
      margin: margin.size,
      marginBottom: 0,
      borderColor: colorPalette.gray01,
      borderStyle: 'solid',
    },
  },
  container: {
    backgroundColor: colorPalette.transparent,
  },
  footer: {
    container: {},
    text: {},
    divider: {},
  },
  header: {
    container: {
      ...flex.left,
      ...flex.column,
    },
    text: {
      fontSize: 16,
      color: colorPalette.black02,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    divider: {},
  },
  divider: {
    marginBottom: margin.size,
    hairlineWidth: 1,
  },
  media: {
    container: {
      marginBottom: margin.size,
      width: '100%',
    },
    image: {
      width: '100%',
    },
    loadingComp: {
      indicator: {
        icon: {
          fontSize: '100px',
          color: colorPalette.gray01,
        },
      },
    },
    video: {
      width: '100%',
    },
  },
  featured: {
    title: {
      fontSize: 18,
      marginBottom: 8,
      color: colorPalette.white01,
      fontWeight: '800',
    },
    subtitle: {
      fontSize: 13,
      marginBottom: 8,
      color: colorPalette.white01,
      fontWeight: '400',
    },
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: opacity05,
    alignSelf: 'stretch',
    justifyContent: 'center',
    ...helpers.abs,
  },
  body: {},
}
