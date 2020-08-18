import React from 'react'
import { addDecorator } from '@storybook/react'
import { View } from 'KegView'
import { ReThemeProvider } from '@simpleviewinc/re-theme'
import { theme } from '../src/theme'
import { isStr } from '@ltipton/jsutils'

const IGNORE_WARN = [
  'Ignored an update',
  'Story with id',
  'The default hierarchy separators',
]

console.warn = function override(...args) {
  const logString = args[0]
  !isStr(logString) ||
    !IGNORE_WARN.some(ignoreMessage => logString.trim().startsWith(ignoreMessage)) &&
    // Call the original warning log
    orgWarn.apply(console, [ ...args ])
}


addDecorator(storyFn =>
  <ReThemeProvider theme={ theme } >
    <View style={{ maxWidth: '80vw', margin: 'auto', marginTop: 30 }}>
      { storyFn() }
    </View>
  </ReThemeProvider>
)

