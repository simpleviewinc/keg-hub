import { Mocks, mockLocation } from 'KegMocks'

// const { useQuery } = require('../useQuery')
const useQuery = (...args) => require('../useQuery').useQuery(...args)
const { renderHook } = require('@testing-library/react-hooks')

describe('useQuery', () => {
  beforeEach(() => {
    Mocks.resetMocks()
  })

  it('returns the value of the key', () => {
    Mocks.setMocks({
      'components/router/router': {
        useLocation: mockLocation({ search: '?id=50' }),
      },
      'react-router': {
        useLocation: mockLocation({ search: '?id=50' }),
      },
    })
    const obj = renderHook(() => useQuery('id'))
    expect(obj.result.current).toEqual('50')
  })

  it('returns an array if search param is in array format', () => {
    Mocks.setMocks({
      'react-router': {
        useLocation: mockLocation({ search: '?name=50,20,30' }),
      },
    })
    const obj = renderHook(() => useQuery('name'))
    expect(obj.result.current).toEqual([ '50', '20', '30' ])

    Mocks.setMocks(
      {
        'react-router': {
          useLocation: mockLocation({ search: '?name=50%2C20%2C30' }),
        },
      },
      true
    )
    const obj2 = renderHook(() => useQuery('name'))
    expect(obj2.result.current).toEqual([ '50', '20', '30' ])
  })

  it('returns null on invalid/nonexistent key', () => {
    Mocks.setMocks({
      'react-router': {
        useLocation: mockLocation({ search: '?id=50&type=foo' }),
      },
    })
    const obj = renderHook(() => useQuery('name'))
    expect(obj.result.current).toEqual(null)
  })

  it('returns the querystring obj if no key is passed in', () => {
    Mocks.setMocks({
      'react-router': {
        useLocation: mockLocation({ search: '?id=50&type=foo' }),
      },
    })
    const obj = renderHook(() => useQuery())
    const expected = {
      id: '50',
      type: 'foo',
    }
    expect(obj.result.current).toEqual(expected)
  })
})
