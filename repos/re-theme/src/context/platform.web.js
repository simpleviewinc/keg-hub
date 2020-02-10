import { Constants } from '../constants'
import { isObj } from 'jsutils'
const RePlatform = Constants.PLATFORM.WEB

const Platform = {
  OS: 'web',
  select: obj => (isObj(obj) && obj.web),
  Version: 'ReTheme'
}

const setRNPlatform = () => {}
const getRNPlatform = () => { return Platform }

export {
  setRNPlatform,
  getRNPlatform,
  RePlatform,
  Platform
}