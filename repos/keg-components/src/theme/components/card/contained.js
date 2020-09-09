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
    padding: 0,
    paddingBottom: padding.size / 2,
    margin: margin.size,
    marginBottom: 0,
    marginTop: margin.size - margin.size / 5,
  },
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: get(colors, 'opacity._65'),
    fontWeight: 'bold',
  },
  noBorder: {
    main: {
      borderBottomWidth: 0,
      borderTopWidth: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    text: {
      lineHeight: 20,
    },
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
      paddingBottom: margin.size - margin.size / 5,
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
      lineHeight: 24,
    },
    noBorder: {
      main: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      text: {
        lineHeight: 20,
      },
    },
  },
  media: {
    main: {
      position: 'relative',
      margin: 0,
      marginTop: margin.size - margin.size / 5,
    },
    image: {},
    loadingComp: {
      main: {},
      progress: {},
      indicator: {},
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
