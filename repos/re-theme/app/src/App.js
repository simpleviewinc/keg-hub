import React from 'react'
import { AppScreen } from './screens'
import { theme } from './theme'
import { ReThemeProvider } from '@keg-hub/re-theme'

function App() {
  return (
    <ReThemeProvider theme={theme} merge={false}>
      <AppScreen />
    </ReThemeProvider>
  );
}

export default App;
