import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from '../../../theme'
import { ReThemeProvider } from '@simpleviewinc/re-theme'

const { Loading } = require('../loading')

describe('Loading', () => {
  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider
        theme={theme}
        merge={false}
      >
        <Loading text={'Test Loading'} />
      </ReThemeProvider>
    )
  })
})
