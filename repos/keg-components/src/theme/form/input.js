import defaults from '../defaults.json'
import { get } from 'jsutils'
import { colors } from '../colors'
import { padding } from '../padding'
import { typography } from '../typography'

export const input = {
  default: {
    $all: {
      backgroundColor: get(colors, 'palette.white01'),
      outline: 'none',
      minWidth: 100,
      borderRadius: 5,
    },
    $web: {
      border: `1px solid ${ get(colors, 'palette.white03') }`,
      borderBottom: `1px solid ${ get(colors, 'palette.gray03') }`,
      height: get(defaults, 'form.input.height', 35),
      boxSizing: 'border-box',
      padding: padding.size / 2,
      ...typography.font.family,
      fontSize: 14,
    },
    $native: {
      borderBottomColor: get(colors, 'palette.gray04'),
      borderStyle: 'solid',
      borderWidth: 2,
    }
  }
}
