import * as reducers from 'SVReducers'
import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'

const appReducers = combineReducers(reducers)
const rootReducer = (state, action) => {
  // if (action.type === ActionTypes.LOGOUT) state = undefined
  return appReducers(state, action)
}
const Store = createStore(rootReducer, devToolsEnhancer())

export const getStore = () => Store
export const getDispatch = () => Store.dispatch
export const dispatch = action => Store.dispatch(action)
