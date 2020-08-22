import * as reducers from 'SVReducers'
import { combineReducers, createStore } from 'redux'
import * as Plugins from './plugins'

const appReducers = combineReducers(reducers)

const rootReducer = (state, action) => {
  const { action: processedAction } = Plugins.runPlugins({ state, action })
  return appReducers(state, processedAction)
}

// exclude dev middleware in production build
const devMiddleware =
  process.env.NODE_ENV !== 'production'
    ? require('redux-devtools-extension').devToolsEnhancer()
    : undefined

const Store = createStore(rootReducer, devMiddleware)

export const getStore = () => Store
export const getDispatch = () => Store.dispatch
export const dispatch = action => Store.dispatch(action)

// Make plugins accessible to consumer for configuration
export * from './plugins'
