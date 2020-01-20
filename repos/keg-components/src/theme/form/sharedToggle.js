import defaults from '../defaults.json'
import { margin } from '../margin'
import { get } from 'jsutils'

const space = get(defaults, 'form.checkbox.space', 15)
const height = get(defaults, 'form.switch.height', 20)
const width = get(defaults, 'form.switch.width', 20)

export const sharedToggle = {
  container: {
    width: '100%',
    display: 'flex',
  },
  text: {
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height + space,
  },
  leftText: {
    marginRight: margin.size,
  },
  rightText: {
    marginLeft: margin.size,
  },
}