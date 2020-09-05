jest.resetModules()
jest.resetAllMocks()
jest.clearAllMocks()

const HeadElement = jest.fn(props => {
  return props.children
})
jest.setMock('../headElement', { HeadElement })


const renderComponent = (Component, props) => {
  const HeadComponent = Component(props)
  HeadComponent.type(HeadComponent.props)
  return HeadComponent
}

const { Title, Style, Meta, Link } = require('../headComponents')

describe('headComponents', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should set the correct tag prop for the component when rendered', () => {

    const renderTitle = renderComponent(Title, { children: 'title-test' })
    const renderStyle = renderComponent(Style, { children: 'title-style' })
    const renderMeta = renderComponent(Meta, { children: 'title-meta' })
    const renderLink = renderComponent(Link, { children: 'title-link' })
  
    const titleProps = renderTitle.type.mock.calls[0][0]
    const styleProps = renderTitle.type.mock.calls[1][0]
    const metaProps = renderTitle.type.mock.calls[2][0]
    const linkProps = renderTitle.type.mock.calls[3][0]

    expect(titleProps.tag).toBe('title')
    expect(styleProps.tag).toBe('style')
    expect(metaProps.tag).toBe('meta')
    expect(linkProps.tag).toBe('link')

  })


  it('should pass on all other props to the Header Component', () => {

    const renderTitle = renderComponent(Title, { children: 'test-title', other: 'foo' })
    const renderStyle = renderComponent(Style, { children: 'test-style', id: 1234 })
    const renderMeta = renderComponent(Meta, { children: 'test-meta', bar: { base: 'baz'} })
    const renderLink = renderComponent(Link, { children: 'test-link', duper: [ 'scooper' ] })
  
    const titleProps = renderTitle.type.mock.calls[0][0]
    const styleProps = renderTitle.type.mock.calls[1][0]
    const metaProps = renderTitle.type.mock.calls[2][0]
    const linkProps = renderTitle.type.mock.calls[3][0]

    expect(titleProps.children).toBe('test-title')
    expect(titleProps.other).toBe('foo')
    expect(styleProps.children).toBe('test-style')
    expect(styleProps.id).toBe(1234)
    expect(metaProps.children).toBe('test-meta')
    expect(metaProps.bar.base).toBe('baz')
    expect(linkProps.children).toBe('test-link')
    expect(linkProps.duper[0]).toBe('scooper')

  })

})
