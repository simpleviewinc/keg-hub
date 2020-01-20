import defaults from '../defaults.json'
import { get } from 'jsutils'
import { colors } from '../colors'
import { padding } from '../padding'

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
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      height: get(defaults, 'form.input.height', 35),
      fontSize: 16,
      padding: padding.size / 2,
    },
    $native: {
      borderBottomColor: get(colors, 'palette.gray04'),
      borderStyle: 'solid',
      borderWidth: 2,
    }
  }
}
