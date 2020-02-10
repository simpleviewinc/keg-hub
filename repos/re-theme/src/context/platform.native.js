import { Constants } from '../constants'

let RNPlatform
const getRNPlatform = () => {
  return RNPlatform
}

const setRNPlatform = Plat => {
  RNPlatform = Plat
}

const RePlatform = Constants.PLATFORM.NATIVE

export {
  setRNPlatform,
  getRNPlatform,
  RePlatform,
}

