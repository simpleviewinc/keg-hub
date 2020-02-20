import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { transition } from '../../transition'
import { get } from 'jsutils'

const states = {
  default: {
    main: {
      $all: {
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: get(colors, 'surface.default.colors.main'),
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
const colorStyle = (surface, state) => {
  const activeState = states[state] || {}

  return {
    ...activeState,
    main: {
      ...activeState.main,
      backgroundColor: state === 'hover'
        ? get(surface, 'colors.dark')
        : state === 'active'
          ? get(surface, 'colors.light')
          : get(surface, 'colors.main')
    }
  }

}

states.default = inheritFrom(states.default)
states.disabled = inheritFrom(states.default, states.disabled)
states.hover = inheritFrom(states.default, states.hover)
states.active = inheritFrom(states.default, states.hover, states.active)
const contained = { ...buildColorStyles(states, colorStyle) }

export {
  contained,
  states as containedStates,
}
