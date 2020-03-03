import { Mocks, mockLocation } from 'SVMocks'

const { useQuery } = require('../useQuery')
const { renderHook, act } = require('@testing-library/react-hooks')

describe('useQuery', () => {

  beforeEach(() => {
    Mocks.resetMocks()
  })

  it('returns the value of the key', () => {

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?id=50'}) }})
    const obj = renderHook(() => useQuery('id'))
    expect(obj.result.current).toEqual('50')

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?id=50&type=foo'}) }}, true)
    const obj2 = renderHook(() => useQuery('type'))
    expect(obj2.result.current).toEqual('foo')

  })

  it('returns an array if search param is in array format', () => {

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?name=50,20,30'}) }})
    const obj = renderHook(() => useQuery('name'))
    expect(obj.result.current).toEqual(["50", "20", "30"])

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?name=50%2C20%2C30'}) }}, true)
    const obj2 = renderHook(() => useQuery('name'))
    expect(obj2.result.current).toEqual(["50", "20", "30"])

  })

  it('returns null on invalid/nonexistent key', () => {

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?id=50&type=foo'}) }})
    const obj = renderHook(() => useQuery('name'))
    expect(obj.result.current).toEqual(null)

  })

  it('returns the querystring obj if no key is passed in', () => {

    Mocks.setMocks({ components: { useLocation: mockLocation({search: '?id=50&type=foo'}) }})
    const obj = renderHook(() => useQuery())
    const expected = {
      id: '50',
      type: 'foo'
    }
    expect(obj.result.current).toEqual(expected)

  })

})