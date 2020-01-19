import { colors } from '../colors'
import { transition } from '../transition'

export const switchStyles = {
  wrapper: {
    $web: {
      height: 20,
      width: 40,
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
    }
  },
  knob: {
    $web: {
      backgroundColor: colors.palette.white03,
      boxShadow: `0px 0px 5px ${ colors.opacity.opacity25 }`,
      marginLeft: 0,
      borderRadius: 10,
      cursor: 'pointer',
      height: 20,
      width: 20,
      position: 'absolute',
      top: 0,
      left: 0,
      ...transition('left', 0.3),
    }
  },
  on: {
    $web: {
      left: 20,
      backgroundColor: colors.palette.green02,
      boxShadow: `1px 1px 3px ${ colors.opacity.opacity50 }`,
    }
  },
  slider: {
    $web: {
      backgroundColor: colors.palette.gray03,
      borderRadius: 10,
      height: '70%',
      width: '100%',
      position: 'absolute',
      top: 3,
    }
  },
  disabled: {
    
  }
}