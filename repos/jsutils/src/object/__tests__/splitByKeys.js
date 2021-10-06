const Obj = require('../')

const testObj = {
  0: 'first-match',
  1: 'second-match',
  2: 'non-matching'
}

describe('splitByKeys', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return an array of objects', () => {
    const resp = Obj.splitByKeys({ 1: 'match', 2: 'non-matching' }, [ 1 ])
    expect(Array.isArray(resp)).toBe(true)

    const [matching, nonMatching] = resp
    
    expect(Obj.isObj(matching)).toBe(true)
    expect(Obj.isObj(nonMatching)).toBe(true)
  })

  it('should split the matching and and non-matching keys into two objects', () => {
    const [matching, nonMatching] = Obj.splitByKeys(testObj, [ 0, 1 ])

    expect(matching).toEqual({ 0: 'first-match', 1: 'second-match' })
    expect(nonMatching).toEqual({ 2: 'non-matching' })
  })

  it('should return no matching keys when the second argument is not passed', () => {
    const [matching, nonMatching] = Obj.splitByKeys(testObj)

    expect(Object.keys(matching).length).toBe(0)
    expect(nonMatching).toEqual(testObj)
  })

  it('should return empty objects when the first argument is not an object', () => {
    const [matching, nonMatching] = Obj.splitByKeys([], [ 0, 1 ])

    expect(matching).toEqual({})
    expect(nonMatching).toEqual({})
  })

  it('should work with strings and numbers', () => {
    const [matching, nonMatching] = Obj.splitByKeys(
      { two: 'no-two', 0: 34, 'test': 'matching', 1: 'no-match' },
      [ 'test', 0 ]
    )

    expect(matching).toEqual({ 'test': 'matching', 0: 34 })
    expect(nonMatching).toEqual({ 1: 'no-match', two: 'no-two' })
  })

})