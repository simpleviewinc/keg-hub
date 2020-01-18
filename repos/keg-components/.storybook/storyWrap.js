/* eslint-disable import/first */

import React from 'react'
import { View } from 'KegView'
import { ReThemeProvider } from 'KegReTheme'
import { theme } from '../src/theme'

export const ThemeDecorator = props => (
  <ReThemeProvider theme={ theme } >
    { props.children }
  </ReThemeProvider>
)

export const StoryWrap = props => {
  return (
    <ThemeDecorator theme={ theme } >
      <View
        style={{
          ...{ maxWidth: '80vw', margin: 'auto', marginTop: 30 },
          ...props.style
        }}
      >
        { props.children }
      </View>
    </ThemeDecorator>
  )
}