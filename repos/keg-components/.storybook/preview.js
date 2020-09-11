import React from 'react'
import { View } from 'KegView'
import { theme } from '../src/theme'
import { isStr } from '@keg-hub/jsutils'
import { Dimensions, Platform } from 'react-native'
import { configureActions } from '@storybook/addon-actions'
import { addDecorator, addParameters } from '@storybook/react'
import { ReThemeProvider, setRNDimensions, setRNPlatform } from '@keg-hub/re-theme'

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

configureActions({
  depth: 3,
  limit: 30,
})

addDecorator(storyFn =>
  <ReThemeProvider theme={ theme } >
    <View style={{ maxWidth: '80vw', margin: 'auto', marginTop: 30 }}>
      { storyFn() }
    </View>
  </ReThemeProvider>
)

setRNPlatform(Platform)
setRNDimensions(Dimensions)
