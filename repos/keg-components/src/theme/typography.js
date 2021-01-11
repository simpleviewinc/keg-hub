import { getThemeDefaults } from './themeDefaults'
import { deepMerge, noOpObj, checkCall } from '@keg-hub/jsutils'

export const typography = (config = noOpObj) => {
  const { font, colors, margin } = getThemeDefaults()
  const fontDefs = font || { components: {} }
  const compFontDefs = fontDefs.components

  const defStyles = {
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
      ...compFontDefs.caption,
    },
    h1: {
      fontWeight: '300',
      fontSize: 40,
      letterSpacing: -1.5,
      ...compFontDefs.h1,
    },
    h2: {
      fontWeight: '300',
      fontSize: 32,
      letterSpacing: -0.5,
      ...compFontDefs.h2,
    },
    h3: {
      color: colors.opacity._60,
      fontSize: 28,
      ...compFontDefs.h3,
    },
    h4: {
      fontSize: 24,
      letterSpacing: 0.25,
      ...compFontDefs.h4,
    },
    h5: {
      fontSize: 20,
      ...compFontDefs.h5,
    },
    h6: {
      color: colors.opacity._60,
      fontSize: 16,
      letterSpacing: 0.15,
      fontWeight: '500',
      ...compFontDefs.h6,
    },
    label: {
      minWidth: '100%',
      fontSize: 14,
      letterSpacing: 0.15,
      fontWeight: '700',
      marginBottom: margin.size / 4,
      ...compFontDefs.label,
    },
    paragraph: {
      fontSize: fontDefs.size || 16,
      letterSpacing: 0.5,
      ...compFontDefs.paragraph,
    },
    subtitle: {
      fontSize: 14,
      letterSpacing: fontDefs.spacing || 0.15,
      ...compFontDefs.subtitle,
    },
  }

  return (
    checkCall(config.typography, defStyles) ||
    deepMerge(defStyles, config.typography)
  )
}
