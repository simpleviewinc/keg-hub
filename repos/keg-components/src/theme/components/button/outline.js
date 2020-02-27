import { colors } from '../../colors'
import { buildColorStyles, inheritFrom } from '../../../utils'
import { contained } from './contained'
import { get } from 'jsutils'

const states = {
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
const colorStyle = (surface, state) => {
  const activeState = states[state]
  const activeColor = state === 'hover'
    ? get(surface, 'colors.dark')
    : state === 'active'
      ? get(surface, 'colors.light')
      : get(surface, 'colors.main')


  const style = {
    main: { ...activeState.main, borderColor: activeColor },
    content: { ...activeState.content, color: activeColor }
  }
  
  state === 'hover' && ( style.main.backgroundColor = colors.opacity(10, activeColor) )

  return style

}

states.default = inheritFrom(contained.default.default, states.default)
states.disabled = inheritFrom(contained.default.disabled, states.default, states.disabled)
states.hover = inheritFrom(states.default.default, states.hover)
states.active = inheritFrom(states.default.hover, states.active)
const outline = { ...buildColorStyles(states, colorStyle) }

export {
  outline,
  states as outlineStates
}
