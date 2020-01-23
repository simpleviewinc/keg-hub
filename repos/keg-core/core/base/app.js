import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native'
import { Provider } from 'react-redux'
import { ReThemeProvider, getDefaultTheme } from 're-theme'
import { getStore } from 'SVStore'
import { initAppAction } from 'SVActions'
import { AppContainer } from 'SVContainers'
import { Router, Header, withRouter, Button } from 'SVComponents'
import { checkCall, get } from 'jsutils'
import 'SVTheme'

const checkAppInit = setInit => {
  checkCall(setInit, true)
  checkCall(initAppAction)
}

/**
 * @summary Native back navigation button (Native apps only) appear only if navigation stack > 1
 * @return {Component}
 */
const BackButton = withRouter(({ history }) => {
  // check our index of the stack
  if (Platform.OS !== 'web' && history.index > 0) {
    return (
      <Button
        icon={'arrow-back'}
        text={'Back'}
        textColor={'black'}
        color={'transparent'}
        onPress={() => {
          history.goBack()
        }}
      />
    )
  }
  return null
})

/**
 * @summary navigation header that only loads on native apps
 */
const NativeNavigationHeader = () => {
  return Platform.OS == 'web' ? null : (
    <Header style={{ borderRadius: 0 }}>
      <BackButton />
    </Header>
  )
}

const App = props => {
  const [ activeTheme, switchTheme ] = useState(getDefaultTheme())
  const [ init, setInit ] = useState(false)

  useEffect(() => {
    !init && checkAppInit(setInit)
  })

  return (
    <>
      <StatusBar
        barStyle={get(activeTheme, [ 'components', 'statusBar', 'barStyle' ])}
      />
      <Router>
        <SafeAreaView>
          <Provider store={getStore()}>
            <ReThemeProvider theme={activeTheme} merge={false}>
              <NativeNavigationHeader />
              <AppContainer switchTheme={switchTheme} />
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
