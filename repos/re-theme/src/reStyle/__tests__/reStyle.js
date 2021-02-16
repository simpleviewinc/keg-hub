import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'
import { testTheme as theme } from '../../mocks/testTheme'

jest.resetModules()
jest.resetAllMocks()

const mockedHooks = mockReactHooks(
  'useState',
  'useMemo',
  'useEffect',
  'useRef',
  'createElement'
)

const useThemeMock = jest.fn(() => theme)
jest.setMock('../../hooks/useTheme', { useTheme: useThemeMock })

const Component = jest.fn()
Component.displayName = 'TestComponent'
const StyleInjectorMock = jest.fn(() => {
  return Component
})
jest.setMock('../../styleInjector/styleInjector', {
  StyleInjector: StyleInjectorMock,
})

const { reStyle } = require('../reStyle')

describe('reStyle', () => {
  afterEach(() => {
    clearMockedHooks(mockedHooks)
    useThemeMock.mockClear()
    StyleInjectorMock.mockClear()
  })

  it('should return a function', () => {
    const styleFunc = reStyle(Component)
    expect(typeof styleFunc).toBe('function')
  })

  it('should call the style injector', () => {
    reStyle(Component)
    expect(StyleInjectorMock).toHaveBeenCalled()
  })

  it('returned function should return a functional component', () => {
    const Hoc = reStyle(Component)({})

    expect(Hoc.$$typeof).not.toBe(undefined)
    expect(typeof Hoc).toBe('object')
    expect(typeof Hoc.render).toBe('function')
  })

  it('returned HOC should add the displayName to the returned component', () => {
    const Hoc = reStyle(Component)({})
    expect(Hoc.displayName).toBe('reStyle(TestComponent)')
  })

  it('returned HOC should return the injected component', () => {
    const TestComp = reStyle(Component)({}).render({})
    expect(TestComp).toBe(Component)
  })

  it('returned injected component should have styles added to it', () => {
    const style = { padding: 20 }
    const TestComp = reStyle(Component)(style).render({})

    expect(TestComp.props.style).toEqual(style)
  })

  it('returned injected component should have styles merged with injected styles', () => {
    const style = { padding: 20 }
    const propsStyle = { margin: 12 }
    const TestComp = reStyle(Component)(style).render({ style: propsStyle })

    expect(TestComp.props.style.padding).toBe(20)
    expect(TestComp.props.style.margin).toBe(12)
  })
})
