import 'SVUtils/overrides/console'
import { Dimensions, Platform } from 'react-native'
import { setRNDimensions, setRNPlatform } from '@simpleviewinc/re-theme'
import { enableScreens } from 'react-native-screens'
import { App } from 'SVTap'

setRNDimensions(Dimensions)
setRNPlatform(Platform)
enableScreens()

export default App
