import { colors } from './colors'
import { Dimensions } from 're-theme'

export const components = {
  button: {
    default: {
      padding: 8,
      borderRadius: 4,
      outline: 'none',
    },
    text: {
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.5,
    },
    outlined: {
      borderColor: "rgba(0,0,0,.29)",
      borderWidth: 1,
      paddingHorizontal: 16,
      outline: 'none',
    },
    contained: {
      paddingHorizontal: 16,
      outline: 'none',
    }
  },
  card: {
    native: {
      shadowRadius: 3,
      shadowOpacity: .5,
      shadowOffset:{ width: 0, height: 3 },
      borderRadius: 5,
      backgroundColor: colors.scale.white.default,
      maxWidth: Dimensions.get('window').width - 40,
    },
    web: {
      // TODO: Add shadow here
      borderRadius: 5,
      backgroundColor: colors.scale.white.default,
      maxWidth: Dimensions.get('window').width - 40,
    }
  },
  divider: {
    default: {
      width: "100%",
      backgroundColor: "rgba(0,0,0,.12)"
    }
  },
  drawer: {
    default: {

    },
  },
  image: {
    default: {}
  },
  loading: {
    default: {},
    wrapper: {},
    progress: {}
  },
  section: {
    default: {}
  }
}