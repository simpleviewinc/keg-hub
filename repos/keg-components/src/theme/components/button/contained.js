import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { transition } from '../../transition'
import { get } from 'jsutils'

const containedStates = {
  default: {
    main: {
      $all: {
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: get(colors, 'surface.default.main'),
        padding: 9,
        minHeight: 35,
        outline: 'none',
        textAlign: 'center',
        margin: 'auto',
      },
      $web: {
        cursor: 'pointer',
        boxShadow: 'none',
        ...transition([ 'backgroundColor', 'borderColor' ], 0.3),
      },
      $native: {}
    },
    content: {
      color: get(colors, 'palette.white01'),
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
      textAlign: 'center',
      $web: {
        ...transition([ 'color' ], 0.15),
      }
    }
  },
  disabled: {
    main: {
      $all: {
        opacity: 0.4,
      },
      $web: {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
      $native: {}
    },
    content: {
      color: get(colors, 'opacity._50'),
    }
  },
  hover: {
    main: { backgroundColor: get(colors, 'surface.default.dark'), },
    content: {}
  },
  active: {
    main: { backgroundColor: get(colors, 'surface.default.dark'), },
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
  return { main: { backgroundColor: state !== 'hover' ? color.main : color.dark } }
}

const contained = { ...buildColorStyles(containedStates, colorStyle) }
contained.default = inheritFrom(containedStates.default)
contained.disabled = inheritFrom(contained.default, containedStates.disabled)
contained.hover = inheritFrom(contained.default, containedStates.hover)
contained.active = inheritFrom(contained.default, containedStates.hover, containedStates.active)

export {
  contained,
  containedStates,
}
