/* eslint-disable no-unused-vars */

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
let effectCB = null
const useLayoutEffect = jest.fn(cb => {
  effectCB = cb
})

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

const mockOptions = {}
const mockOn = { value: 'ON' }
const mockOff = { value: 'OFF' }

const { nativeThemeHook } = require('../nativeThemeHook')

describe('nativeThemeHook', () => {
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

  it('should return a ref as first item in the response array', () => {
    const [ref] = nativeThemeHook(mockOff, mockOn, mockOptions)
    expect(ref).toBe(refObj)
  })

  it('should return the off value as second item in the response array', () => {
    const [ ref, value, setValue ] = nativeThemeHook(mockOff, mockOn, mockOptions)
    expect(value).toBe(mockOff)
  })

  it('should return the setValue as third item in the response array', () => {
    /* eslint-disable-line no-unused-vars */
    const [ ref, value, setValue ] = nativeThemeHook(mockOff, mockOn, mockOptions)
    expect(setValue).toBe(updateStateValue)
  })

  it('should call useLayoutEffect', () => {
    expect(useLayoutEffect).not.toHaveBeenCalled()
    nativeThemeHook(mockOff, mockOn, mockOptions)
    expect(useLayoutEffect).toHaveBeenCalled()
  })

  it('should use the passed in ref if it exists instead of creating', () => {
    const customRef = { current: undefined }
    const [ref] = nativeThemeHook(mockOff, mockOn, {
      ref: customRef,
    })
    expect(refObj.current).toBe(undefined)
    expect(ref).toBe(customRef)
  })

  it('should call the useLayoutEffect, which should call setValue if the values are not equal', () => {
    stateOverride = { custom: 'state-override' }
    nativeThemeHook(mockOff, mockOn, mockOptions)
    effectCB()
    expect(updateStateValue).toHaveBeenCalledWith(stateOverride)
  })
})
