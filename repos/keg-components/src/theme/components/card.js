import { colors } from '../colors'
import { margin } from '../margin'
import { helpers } from '../helpers'

export const card = {
  container: {
    $native: {
      shadowColor: colors.opacity._05,
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1,
    },
    $web: {
      boxShadow: `1px 1px 5px ${ colors.opacity._05 }`
    },
    $all: {
      backgroundColor: colors.palette.white01,
      borderWidth: 1,
      padding: 15,
      margin: 15,
      marginBottom: 0,
      borderColor: colors.palette.gray01,
      borderStyle: 'solid',
    },
  },
  wrapper: {
    backgroundColor: colors.palette.transparent,
  },
  title: {
    fontSize: 14,
    color: colors.palette.black02,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: margin.size,
  },
  divider: {
    marginBottom: margin.size,
    hairlineWidth: 1,
  },
  image: {
    wrapper: {
      display: 'inline-flex',
      marginBottom: margin.size,
      width: '100%'
    },
    image: {
      width: '100%'
    }
  },
  featured: {
    title: {
      fontSize: 18,
      marginBottom: 8,
      color: colors.palette.white01,
      fontWeight: '800',
    },
    subtitle: {
      fontSize: 13,
      marginBottom: 8,
      color: colors.palette.white01,
      fontWeight: '400',
    }
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.opacity._05,
    alignSelf: 'stretch',
    justifyContent: 'center',
    ...helpers.abs,
  },
  children: {
    marginTop: margin.size,
  },
}