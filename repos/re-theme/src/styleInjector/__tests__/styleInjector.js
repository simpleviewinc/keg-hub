import React from 'react'

jest.resetModules()
jest.resetAllMocks()

const mockUseStyleTag = jest.fn(() => {
  return { classList: ['test-mock-component'], filteredStyle: {} }
})

jest.setMock('../useStyleTag', { useStyleTag: mockUseStyleTag })

const mockConfig = {
  displayName: 'MockComponent',
  className: 'test-mock-component',
}
const mockProps = { style: { color: `#111111` } }

const MockComponent = props => {
  return React.createElement('div', props, 'I am a div')
}

const { StyleInjector } = require('../styleInjector')

describe('styleInjector', () => {
  afterEach(() => {
    mockUseStyleTag.mockClear()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should return the original component when a style prop does not exists', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    const mockComp = WrappedComp.render({})

    expect(mockComp.type).toBe(MockComponent)
  })

  it('should return the BuildWithStyles component NOT the original when style prop exists', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    expect(WrappedComp[`$$typeof`].toString()).toBe(`Symbol(react.forward_ref)`)
    expect(typeof WrappedComp.render).toBe('function')
    const mockComp = WrappedComp.render(mockProps)
    expect(mockComp).not.toBe(MockComponent)
  })

  test('Returned component should call useStyleTag when rendered', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    const mockComp = WrappedComp.render(mockProps)
    mockComp.type.render(mockComp.props)
    expect(mockUseStyleTag).toHaveBeenCalled()
  })

  test('Returned component pass the style, className and config to the useStyleTag hook', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    const mockComp = WrappedComp.render(mockProps)
    mockComp.type.render(mockComp.props)
    const argsArr = mockUseStyleTag.mock.calls[0]

    expect(argsArr[0]).toBe(mockProps.style)
    expect(argsArr[1]).toBe(mockConfig.className)
    expect(argsArr[2]).toBe(mockConfig)
  })

  test('should return the original component with the className, but without the original styles', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    const mockComp = WrappedComp.render(mockProps)
    const OrgComponent = mockComp.type.render(mockComp.props)

    expect(OrgComponent.type).toBe(MockComponent)
    expect(OrgComponent.props.style).not.toBe(mockProps.style)
    expect(OrgComponent.props.className).toBe(mockConfig.className)
  })

  test('should pass all other props onto the original component', () => {
    const WrappedComp = StyleInjector(MockComponent, mockConfig)
    const mockComp = WrappedComp.render(mockProps)
    const OrgComponent = mockComp.type.render({
      ...mockComp.props,
      other: 'prop',
      custom: 'test-prop',
    })

    expect(OrgComponent.props.other).toBe('prop')
    expect(OrgComponent.props.custom).toBe('test-prop')
  })
})
