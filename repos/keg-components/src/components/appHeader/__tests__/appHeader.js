import { Dimensions } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from '../../../theme'
import { setRNDimensions, ReThemeProvider } from '@svkeg/re-theme'

setRNDimensions(Dimensions)
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
          IconComponent={() => null}
          title={'Header Title'}
          leftIcon={'beer'}
        />
      </ReThemeProvider>
    )
  })
})
