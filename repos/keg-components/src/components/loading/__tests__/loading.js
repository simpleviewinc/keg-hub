import 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from '../../../theme'
import { ReThemeProvider } from '@svkeg/re-theme'
import { Indicator } from '../../indicator/indicator'

const { Loading } = require('../loading')

describe('Loading', () => {
  it('renders correctly', () => {
    renderer.create(
      <ReThemeProvider
        theme={theme}
        merge={false}
      >
        <Loading
          indicator={Indicator}
          text={'Test Loading'}
        />
      </ReThemeProvider>
    )
  })
})
