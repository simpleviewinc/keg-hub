import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { ReThemeProvider, getDefaultTheme } from '@keg-hub/re-theme'
import { getStore } from 'SVStore'
import { initAppAction, navigateTo } from 'SVActions'
import { AppHeader, Select, Option } from 'SVComponents'
import { Router } from 'SVComponents'
import { checkCall, get } from '@keg-hub/jsutils'
import { getHistory } from 'SVNavigation'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'

const checkAppInit = setInit => {
  checkCall(setInit, true)
  checkCall(initAppAction)
}

// These demo core are defined here, and not in app.json, so that they are not
// merged with tap routes. Taps would define their routes in tap.json
const routes = Object.freeze({
  '/': 'HomeContainer',
  '/plugins': 'PluginsContainer',
})

/**
 * Dropdown for switching between the demo containers
 * @param {Object} param
 * @param {Object} routes - routes nav object
 */
const RouteDropdown = ({ routes }) => {
  const paths = Object.entries(routes)
  const [ currentPath, setPath ] = useState(getHistory().location.pathname)
  const onSelect = path => setPath(path) || navigateTo(path)
  return (
    <Select
      style={{ margin: 35, padding: 0, width: '90%' }}
      onValueChange={onSelect}
      value={currentPath}
    >
      { paths.map(([ path, name ]) => (
        <Option
          key={path}
          label={name}
          value={path}
        />
      )) }
    </Select>
  )
}

const App = props => {
  const [activeTheme] = useState(getDefaultTheme())
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
              <AppHeader
                shadow
                title={'Keg-Core'}
                leftIcon={'beer'}
                RightComponent={<RouteDropdown routes={routes} />}
              />

              <ContainerRoutes navigationConfigs={routes} />
            </ReThemeProvider>
          </Provider>
        </SafeAreaView>
      </Router>
    </>
  )
}

export default App
