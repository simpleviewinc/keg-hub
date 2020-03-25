const Url = require('..')

describe('objToQuery', () => {

  beforeEach(() => jest.resetAllMocks())

  it('return a valid querystring from the given object with strings', () => {

    const obj = {
      name: 'daniel',
      food: 'pasta'
    }
    const result = Url.objToQuery(obj)
    expect(result).toEqual('?name=daniel&food=pasta')

    const obj2 = {
      name: 'some sentence with spaces',
    }
    const result2 = Url.objToQuery(obj2)
    expect(result2).toEqual('?name=some%20sentence%20with%20spaces')

  })

  it('return a valid querystring from the given object with number', () => {

    const obj = {
      name: 'daniel',
      id: 100
    }
    const result = Url.objToQuery(obj)
    expect(result).toEqual('?name=daniel&id=100')

  })

  it('return a valid querystring from the given object with nested object', () => {

    const obj = {
      name: 'daniel',
      id: {
        foo: 'bar'
      }
    }
    const result = Url.objToQuery(obj)
    // just appends the nested object via JSON string
    expect(result).toEqual('?name=daniel&id=%7B%22foo%22%3A%22bar%22%7D')

  })

  it('return a valid querystring from the given object with boolean', () => {

    const obj = {
      name: 'daniel',
      alive: true
    }
    const result = Url.objToQuery(obj)
    // just appends the nested object via JSON string
    expect(result).toEqual('?name=daniel&alive=true')

  })

  it('should convert array object for commas', () => {

    const obj = {
      name: 'daniel',
      groups: [1, 2, 3]
    }
    const result = Url.objToQuery(obj)
    expect(result).toEqual('?name=daniel&groups=1%2C2%2C3')

  })

  it('should return valid inputs only, invalid inputs are excluded', () => {

    const obj = {
      name: 'daniel',
      func: () => {}
    }
    const result = Url.objToQuery(obj)
    expect(result).toEqual('?name=daniel')

  })

  it('should return emptystring on null or empty obj', () => {

    expect(Url.objToQuery({})).toEqual('')
    expect(Url.objToQuery(null)).toEqual('')

  })

})
