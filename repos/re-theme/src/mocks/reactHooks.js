import React from 'react'
import { checkCall } from '@keg-hub/jsutils'

/**
 * This should eventually go into a jest helper repo, so they can be reused
 * Leaving a note here for now as a reminder
 */

const reactHookMocks = {
  useState: () => {
    let stateValue = null
    // Mocked useSate function to test that it's called
    let stateOverride
    // Mocked updateState function returned from useState
    const updateStateValue = jest.fn(update => {
      stateValue = update
      return stateValue
    })

    const mockFunc = jest.fn(value => {
      stateValue = stateOverride || value
      return [ stateValue, updateStateValue ]
    })

    mockFunc.__stateOverride = stateOverride
    mockFunc.__stateValue = stateValue

    return mockFunc
  },
  useLayoutEffect: () => {
    // Mocked useLayoutEffect function to test that it's called
    let effectCB = null

    const mockFunc = jest.fn(cb => {
      effectCB = cb
    })
    mockFunc.__effectCB = effectCB
    return mockFunc
  },
  useEffect: () => {
    // Mocked useEffect function to test that it's called
    let effectCB = null

    const mockFunc = jest.fn(cb => {
      effectCB = cb
    })
    mockFunc.__effectCB = effectCB
    return mockFunc
  },
  useRef: () => {
    // Mocked ref object matching the react API
    let ref = { current: undefined }

    const mockFunc = jest.fn(initialVal => {
      ref.current = initialVal
      return ref
    })

    mockFunc.__ref = ref

    return mockFunc
  },
  useCallback: () => {
    const mockFunc = jest.fn((cb, ...deps) => () => {
      return cb(...deps)
    })
    return mockFunc
  },
  useMemo: () => {
    // Mocked memo object to store the memoized data
    const useMemoResponse = {}
    const mockFunc = jest.fn(
      (cb, ...deps) => checkCall(cb, ...deps) || useMemoResponse
    )
    return mockFunc
  },
  createElement: () => {
    return jest.fn((comp, props, children) => {
      comp.props = props
      comp.children = children
      return comp
    })
  },
}

export const mockReactHooks = (...reactMocks) => {
  const reactMockedHooks = reactMocks.reduce((mockedHooks, toMock) => {
    const hookMock = reactHookMocks[toMock] && reactHookMocks[toMock]()
    hookMock && (mockedHooks[toMock] = hookMock)

    return mockedHooks
  }, {})

  jest.setMock('react', { ...React, ...reactMockedHooks })

  return reactMockedHooks
}

export const clearMockedHooks = mockedHooks => {
  Object.keys(mockedHooks).map(key => {
    mockedHooks[key].mockClear()
  })
}
