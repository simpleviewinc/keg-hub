import defaults from '../defaults.json'
import { get } from '@svkeg/jsutils'
import { colors } from '../colors'
import { padding } from '../padding'

const height = get(defaults, 'form.input.height', 35)
const verticalPad = padding.size / 6
const borderWidth = 1
const inputHeight = height - (verticalPad * 2 + borderWidth * 2)

export const sharedForm = {
  inputs: {
    backgroundColor: colors.palette.white01,
    minWidth: 100,
    overflow: 'hidden',
    height: get(defaults, 'form.input.height', 35),
    padding: padding.size / 2,
  },
  derivedInput: {
    paddingTop: verticalPad,
    paddingBottom: verticalPad,
    height: inputHeight,
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
