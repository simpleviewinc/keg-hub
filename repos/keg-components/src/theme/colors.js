import { opacity, shadeHex } from '@keg-hub/re-theme/colors'
import {
  deepMerge,
  get,
  isArr,
  isStr,
  reduceObj,
  noOpObj,
} from '@keg-hub/jsutils'

let __colors = {}
export const clearColorsStyles = () => (__colors = {})

export const getColorSurface = () => get(__colors, 'surface', {})

export const colors = (defaults, config = noOpObj) => {
  const defPalette = get(defaults, 'colors.palette', {})
  const defTypes = get(defaults, 'colors.types', {})

  __colors = {
    // Use opacity helper from re-theme
    opacity: opacity,
    types: defTypes,
    // Build out the pallet based on the default colors
    palette: reduceObj(
      defPalette,
      (key, value, updated) => {
        !isArr(value)
          ? (updated[key] = value)
          : value.map((val, i) => {
            const name = `${key}0${i + 1}`
            updated[name] = isStr(val) ? val : shadeHex(value[1], value[i])
          })

        return updated
      },
      {}
    ),
  }

  // Build out the surface colors based on the built palette
  __colors.surface = deepMerge(
    reduceObj(
      defTypes,
      (key, value, updated) => {
        updated[key] = {
          colors: {
            light: __colors.palette[`${value.palette}01`],
            main: __colors.palette[`${value.palette}02`],
            dark: __colors.palette[`${value.palette}03`],
          },
        }

        return updated
      },
      {}
    ),
    config.colors
  )

  return __colors
}
