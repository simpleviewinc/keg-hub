import { isObj } from '@ltipton/jsutils'

const webDefPlatform = {
  OS: 'web',
  select: obj => isObj(obj) && obj.web,
  Version: 'ReTheme',
}

let RNPlatform
const getRNPlatform = () => {
  return RNPlatform || webDefPlatform
}

const setRNPlatform = Plat => {
  RNPlatform = Plat
}

export { setRNPlatform, getRNPlatform }
