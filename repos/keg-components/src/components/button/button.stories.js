import React from 'react'
import { storiesOf } from '@storybook/react'
import { ReThemeProvider } from 're-theme'
import { theme, Button } from '../../'

const stories = storiesOf('Button', module)

stories.add('Default', () =>
  <ReThemeProvider theme={ theme } >
    <Button onClick={() => console.log("clicked!!")}>
      Hello Button
    </Button>
  </ReThemeProvider>
)
