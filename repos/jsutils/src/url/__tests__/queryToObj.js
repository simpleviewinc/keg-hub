const Url = require('..')

describe('queryToObj', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return a valid object with querystring items', () => {

    const obj = Url.queryToObj('?name=daniel&id=5')
    expect(obj.name).toEqual('daniel')
    expect(obj.id).toEqual('5')

    const obj2 = Url.queryToObj('????????name=daniel&id=5')
    expect(obj2.name).toEqual('daniel')
    expect(obj2.id).toEqual('5')

    const obj3 = Url.queryToObj('/hello?name=daniel&id=5')
    expect(obj3.name).toEqual('daniel')
    expect(obj3.id).toEqual('5')

    const obj4 = Url.queryToObj('?name=some%20sentence%20with%20spaces')
    expect(obj4.name).toEqual('some sentence with spaces')

  })

  it('should return a valid object given array', () => {

    const obj = Url.queryToObj('?names=daniel,foo,man&id=5')
    expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo', 'man']))
    expect(obj.id).toEqual('5')

    const obj2 = Url.queryToObj('?names=daniel,&id=5')
    expect(obj2.names).toEqual(expect.arrayContaining(['daniel']))
    expect(obj2.id).toEqual('5')

    const obj3 = Url.queryToObj('?name=daniel&groups=1%2C2%2C3')
    expect(obj3.groups).toEqual(expect.arrayContaining(['1','2','3']))
    expect(obj3.name).toEqual('daniel')
    

  })

  it('should return the last set of valid querystring items', () => {

    const obj = Url.queryToObj('?name=daniel&id=5^^^*^*^*^*^*^foo=bar')
    expect(obj.name).toEqual('daniel')
    expect(obj.id).toEqual('5^^^*^*^*^*^*^foo=bar')
    expect (obj.foo).toEqual(undefined)

    const obj2 = Url.queryToObj('?color=foobar???name=daniel&id=5')
    expect(obj2.name).toEqual('daniel')
    expect(obj2.id).toEqual('5')
    expect (obj.color).toEqual(undefined)

  })

  it('should return empty object on invalid querystring', () => {

    const obj = Url.queryToObj('just some random string?')
    expect(obj).toEqual({})

    const obj3 = Url.queryToObj('just some random string')
    expect(obj3).toEqual({})

  })

  it('should combine duplicate keys into array', () => {

    const obj = Url.queryToObj('?names=daniel&names=foo')
    expect(obj.names).toEqual(expect.arrayContaining(['daniel', 'foo']))

    const obj2 = Url.queryToObj('?names=&names=foo')
    expect(obj2.names).toEqual(expect.arrayContaining(['foo', '']))

  })
})





