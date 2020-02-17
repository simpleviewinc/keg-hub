import defaults from '../defaults.json'
import { get } from 'jsutils'
import { colors } from '../colors'
import { padding } from '../padding'
import { typography } from '../typography'

export const select = {
  default: {
    $all: {
      backgroundColor: colors.palette.white01,
      outline: 'none',
      minWidth: 100,
    },
    $web: {
      ...typography.font.family,
      border: `1px solid ${colors.palette.gray01}`,
      borderBottom: `1px solid ${colors.palette.gray03}`,
      boxSizing: 'border-box',
      height: get(defaults, 'form.input.height', 35),
      fontSize: 14,
      padding: padding.size / 2,
    },
    $native: {
      borderBottomColor: colors.palette.gray04,
      borderStyle: 'solid',
      borderWidth: 2,
    }
  }
}