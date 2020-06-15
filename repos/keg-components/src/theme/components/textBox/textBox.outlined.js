import { contained } from './textBox.contained'
import { inheritFrom } from '../../../utils'
import { get } from 'jsutils'
import { colors } from '../../colors'
const { surface } = colors

export const outlined = {
  default: {
    $all: {
      main: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: get(surface, 'default.colors.main'),
      },
    },
  },
}

outlined.default = inheritFrom(contained.default, outlined.default)
