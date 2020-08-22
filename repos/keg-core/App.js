import 'SVUtils/overrides/console'
import { Platform } from 'react-native'
import { setRNPlatform } from '@simpleviewinc/re-theme'
import { enableScreens } from 'react-native-screens'
import { App } from 'SVTap'

setRNPlatform(Platform)
enableScreens()

export default App
