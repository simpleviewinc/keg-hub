import { colors } from './colors'
import { margin } from './margin'
import defaults from './defaults.json'
import { get } from 'jsutils'

const fontDefs = get(defaults, 'font', {})

export const typography = {
  font: {
    family: {
      $native: {},
      $web: {
        fontFamily: fontDefs.family || 'Verdana, Geneva, sans-serif',
      },
    },
  },
  default: {
    color: colors.opacity._85,
    fontSize: fontDefs.size || 16,
    letterSpacing: fontDefs.spacing || 0.15,
    margin: 0,
  },
  caption: {
    color: colors.opacity._60,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  h1: {
    fontWeight: '300',
    fontSize: 96,
    letterSpacing: -1.5,
  },
  h2: {
    fontWeight: '300',
    fontSize: 60,
    letterSpacing: -0.5,
  },
  h3: {
    color: colors.opacity._60,
    fontSize: 48,
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 24,
  },
  h6: {
    color: colors.opacity._60,
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: '500',
  },
  label: {
    minWidth: '100%',
    fontSize: 11,
    letterSpacing: 0.15,
    fontWeight: '700',
    marginBottom: margin.size / 4,
  },
  paragraph: {
    fontSize: fontDefs.size || 16,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: fontDefs.spacing || 0.15,
  },
}
