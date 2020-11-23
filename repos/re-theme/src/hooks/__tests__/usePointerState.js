import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'

jest.resetModules()
jest.resetAllMocks()

let isEnabled = false
const isHoverEnabled = jest.fn(() => {
  return isEnabled
})

const mockRef = () => {}
const mockedHooks = mockReactHooks('useState', 'useMemo', 'useCallback', 'useRef', 'useEffect')
jest.setMock('../isHoverEnabled', { isHoverEnabled: isHoverEnabled })

const { usePointerState } = require('../usePointerState')

describe('usePointerState', () => {

  afterEach(() => {
    clearMockedHooks(mockedHooks)
  })

  it('should return the current states of the pointer', () => {
    const { hover, active, focus } = usePointerState({
      ref: mockRef,
    }, 'test')

    expect(hover).not.toBe(undefined)
    expect(active).not.toBe(undefined)
    expect(focus).not.toBe(undefined)
  })

  it('should return the hover event handlers when hover is passed as the pointer state', () => {
    const { events } = usePointerState({
      ref: mockRef,
    }, 'hover')

    expect(typeof events.mouseenter).toBe('function')
    expect(typeof events.mouseleave).toBe('function')
  })

  it('should returned event handler should call the passed in hover callbacks', () => {
    const onMouseIn = jest.fn()
    const onMouseOut = jest.fn()
    const { events } = usePointerState({
      onMouseIn,
      onMouseOut,
      ref: mockRef,
    }, 'hover')

    isEnabled = true
    events.mouseenter()
    expect(onMouseIn).toHaveBeenCalled()
    events.mouseleave()
    expect(onMouseOut).toHaveBeenCalled()
    isEnabled = false
  })

  it('should return the active event handlers when active is passed as the pointer state', () => {
    const { events } = usePointerState({
      ref: mockRef,
    }, 'active')

    expect(typeof events.mousedown).toBe('function')
  })

  it('should returned event handler should call the passed in active callbacks', () => {
    const onMouseDown = jest.fn()
    const { events } = usePointerState({
      onMouseDown,
      ref: mockRef,
    }, 'active')

    events.mousedown()
    expect(onMouseDown).toHaveBeenCalled()

  })

  it('should return the focus event handlers when focus is passed as the pointer state', () => {
    const { events } = usePointerState({
      ref: mockRef,
    }, 'focus')

    expect(typeof events.focus).toBe('function')
    expect(typeof events.blur).toBe('function')
  })

  it('should returned event handler should call the passed in focus callbacks', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { events } = usePointerState({
      onFocus,
      onBlur,
      ref: mockRef,
    }, 'focus')

    events.focus()
    expect(onFocus).toHaveBeenCalled()
    events.blur()
    expect(onBlur).toHaveBeenCalled()
  })

})
