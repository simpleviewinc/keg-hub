/*
 * Override the default store with Jest methods
 * This allows testing if the methods are being called, while still doing the default actions
 * Also load all reducers, and create the defState
 */

import * as reducers from 'SVReducers'
import { combineReducers, createStore } from 'redux'
const appReducers = combineReducers(reducers)
// Build the store and get the default
const defStore = createStore(appReducers)
// Default state from the default store
let STATE = defStore.getState()
// Helper to set the state before running a test
const setState = updatedState => (STATE = updatedState)
// Helper to set a subscriber in redux
const subscribe = jest.fn(subscriber => defStore.subscribe(subscriber))
// Helper placed on the store
const getState = jest.fn(() => defStore.getState())
// Helper to dispatch actions
const dispatch = jest.fn(action => defStore.dispatch(action))
// Default store setup
const STORE = { dispatch, getState, subscribe }
// Helpers to get the store
const getStore = jest.fn(() => STORE)
// Helpers to get the dispatch
const getDispatch = jest.fn(() => dispatch)
// Helper to get data from the store
const useSelector = jest.fn(selector => selector(STATE))

export { dispatch, getDispatch, getStore, setState, useSelector, STATE, STORE }
