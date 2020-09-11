import React from 'react'
import { Dimensions, Platform } from 'react-native'
import { addDecorator, addParameters } from '@storybook/react'
import { View } from 'KegView'
import { ReThemeProvider, setRNDimensions, setRNPlatform } from '@keg-hub/re-theme'
import { theme } from '../src/theme'
import { isStr } from '@keg-hub/jsutils'

const parsePart = (full, part) => {
  return !part || part.indexOf('@summary') === 0
    ? full
    : part.indexOf(`<br/>`) === -1
      ? part.indexOf(`@`) === 0
        ? `${full ? full + '<br/>' : full}${parsePart(part)}`
        : `${full}<br/>${part}`
      : `${full}${part}`
}

addParameters({
  docs: {
    extractComponentDescription: (component, { notes }) => {
      if(component && component.__docgenInfo && component.__docgenInfo.description){
        const parsed = component.__docgenInfo.description.split('\n').reduce((full, part) => {
          const isCompName = component.__docgenInfo.displayName.toLowerCase().trim() === part.toLowerCase().trim()
          return isCompName || !part.trim() ? full : parsePart(full, part)
        }, '')
        return `${parsed}<br/>`
      }
      return notes
        ? typeof notes === 'string' ? notes : notes.markdown || notes.text
        : null
    },
  },
})

setRNPlatform(Platform)
setRNDimensions(Dimensions)

const IGNORE_WARN = [
  'Ignored an update',
  'Story with id',
]

const orgWarn = console.warn
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

