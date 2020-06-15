import { wrapper } from './defaults'
import { get } from 'jsutils'
import { colors } from '../../colors'
const { surface, palette } = colors

export const contained = {
  default: {
    $all: {
      main: {
        minHeight: 100,
        width: wrapper.width,
        padding: wrapper.padding,
        backgroundColor: get(surface, 'default.colors.light'),

        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        wrapper: {
          display: 'flex',
          marginRight: wrapper.padding + 5,
          flex: 1,
          flexWrap: 'wrap',
        },
        text: {
          color: get(palette, 'black03'),
          fontWeight: 'bold',
          fontSize: 10,
        },
        clipboard: {
          opacity: 0.7,
          right: 0,
          top: 0,
          margin: wrapper.padding - 2,
          position: 'absolute',
        },
      },
    },
    $native: {
      main: {
        flexDirection: 'row',
        flex: 1,
      },
      content: {
        clipboard: {},
      },
    },
  },
  disabled: {},
  hover: {},
  active: {},
}
