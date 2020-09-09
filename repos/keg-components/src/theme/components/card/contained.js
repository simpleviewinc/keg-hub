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
    fontSize: 20,
    color: colorPalette.black02,
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
      // marginTop: margin.size / 2,
      marginBottom: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0,
    },
  },
  content: {
    main: {
      margin: margin.size,
      marginBottom: 0,
    },
    media: {
      main: {
        margin: margin.size,
        marginBottom: 0,
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
  },
}
