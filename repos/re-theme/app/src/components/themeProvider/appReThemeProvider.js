import { ReThemeProvider } from '@keg-hub/re-theme'
import appTheme from './path/to/theme'

export const ReThemeApp = () => {
  return (
    <ReThemeProvider theme={ appTheme } >
      <App />
    </ReThemeProvider>
  )
}