import React from 'react'
import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'
import '@storybook/addon-storysource/register';
import { theme } from '../src/theme'
import { ReThemeProvider } from 're-theme'
import { addDecorator } from '@storybook/react'

const ThemeDecorator = storyFn => (
  <ReThemeProvider theme={ theme } >
    <div style={{ maxWidth: "100vw", margin: 'auto', marginTop: 30,  textAlign: 'center' } } >
    { storyFn() }
    </div>
  </ReThemeProvider>
)

addDecorator(ThemeDecorator)
