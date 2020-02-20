import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { get } from 'jsutils'
import { containedStates } from './contained'

const states = {
  default: {
    main: {
      backgroundColor: get(colors, 'palette.transparent'),
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
const colorStyle = (surface, state) => {
  const activeState = states[state]
  const activeColor = state === 'hover'
    ? get(surface, 'colors.dark')
    : state === 'active'
      ? get(surface, 'colors.light')
      : get(surface, 'colors.main')

  const styles = { 
    main: { ...activeState.main },
    content: { ...activeState.content, color: activeColor, }
  }
  state === 'hover' && ( styles.main.backgroundColor = colors.opacity(10, activeColor) )

  return styles
}

states.default = inheritFrom(containedStates.default, states.default)
states.disabled = inheritFrom(containedStates.disabled, states.default, states.disabled)
states.hover = inheritFrom(states.default, containedStates.hover, states.hover)
states.active = inheritFrom(states.hover, states.active)

const text = { ...buildColorStyles(states, colorStyle) }

export {
  text
}
