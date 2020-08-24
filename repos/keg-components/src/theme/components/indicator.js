import { colors } from '../colors'
import { get } from '@svkeg/jsutils'

const container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 36,
  minWidth: 36,
  position: 'relative',
}

export const indicator = {
  default: {
    container,
    icon: {
      color: get(colors, 'surface.default.colors.main'),
    },
  },
  primary: {
    container,
    icon: {
      color: get(colors, 'surface.primary.colors.main'),
    },
  },
  secondary: {
    container,
    icon: {
      color: get(colors, 'surface.secondary.colors.main'),
    },
  },
  warn: {
    container,
    icon: {
      color: get(colors, 'surface.warn.colors.main'),
    },
  },
  danger: {
    container,
    icon: {
      color: get(colors, 'surface.danger.colors.main'),
    },
  },
}
