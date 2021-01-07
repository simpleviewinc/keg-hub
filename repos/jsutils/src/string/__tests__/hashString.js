const { hashString } = require('../')

describe('hashString', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a hash of the passed in string', () => {
    const hash = hashString(`{ test: "data" }`)
    expect(hash).toBe(`1441025846`)
  })

  it('should create the same hash when the passed in string is the same', () => {
    expect(hashString(`{ test: "data" }`)).toBe(hashString(`{ test: "data" }`))
  })

  it('should create the different hashes when the passed in string is the differnt', () => {
    expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test: "data1" }`))
    expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test: "1data" }`))
    expect(hashString(`{ test: "data" }`)).not.toBe(hashString(`{ test1: "data" }`))
  })

  it('should return hash matching the length or the passed in max length value', () => {
    const hash = hashString(`{ test: "data" }`, 2)
    expect(hash.length).toBe(2)

    const hash2 = hashString(`{ test: "data" }`, 0)
    expect(hash2.length).toBe(0)
  })

})