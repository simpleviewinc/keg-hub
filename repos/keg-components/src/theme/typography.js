import { colors } from './colors'

export const typography = {
  font: {
    family: { fontFamily: 'Verdana, Geneva, sans-serif' }
  },
  default: {
    color: colors.text.primary,
    fontSize: 16,
    letterSpacing: 0.15,
    margin: 0,
  },
  caption: {
    color: colors.text.secondary,
    fontSize: 12,
    letterSpacing: 0.4
  },
  h1: {
    fontWeight: 300,
    fontSize: 96,
    letterSpacing: -1.5
  },
  h2: {
    fontWeight: 300,
    fontSize: 60,
    letterSpacing: -0.5
  },
  h3: {
    color: colors.text.secondary,
    fontSize: 48,
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 24,
  },
  h6: {
    color: colors.text.secondary,
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: 500
  },
  paragraph: {
    fontSize: 16,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 16,
    letterSpacing: 0.15
  }
}