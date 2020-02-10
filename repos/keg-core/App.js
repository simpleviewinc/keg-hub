import React, { Dimensions, Platform } from 'react'
import { App } from 'SVTap'
import { setRNDimensions, setRNPlatform } from 're-theme'

setRNDimensions(Dimensions)
setRNPlatform(Platform)


export default App