import 'react-native'
import React from 'react'
import { Mocks, Store, Redux } from 'SVMocks'
import renderer from 'react-test-renderer'
import { theme } from 'SVTheme'
import { ReThemeProvider } from 're-theme'

Mocks.setMocks({ store: Store, 'react-redux': Redux })

const { AppContainer } = require('../app')

describe('App Container', () => {
  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider theme={theme} merge={false}>
        <AppContainer data={'test-data'} />
      </ReThemeProvider>
    )
  })
})
