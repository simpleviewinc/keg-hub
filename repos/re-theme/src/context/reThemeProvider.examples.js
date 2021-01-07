import { ReThemeProvider } from './reThemeProvider'

ReThemeProvider.defaultProps = {
  merge: false,
  platforms: [],
  theme: {},
}

// Re-export the Provider with the default props defined to be used in the MDX story
export { ReThemeProvider }
