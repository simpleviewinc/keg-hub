/* eslint-disable no-unused-vars */

import { usePointerState } from '../usePointerState'
import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'

jest.resetModules()
jest.resetAllMocks()

const mockedHooks = mockReactHooks(
  'useState',
  'useMemo',
  'useCallback',
  'useRef'
)

let hoverMock = false
let refCBMock = jest.fn((options, events, pointerState) => {})

const usePointerStateMock = jest.fn((options = {}, pointerState) => {
  return {
    hover: hoverMock,
    focus: false,
    active: false,
    ref: refCBMock,
    ...options,
  }
})

jest.setMock('../usePointerState', { usePointerState: usePointerStateMock })

const { useThemeState } = require('../useThemeState')

describe('useThemeState', () => {
  afterEach(() => {
    clearMockedHooks(mockedHooks)
    usePointerStateMock.mockClear()
  })

  it('should return a hook function', () => {
    expect(typeof useThemeState('test')).toBe('function')
  })

  it('should call usePointerState to get the current pointer state', () => {
    expect(usePointerStateMock).not.toHaveBeenCalled()
    const resp = useThemeState('test')({}, {})
    expect(usePointerStateMock).toHaveBeenCalled()
  })

  it('should return hover off state when hover state is false', () => {
    hoverMock = false
    const [ __, current ] = useThemeState('hover')(
      { isOff: true },
      { isOn: true }
    )
    expect(current.isOff).toBe(true)
    expect(current.isOn).toBe(undefined)
    hoverMock = false
  })

  it('should return hover on state when hover state is true', () => {
    hoverMock = true
    const [ __, current ] = useThemeState('hover')(
      { isOff: undefined },
      { isOn: true }
    )
    expect(current.isOn).toBe(true)
    expect(current.isOff).toBe(undefined)
    hoverMock = false
  })

  it('should merge the two state when noMerge is not passed and passed state is active', () => {
    hoverMock = true
    const [ __, current ] = useThemeState('hover')(
      { mergedOff: true },
      { mergedOn: true }
    )
    expect(current.mergedOn).toBe(true)
    expect(current.mergedOff).toBe(true)
    hoverMock = false
  })

  it('should NOT merge the two state when noMerge is passed and passed state is active', () => {
    hoverMock = true
    const [ __, current ] = useThemeState('hover')(
      { mergedOff: true },
      { mergedOn: true },
      { noMerge: true }
    )
    expect(current.mergedOn).toBe(true)
    expect(current.mergedOff).toBe(undefined)
    hoverMock = false
  })

  it('should use the passed in ref when it exists', () => {
    const customRef = () => {}
    const [ref] = useThemeState('hover')({}, {}, { ref: customRef })
    expect(ref).toBe(customRef)
  })

  it('should call useRef hook when no ref is passed in', () => {
    expect(mockedHooks.useRef).not.toHaveBeenCalled()
    const [ref] = useThemeState('hover')({}, {}, {})
    expect(mockedHooks.useRef).toHaveBeenCalled()
  })
})
