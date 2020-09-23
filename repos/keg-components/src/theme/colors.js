import { get, isArr, isStr, reduceObj } from '@keg-hub/jsutils'
import { getThemeDefaults } from './themeDefaults'
import { opacity, shadeHex } from '@keg-hub/re-theme/colors'

let __colors = {}

export const getColorSurface = () => get(__colors, 'surface', {})
export const getColors = () => __colors

export const init = () => {
  const defaults = getThemeDefaults()
  const defPalette = get(defaults, 'colors.palette', {})
  const defTypes = get(defaults, 'colors.types', {})
  
  const __colors = {
    // Use opacity helper from re-theme
    opacity: opacity,

    // Build out the pallet based on the default colors
    palette: reduceObj(
      defPalette,
      (key, value, updated) => {
        !isArr(value)
          ? (updated[key] = value)
          : value.map((val, i) => {
            const name = `${key}0${i + 1}`
            updated[name] = isStr(val)
              ? val
              : shadeHex(value[1], value[i])
          })

        return updated
      },
      {}
    ),
  }

  // Build out the surface colors based on the built palette
  __colors.surface = reduceObj(
    defTypes,
    (key, value, updated) => {
      updated[key] = {
        colors: {
          light: colors.palette[`${value.palette}01`],
          main: colors.palette[`${value.palette}02`],
          dark: colors.palette[`${value.palette}03`],
        },
      }

      return updated
    },
    {}
  )

  return colors
}

