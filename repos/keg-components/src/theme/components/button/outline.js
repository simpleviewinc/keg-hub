import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { containedStates } from './contained'
import { get } from 'jsutils'

const outlineStates = {
  default: {
    main: {
      padding: 8,
      outline: 'none',
      borderWidth: 1,
      borderColor: get(colors, 'surface.default.main'),
      backgroundColor: get(colors, 'palette.white01'),
    },
    content: {
      color: get(colors, 'opacity._80'),
    }
  },
  disabled: {
    main: {},
    content: {}
  },
  hover: {
    main: {
      backgroundColor: get(colors, 'palette.white03'),
    },
    content: {}
  },
  active: {
    main: {},
    content: {}
  }
}

/**
 * Builds the color style based on the passed in state
 * @param {Object} color - Color to use from the color.surface of the theme
 * @param {string} state - Current state to built styles for
 *
 * @returns {Object} - Built color style for the state
 */
const colorStyle = (color, state) => {
  return state !== 'hover'
    ? {
        main: { borderColor: color.main, },
        content: { color: color.main, }
      }
    : {
        main: {
          borderColor: color.dark,
          backgroundColor: colors.opacity(10, color.dark),
        },
        content: {
          color: color.dark,
        }
      }
}

const outline = { ...buildColorStyles(outlineStates, colorStyle) }
outline.default = inheritFrom(containedStates.default, outlineStates.default)
outline.disabled = inheritFrom(outline.default, containedStates.disabled, outlineStates.disabled)
outline.hover = inheritFrom(outline.default, outlineStates.hover)
outline.active = inheritFrom(outline.hover, outlineStates.active)

export {
  outline,
  outlineStates
}