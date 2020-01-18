import React from 'react'
import { addDecorator } from '@storybook/react'
import { View } from 'KegView'
import { ReThemeProvider } from 'KegReTheme'
import { theme } from '../src/theme'

addDecorator(storyFn =>
  <ReThemeProvider theme={ theme } >
    <View style={{ maxWidth: '80vw', margin: 'auto', marginTop: 30 }}>
      { storyFn() }
    </View>
  </ReThemeProvider>
)

