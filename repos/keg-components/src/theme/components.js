import { colors } from './colors'

export const components = {
  button: {
    main: {
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
    main: {
      backgroundColor: colors.scale.white.default,
      borderRadius: 2
    }
  },
  divider: {
    main: {
      width: "100%",
      backgroundColor: "rgba(0,0,0,.12)"
    }
  },
  drawer: {
    main: {

    },
  },
  loading: {
    main: {},
    wrapper: {},
    progress: {}
  },
  section: {
    main: {}
  }
}