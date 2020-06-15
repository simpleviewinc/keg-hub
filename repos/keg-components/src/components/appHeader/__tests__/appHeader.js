import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from '../../../theme'
import { ReThemeProvider } from '@simpleviewinc/re-theme'

const { AppHeader } = require('../appHeader')

describe('AppHeader', () => {
  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider
        theme={theme}
        merge={false}
      >
        <AppHeader
          shadow
          title={'Header Title'}
          leftIcon={'beer'}
        />
      </ReThemeProvider>
    )
  })
})
