import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'

// Override the addEventListener to Allow catching the enableHover method
// This was we can call it when we want to test the onMouseHover method
let enableHover
let disableHover
const addListener = document.addEventListener
document.addEventListener = (name, method, opts) => {
  if (name === 'mousemove') enableHover = method
  if (name === 'touchstart') disableHover = method
  addListener.call(document, name, method, opts)
}

jest.resetModules()
jest.resetAllMocks()

const mockRef = () => {}
const mockedHooks = mockReactHooks(
  'useState',
  'useMemo',
  'useCallback',
  'useRef',
  'useEffect'
)

const { usePointerState } = require('../usePointerState')

describe('usePointerState', () => {
  afterEach(() => {
    clearMockedHooks(mockedHooks)
  })

  it('should return the current states of the pointer', () => {
    const { hover, active, focus } = usePointerState(
      {
        ref: mockRef,
      },
      'test'
    )

    expect(hover).not.toBe(undefined)
    expect(active).not.toBe(undefined)
    expect(focus).not.toBe(undefined)
  })

  it('should return the hover event handlers when hover is passed as the pointer state', () => {
    const { events } = usePointerState(
      {
        ref: mockRef,
      },
      'hover'
    )

    expect(typeof events.pointerover).toBe('function')
    expect(typeof events.pointerout).toBe('function')
  })

  it('should returned event handler should call the passed in hover callbacks', () => {
    const onPointerIn = jest.fn()
    const onPointerOut = jest.fn()
    const { events } = usePointerState(
      {
        onPointerIn,
        onPointerOut,
        ref: mockRef,
      },
      'hover'
    )

    enableHover()
    events.pointerover()
    expect(onPointerIn).toHaveBeenCalled()
    events.pointerout()
    expect(onPointerOut).toHaveBeenCalled()
    disableHover()
  })

  it('should not call the on hover callbacks when hover is disabled', () => {
    const onPointerIn = jest.fn()
    const onPointerOut = jest.fn()
    const { events } = usePointerState(
      {
        onPointerIn,
        onPointerOut,
        ref: mockRef,
      },
      'hover'
    )

    disableHover()
    events.pointerover()
    expect(onPointerIn).not.toHaveBeenCalled()
  })

  it('should return the active event handlers when active is passed as the pointer state', () => {
    const { events } = usePointerState(
      {
        ref: mockRef,
      },
      'active'
    )

    expect(typeof events.pointerdown).toBe('function')
  })

  it('should returned event handler should call the passed in active callbacks', () => {
    const onPointerDown = jest.fn()
    const { events } = usePointerState(
      {
        onPointerDown,
        ref: mockRef,
      },
      'active'
    )

    events.pointerdown()
    expect(onPointerDown).toHaveBeenCalled()
  })

  it('should return the focus event handlers when focus is passed as the pointer state', () => {
    const { events } = usePointerState(
      {
        ref: mockRef,
      },
      'focus'
    )

    expect(typeof events.focus).toBe('function')
    expect(typeof events.blur).toBe('function')
  })

  it('should returned event handler should call the passed in focus callbacks', () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()
    const { events } = usePointerState(
      {
        onFocus,
        onBlur,
        ref: mockRef,
      },
      'focus'
    )

    events.focus()
    expect(onFocus).toHaveBeenCalled()
    events.blur()
    expect(onBlur).toHaveBeenCalled()
  })
})
