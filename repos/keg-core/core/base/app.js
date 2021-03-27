import React, { useState, useEffect, useMemo } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { ReThemeProvider, getDefaultTheme } from '@keg-hub/re-theme'
import { getStore } from 'SVStore'
import { initAppAction, navigateTo } from 'SVActions'
import { AppHeader, Select, Option, View } from 'SVComponents'
import { Loading } from 'SVComponents'
import { Router } from 'SVComponents'
import { checkCall, get, isEmptyColl } from '@keg-hub/jsutils'
import { useSelector } from 'react-redux'
import { getHistory } from 'SVNavigation'
import { ContainerRoutes } from 'SVNavigation/containerRoutes'

// These demo core are defined here, and not in app.json, so that they are not
// merged with tap routes. Taps would define their routes in tap.json
const routes = Object.freeze({
  '/': 'HomeContainer',
  '/plugins': 'PluginsContainer',
})

/**
 * Hook to check if the app has been initialized
 * If it has not, call the initAppAction
 * @param {boolean} isInit - Has the app been initialized yet
 * 
 * @returns {boolean} - If the app has been initialized
 */
const useAppInit = isInit => {
  return useMemo(() => {
    !isInit &&
      checkCall(initAppAction)
    return isInit
  }, [isInit])
}

/**
 * Hook for getting the theme styles before the theme has been initialized
 * Do this to allow setting the styles of some top level
 * Which must happen before the Re-Theme is initialized
 * @param {boolean} isInit - Has the app been initialized yet
 * 
 * @returns {Object} - The styles for top level components from the theme
 */
const useThemeStyles = isInit => {
  return useMemo(() => {
    const activeTheme = getDefaultTheme()
    const statusBarColor = get(activeTheme, [ 'components', 'statusBar', 'barStyle' ])
    const safeBgColor = get(activeTheme, ['colors', 'surface', 'primary', 'colors', 'dark'])
    const rootBgColor = get(activeTheme, ['colors', 'palette', 'white01' ])

    return {
      activeTheme,
      statusBarColor,
      safeAreaStyle: { flex: 1, backgroundColor: safeBgColor },
      rootView: { flex: 1, backgroundColor: rootBgColor },
    }
  }, [isInit])
}

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

const AppContent = ({ routes }) => {
  const isInit = useSelector(store => get(store.app, 'initialized', false))
  const initialized = useAppInit(isInit)
  const {
    rootView,
    activeTheme,
    safeAreaStyle,
    statusBarColor,
  } = useThemeStyles(initialized)

  return !initialized
    ? (<Loading />)
    : (
        <ReThemeProvider
          theme={activeTheme}
          merge={false}
        >
          <SafeAreaView style={safeAreaStyle} >
            <StatusBar barStyle={statusBarColor} />
            <View style={rootView}>
              <AppHeader
                shadow
                title={'Keg-Core'}
                RightComponent={<RouteDropdown routes={routes} />}
              />
              <ContainerRoutes navigationConfigs={routes} />
            </View>
          </SafeAreaView>
        </ReThemeProvider>
      )
}

const App = props => {
  return (
    <Router history={getHistory()}>
      <Provider store={getStore()}>
        <AppContent routes={routes} />
      </Provider>
    </Router>
  )
}

export default App
