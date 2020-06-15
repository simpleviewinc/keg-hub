import defaults from '../defaults.json'
import { get } from 'jsutils'
import { colors } from '../colors'
import { padding } from '../padding'

export const sharedForm = {
  inputs: {
    backgroundColor: colors.palette.white01,
    minWidth: 100,
    overflow: 'hidden',
    height: get(defaults, 'form.input.height', 35),
    padding: padding.size / 2,
    fontSize: 14,
  },
  border: {
    borderRadius: 5,
    borderWidth: 1,
    borderTopColor: `${colors.palette.gray01}`,
    borderLeftColor: `${colors.palette.gray01}`,
    borderRightColor: `${colors.palette.gray01}`,
    borderBottomColor: `${colors.palette.gray02}`,
    borderStyle: 'solid',
  },
}
