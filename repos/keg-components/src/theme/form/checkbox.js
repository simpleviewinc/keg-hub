import defaults from '../defaults.json'
import { colors } from '../colors'
import { margin } from '../margin'
import { get } from 'jsutils'
import { sharedToggle } from './sharedToggle'

const space = get(defaults, 'form.checkbox.space', 15)
const height = get(defaults, 'form.checkbox.height', 20)
const width = get(defaults, 'form.checkbox.width', 20)

export const checkbox = {
  container: {
    width: '100%',
    display: 'flex',
  },
  wrapper: {
    $all: {
      marginBottom: margin.size,
    },
    $web: {
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      height: height + space,
      width: width + space,
    }
  },
  area: {
    $web: {
      // outline: 'none',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // height: height,
      // width: width,
    }
  },
  indicator: {
    $all: {
      outline: 'none',
    },
    $web: {
      top: 0,
      left: 0,
      height: height,
      width: width,
      boxShadow: `inset 0px 0px 5px ${ get(colors, 'opacity.opacity15') }`,
      backgroundColor: get(colors, 'palette.white04'),
      borderRadius: get(defaults, 'form.border.radius', 5),
    }
  },
  on: {
    $web: {
      backgroundColor: get(colors, 'palette.green02'),
    }
  },
  ...sharedToggle,
}