import 'react-native'
import React from 'react'
import { Mocks, Store, Redux, Utils } from 'SVMocks'
import renderer from 'react-test-renderer'
import { theme } from 'SVTheme'
import { ReThemeProvider } from 're-theme'

Mocks.setMocks({ 
  store: Store, 
  'react-redux': Redux,
  'utils/platform/getWindow': { getWindow: () => Utils.validWindowMock },
})

const { AppContainer } = require('../app')

describe('App Container', () => {
  afterAll(() => Mocks.resetMocks())

  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider theme={theme} merge={false}>
        <AppContainer data={'test-data'} />
      </ReThemeProvider>
    )
  })
})
