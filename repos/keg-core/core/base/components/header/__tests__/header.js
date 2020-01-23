import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from 'SVTheme'
import { Text, View } from 'SVComponents'
import { ReThemeProvider } from 're-theme'

const { Header } = require('../header')

describe('Header', () => {
  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider theme={theme} merge={false}>
        <Header>
          <View>
            <Text>I am header text</Text>
          </View>
        </Header>
      </ReThemeProvider>
    )
  })
})
