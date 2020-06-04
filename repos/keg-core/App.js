import 'SVUtils/overrides/console'
import React, { Dimensions, Platform } from 'react'
import { setRNDimensions, setRNPlatform } from '@simpleviewinc/re-theme'
import { enableScreens } from 'react-native-screens'
import { App } from 'SVTap'

setRNDimensions(Dimensions)
setRNPlatform(Platform)
enableScreens()

export default App