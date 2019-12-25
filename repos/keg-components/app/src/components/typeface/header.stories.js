import React from 'react'
import { storiesOf } from '@storybook/react'
import { ReThemeProvider } from 're-theme'
import { theme, H1, H2 } from 'keg-components'

storiesOf('H1', module)
  .add('Default', () =>
    <ReThemeProvider theme={ theme } >
      <H1>
        Hello H1
      </H1>
    </ReThemeProvider>
  )

storiesOf('H2', module)
  .add('Default', () =>
    <ReThemeProvider theme={ theme } >
      <H2>
        Hello H2
      </H2>
    </ReThemeProvider>
  )