import { setMocks } from './setMocks'
import { RNSvg } from '../react-native-svg'

/**
 * Helper to auto mock items that should ALWAYS be mocked
 */
export const defaultMocks = () =>
  setMocks({
    'react-native-svg': RNSvg
  })
