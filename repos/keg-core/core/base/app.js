import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import {
  ReThemeProvider,
  getDefaultTheme,
  setDefaultTheme,
} from '@simpleviewinc/re-theme'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { AppContainer } from 'SVContainers'
import { Router } from 'SVComponents'
import { checkCall, get } from '@ltipton/jsutils'
import { theme } from 'SVTheme'
import { getHistory } from 'SVNavigation'

setDefaultTheme(theme)

const checkAppInit = setInit => {
  checkCall(setInit, true)
  checkCall(initAppAction)
}

const App = props => {
  const [ activeTheme, switchTheme ] = useState(getDefaultTheme())
  const [ init, setInit ] = useState(false)

  useEffect(() => {
    !init && checkAppInit(setInit)
  })

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: get(
            activeTheme,
            'colors.surface.primary.colors.dark'
          ),
        }}
      />
      <StatusBar
        barStyle={get(activeTheme, [ 'components', 'statusBar', 'barStyle' ])}
      />
      <Router history={getHistory()}>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider
              theme={activeTheme}
              merge={false}
            >
              <AppContainer switchTheme={switchTheme} />
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
