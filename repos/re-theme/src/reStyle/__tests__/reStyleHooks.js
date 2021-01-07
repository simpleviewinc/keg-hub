import React from 'react'

jest.resetModules()
jest.resetAllMocks()

// Mocked updateState function returned from useState
let stateValue = null
const updateStateValue = jest.fn(update => {
  stateValue = update
  return stateValue
})

// Mocked useSate function to test that it's called
let stateOverride
const useState = jest.fn(value => {
  stateValue = stateOverride || value
  return [ stateValue, updateStateValue ]
})

// Mocked useEffect function to test that it's called
// let effectCB = null
// const useLayoutEffect = jest.fn(cb => {
//   effectCB = cb
// })

let refObj = { current: undefined }
const useRef = jest.fn(initialVal => {
  refObj.current = initialVal
  return refObj
})

const useCallbackResponse = jest.fn()
const useCallback = jest.fn((cb, deps) =>
  typeof cb === 'function' ? cb(...deps) : useCallbackResponse
)
const useMemoResponse = {}
const useMemo = jest.fn((cb, deps) =>
  typeof cb === 'function' ? cb(...deps) : useMemoResponse
)

jest.setMock('react', {
  ...React,
  useState,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
})

// const {
//   getComponentName,
//   usePropClassName,
//   useObjWithIdentity,
//   useStyleProp,
//   useReStyles
// } = require('../reStyleHooks')

describe('reStyleHooks', () => {
  afterEach(() => {
    useState.mockClear()
    useMemo.mockClear()
    useCallback.mockClear()
    useRef.mockClear()
    useLayoutEffect.mockClear()
    stateValue = null
    effectCB = null
    refObj = { current: undefined }
    stateOverride = undefined
  })

  describe('getComponentName', () => {
    afterEach(() => {})

    it('should', () => {})
  })

  describe('usePropClassName', () => {
    afterEach(() => {})

    it('should', () => {})
  })

  describe('useObjWithIdentity', () => {
    afterEach(() => {})

    it('should', () => {})
  })

  describe('useStyleProp', () => {
    afterEach(() => {})

    it('should', () => {})
  })

  describe('useReStyles', () => {
    afterEach(() => {})

    it('should', () => {})
  })
})
