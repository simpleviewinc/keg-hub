import { Dimensions } from 'react-native'
import React from 'react'
import renderer from 'react-test-renderer'
import { theme } from '../../../theme'
import { setRNDimensions, ReThemeProvider } from '@keg-hub/re-theme'
import { Indicator } from '../../indicator/indicator'

setRNDimensions(Dimensions)

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
