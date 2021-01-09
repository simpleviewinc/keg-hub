import React from 'react'
import { Dimensions } from '../../dimensions/webDimensions'
import { testTheme, isReactComp, dimensionData } from '../../mocks'
import * as Theme from '../../theme'

// Clean up from any other tests
jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

// Mock theme functions so we can test when it's called
const getDefaultTheme = jest.fn(() => Theme.getDefaultTheme())
const buildTheme = jest.fn((...args) => Theme.buildTheme(...args))
jest.setMock('../../theme', { ...Theme, getDefaultTheme, buildTheme })

// Mocked updateState function returned from useState
let stateValue = null
const updateStateValue = jest.fn(update => {
  stateValue = update
  return stateValue
})

// Mocked useSate function to test that it's called
const useState = jest.fn(value => {
  stateValue = value
  return [ stateValue, updateStateValue ]
})

// Mocked useEffect function to test that it's called
let effectCB = null
const useEffect = jest.fn(cb => {
  effectCB = cb
})

const useMemo = jest.fn(cb => {
  return cb()
})

jest.setMock('react', { ...React, useState, useEffect, useMemo })

// Mock Dimensions api for the add and remove Event listener, to test adding and removing an event
let addEventCB = null
const addEventListener = jest.fn((type, addCB) => {
  addEventCB = addCB
})
const removeEventListener = jest.fn()
jest.setMock('../../dimensions/dimensions', {
  Dimensions: { ...Dimensions, addEventListener, removeEventListener },
})

// Helper function to render the ReThemeProvider
let mergeTheme = false
const renderReThemeProvider = () => {
  const { ReThemeProvider } = require('../reThemeProvider')
  return ReThemeProvider({
    theme: testTheme,
    merge: mergeTheme,
    children: () => {
      return 'Test'
    },
  })
}

describe('ReThemeProvider', () => {
  afterEach(() => {
    // Reset helper values
    effectCB = null
    stateValue = null
    addEventCB = null
    mergeTheme = false

    // Clean up all mock functions
    updateStateValue.mockClear()
    useState.mockClear()
    useEffect.mockClear()
    addEventListener.mockClear()
    removeEventListener.mockClear()
    getDefaultTheme.mockClear()
    buildTheme.mockClear()
  })

  it('should render ReThemeProvider properly and return a React context component', () => {
    isReactComp(renderReThemeProvider(), true)
  })

  it('should call buildTheme', () => {
    renderReThemeProvider()

    expect(buildTheme).toHaveBeenCalled()
  })

  it('should call getDefaultTheme when merge prop is true', () => {
    mergeTheme = true
    renderReThemeProvider()

    expect(getDefaultTheme).toHaveBeenCalled()
  })

  it('should not call getDefaultTheme when merge is false', () => {
    renderReThemeProvider()

    expect(getDefaultTheme).not.toHaveBeenCalled()
  })

  it('should register a useEffect callback', () => {
    expect(effectCB).toBe(null)

    renderReThemeProvider()

    expect(typeof effectCB).toBe('function')
  })

  it('should register a useEffect callback to register an event listener with Dimensions', () => {
    expect(effectCB).toBe(null)
    expect(addEventListener).not.toHaveBeenCalled()

    renderReThemeProvider()
    effectCB()

    expect(addEventListener).toHaveBeenCalled()
  })

  it('should pass a function to the dimensions listener that updates the component state', () => {
    expect(effectCB).toBe(null)
    expect(addEventCB).toBe(null)

    renderReThemeProvider()
    effectCB()
    addEventCB(dimensionData)

    expect(updateStateValue).toHaveBeenCalled()
  })

  it('should return removeEvent function from the registered useEffect callback', () => {
    expect(effectCB).toBe(null)
    expect(removeEventListener).not.toHaveBeenCalled()

    renderReThemeProvider()
    const removeEventFunction = effectCB()

    expect(typeof removeEventFunction).toBe('function')
    removeEventFunction()

    expect(removeEventListener).toHaveBeenCalled()
  })

  it('should set the state value to be the current dimensions', () => {
    expect(stateValue).toBe(null)
    renderReThemeProvider()

    setTimeout(() => {
      expect(typeof stateValue).toBe('object')
      Object.keys(dimensionData.window).map(key =>
        expect(stateValue[key]).not.toBe(undefined)
      )
    }, 0)
  })
})
