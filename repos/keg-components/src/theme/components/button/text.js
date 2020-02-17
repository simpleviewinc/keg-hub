import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { get } from 'jsutils'
import { containedStates } from './contained'

const transparent = get(colors, 'opacity._00')

const textStyles = {
  default: {
    main: {
      backgroundColor: transparent,
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
  },
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
    ? { main: {}, content: { color: color.main, }}
    : {
        main: { backgroundColor: colors.opacity(10, color.dark) },
        content: { color: color.dark }
      }
}

const text = { ...buildColorStyles(textStyles, colorStyle) }

text.default = inheritFrom(containedStates.default, textStyles.default)
text.disabled = inheritFrom(text.default, containedStates.disabled, textStyles.disabled)
text.hover = inheritFrom(text.default, containedStates.hover, textStyles.hover)
text.active = inheritFrom(text.hover, textStyles.active)

export {
  text
}