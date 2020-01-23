import { StatusBar as RNStatusBar } from 'react-native'
import { withTheme } from 're-theme'
import { get } from 'jsutils'

export const StatusBar = withTheme(props => {
  return (
    <RNStatusBar
      barStyle={get(props, 'theme', 'components', 'statusBar', 'barStyle')}
    />
  )
})
