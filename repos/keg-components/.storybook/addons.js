import React from 'react'
import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'
import { theme } from '../src/theme'
import { ReThemeProvider } from 're-theme'
import { addDecorator } from '@storybook/react'

const ThemeDecorator = storyFn => (
  <ReThemeProvider theme={ theme } >
    { storyFn() }
  </ReThemeProvider>
)


addDecorator(ThemeDecorator)
