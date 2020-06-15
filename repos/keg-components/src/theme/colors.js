import { get, isArr, isStr, reduceObj } from 'jsutils'
import defaults from './defaults.json'
import { helpers } from '@simpleviewinc/re-theme'

const defPalette = get(defaults, 'colors.palette', {})
const defTypes = get(defaults, 'colors.types', {})

export const colors = {
  // Use opacity helper from re-theme
  opacity: helpers.colors.opacity,

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
            : helpers.colors.shadeHex(value[1], value[i])
        })

      return updated
    },
    {}
  ),
}

// Build out the surface colors based on the built palette
colors.surface = reduceObj(
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
