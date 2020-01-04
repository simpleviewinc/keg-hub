import React from 'react'
import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'
import '@storybook/addon-storysource/register';
import { theme } from '../src/theme'
import { ReThemeProvider } from 're-theme'
import { addDecorator } from '@storybook/react'

const platforms = process.env.RE_PLATFORM === 'native'
  ? { $native: true, $web: false }
  : { $native: false, $web: true }

const ThemeDecorator = storyFn => (
  <ReThemeProvider theme={ theme } platforms={ platforms } >
    { storyFn() }
  </ReThemeProvider>
)

addDecorator(ThemeDecorator)
