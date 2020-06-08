import { ReThemeProvider } from '@simpleviewinc/re-theme'
import appTheme from './path/to/theme'

export const ReThemeApp = () => {
  return (
    <ReThemeProvider theme={ appTheme } >
      <App />
    </ReThemeProvider>
  )
}