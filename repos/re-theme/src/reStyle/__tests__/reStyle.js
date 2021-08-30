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

// tests helper that verifies dynamic keys aren't present in final styles object
const assertNoDynamicKeys = styles => {
  const styleKeys = Object.keys(styles)
  expect(styleKeys).not.toContain('$xsmall')
  expect(styleKeys).not.toContain('$small')
  expect(styleKeys).not.toContain('$medium')
  expect(styleKeys).not.toContain('$large')
  expect(styleKeys).not.toContain('$web')
  expect(styleKeys).not.toContain('$native')
  expect(styleKeys).not.toContain('$ios')
  expect(styleKeys).not.toContain('$android')
}

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

  it('should compile size keys', () => {
    const style = {
      $xsmall: {
        padding: 20, 
      },
      $large: {
        padding: 10
      },
      $small: {
        padding: 15
      },
    }

    const propsStyle = { margin: 12 }
    const TestComp = reStyle(Component)(style).render({ style: propsStyle })
    const compiledStyles = TestComp.props.style 
    expect(compiledStyles).toEqual(expect.objectContaining({
      padding: style['$large'].padding,
      ...propsStyle
    }))
    assertNoDynamicKeys(compiledStyles)
  })

  it('should compile platform keys', () => {
    const style = {
      $all: {
        $large: {
          borderTop: 10,
          c: 'red',
        },
        $small: {
          padding: 10
        }
      },
      $web: {
        $xsmall: {
          padding: 20, 
        },
        $large: {
          padding: 10,
          c: 'blue'
        },
        $small: {
          padding: 15
        },
      },
      $native: {
        $large: {
          padding: 0
        }
      },
    }
    const propsStyle = { margin: 12 }
    const TestComp = reStyle(Component)(style).render({ style: propsStyle })
    const compiledStyles = TestComp.props.style
    expect(compiledStyles).toEqual(expect.objectContaining({
      padding: style.$web.$large.padding,
      color: style.$web.$large.c,
      borderTop: style.$all.$large.borderTop,
      ...propsStyle
    }))
    assertNoDynamicKeys(compiledStyles)
  })

  it('should compile shortcuts', () => {
    const style = {
      p: 20,
      mT: 10,
    }
    const propsStyle = { mB: 12 }
    const TestComp = reStyle(Component)(style).render({ style: propsStyle })
    const compiledStyles = TestComp.props.style
    expect(compiledStyles).toEqual(expect.objectContaining({
      padding: style.p,
      marginTop: style.mT,
      marginBottom: propsStyle.mB
    }))
    assertNoDynamicKeys(compiledStyles)
    expect(Object.keys(compiledStyles)).not.toContain('mT')
    expect(Object.keys(compiledStyles)).not.toContain('mB')
    expect(Object.keys(compiledStyles)).not.toContain('p')
  })

  it.only('should maintain object structure', () => {
    const style = {
      component: {
        p: 20,
        mT: 10,
      }
    }
    const propsStyle = { mB: 12 }
    const TestComp = reStyle(Component)(style).render({ style: propsStyle })
    const compiledStyles = TestComp.props.style
    expect(compiledStyles).toEqual(expect.objectContaining({
      component: {
        padding: style.component.p,
        marginTop: style.component.mT,
      },
      marginBottom: propsStyle.mB
    }))
  })
})
