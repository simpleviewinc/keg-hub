import defaults from '../defaults.json'
import { margin } from '../margin'
import { flex } from '../flex'
import { get } from 'jsutils'

const space = get(defaults, 'form.checkbox.space', 15)
const height = get(defaults, 'form.switch.height', 20)

export const sharedToggle = {
  container: {
    ...flex.display,
    ...flex.row,
    flexWrap: 'nowrap',
  },
  text: {
    $all: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: height + space,
    },
    $web: {
      outline: 'none',
    },
  },
  left: {
    marginRight: margin.size,
  },
  right: {
    marginLeft: margin.size,
  },
}
