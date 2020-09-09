import { colors } from '../../colors'
import { margin } from '../../margin'
import { padding } from '../../padding'
import { flex } from '../../flex'
import { helpers } from '../../helpers'
import { get } from '@keg-hub/jsutils'

const opacity05 = get(colors, 'opacity._5')
const colorPalette = get(colors, 'palette')

const section = {
  main: {
    ...flex.left,
    ...flex.column,
    borderColor: colorPalette.gray01,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: padding.size / 2,
    paddingTop: 0,
    margin: margin.size,
    marginBottom: 0,
  },
  text: {
    fontSize: 24,
    color: get(colors, 'opacity._65'),
    fontWeight: 'bold',
  },
}

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
      margin: margin.size,
      paddingBottom: margin.size,
      borderColor: colorPalette.gray01,
      borderStyle: 'solid',
      borderWidth: 1,
    },
  },
  container: {
    backgroundColor: colorPalette.transparent,
  },
  header: section,
  footer: {
    ...section,
    main: {
      ...section.main,
      paddingTop: padding.size / 2,
      paddingBottom: 0,
      marginBottom: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0,
    },
    text: {
      ...section.text,
      fontSize: 20,
    }
  },
  media: {
    main: {
      margin: 0,
      marginTop: margin.size / 2,
    },
    image: {},
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
  content: {
    main: {
      margin: margin.size,
      marginBottom: 0,
    },
    callout: {
      title: {
        fontSize: 18,
        marginBottom: margin.size / 4,
        color: get(colors, 'opacity._40'),
        fontWeight: '800',
      },
      subtitle: {
        fontSize: 13,
        marginBottom: margin.size,
        color: get(colors, 'opacity._40'),
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
  },
}
