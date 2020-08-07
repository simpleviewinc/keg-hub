import * as reducers from 'SVReducers'
import { combineReducers, createStore } from 'redux'
import * as Plugins from './plugins'
import { devToolsEnhancer } from 'redux-devtools-extension'

const appReducers = combineReducers(reducers)

const rootReducer = (state, action) => {
  const { action: processedAction } = Plugins.runPlugins({ state, action })
  return appReducers(state, processedAction)
}

const Store = createStore(rootReducer, devToolsEnhancer())

export const getStore = () => Store
export const getDispatch = () => Store.dispatch
export const dispatch = action => Store.dispatch(action)

// Make plugins accessible to consumer for configuration
export * from './plugins'
