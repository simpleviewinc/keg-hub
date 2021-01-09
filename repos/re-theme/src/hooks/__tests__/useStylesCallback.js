import React from 'react'

jest.resetModules()
jest.resetAllMocks()

const useCallbackResponse = jest.fn()
const mockUseCallback = jest.fn((cb, deps) =>
  typeof cb === 'function' ? cb(...deps) : useCallbackResponse
)

const useMemoResponse = {}
let useMemoFuncResponse
const mockUseMemo = jest.fn(() => useMemoFuncResponse || useMemoResponse)
jest.setMock('react', {
  ...React,
  useCallback: mockUseCallback,
  useMemo: mockUseMemo,
})

const mockReThemeContext = {}
jest.setMock('../../context/reThemeContext', {
  ReThemeContext: mockReThemeContext,
})

const mockTheme = {}
const mockUseTheme = jest.fn(() => mockTheme)
jest.setMock('../useTheme', { useTheme: mockUseTheme })

const stylesCallbackResponse = { test: 'styles callback response' }
let callbackResponseFunc
const stylesCb = jest.fn(() => {
  return callbackResponseFunc || stylesCallbackResponse
})

const cbDependencies = [ 'test', 'array' ]
const customStyles = { test: 'object' }

const { useStylesCallback } = require('../useStylesCallback')

describe('useStylesCallback', () => {
  afterEach(() => {
    useCallbackResponse.mockClear()
    mockUseCallback.mockClear()
    mockUseMemo.mockClear()
    mockUseTheme.mockClear()
    stylesCb.mockClear()
  })

  it('should call useCallback, passing the first argument as the callback funtion', () => {
    useStylesCallback(stylesCb, cbDependencies, customStyles)
    expect(mockUseCallback.mock.calls[0][0]).toBe(stylesCb)
  })

  it('should call useCallback, passing the second argument as the callback dependencies', () => {
    useStylesCallback(stylesCb, cbDependencies, customStyles)
    expect(mockUseCallback.mock.calls[0][1]).toBe(cbDependencies)
  })

  it('should call stylesCb', () => {
    expect(stylesCb).not.toHaveBeenCalled()
    useStylesCallback(stylesCb, cbDependencies, customStyles)
    expect(stylesCb).toHaveBeenCalled()
  })

  it('should set cbDependencies as an empty array if cbDependencies is falsy', () => {
    expect(stylesCb).not.toHaveBeenCalled()
    useStylesCallback(stylesCb, undefined, customStyles)
    expect(Array.isArray(stylesCb.mock.calls[0])).toBe(true)
    expect(stylesCb.mock.calls[0].length).toBe(0)
  })

  it('should call useMemo, passing the theme, stylesCb response, and customStyles as dependencies', () => {
    useStylesCallback(stylesCb, cbDependencies, customStyles)
    const dependencies = mockUseMemo.mock.calls[0][1]
    expect(dependencies[0]).toBe(mockTheme)
    expect(dependencies[1]).toBe(stylesCallbackResponse)
    expect(dependencies[2]).toBe(customStyles)
  })

  it('should set custom styles to false if it is falsy', () => {
    useStylesCallback(stylesCb, cbDependencies, null)
    const dependencies = mockUseMemo.mock.calls[0][1]
    expect(dependencies[2]).toBe(false)

    useStylesCallback(stylesCb, cbDependencies, undefined)
    const dependencies1 = mockUseMemo.mock.calls[1][1]
    expect(dependencies1[2]).toBe(false)

    useStylesCallback(stylesCb, cbDependencies, 0)
    const dependencies2 = mockUseMemo.mock.calls[2][1]
    expect(dependencies2[2]).toBe(false)
  })

  it('should set custom styles to false if its not an object', () => {
    useStylesCallback(stylesCb, cbDependencies, [])
    const dependencies = mockUseMemo.mock.calls[0][1]
    expect(dependencies[2]).toBe(false)

    useStylesCallback(stylesCb, cbDependencies, 23)
    const dependencies1 = mockUseMemo.mock.calls[1][1]
    expect(dependencies1[2]).toBe(false)

    useStylesCallback(stylesCb, cbDependencies, 'I should be false')
    const dependencies2 = mockUseMemo.mock.calls[2][1]
    expect(dependencies2[2]).toBe(false)
  })

  it('should set custom styles to false if its an empty object', () => {
    useStylesCallback(stylesCb, cbDependencies, {})
    const dependencies = mockUseMemo.mock.calls[0][1]
    expect(dependencies[2]).toBe(false)
  })

  it('should call the stylesCB inside the useMemo hook', () => {
    useMemoFuncResponse = jest.fn((cb, deps) =>
      typeof cb === 'function' ? cb(...deps) : true
    )
    callbackResponseFunc = jest.fn(() => `useCallback called from useMemo`)
    useStylesCallback(stylesCb, cbDependencies, {})
    const useMemoFunc = mockUseMemo.mock.calls[0][0]
    const useMemoResp = useMemoFunc()
    expect(useMemoResp).toBe(`useCallback called from useMemo`)
  })
})
