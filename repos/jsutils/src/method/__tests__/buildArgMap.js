import { buildArgMap } from '../buildArgMap'
describe('buildArgMap', () => {
  it('should build a nested map using the array', () => {
    const args = [ 1, 'key', 'another key']
    const valueToCache = 63
    const map = buildArgMap()
    const success = map.set(args, valueToCache)
    expect(success).toEqual(true)
    console.log(map.toString())
    expect(map.get(args)).toEqual(valueToCache)
  })

  it ('should not return true for .has if passing in a subset of another path', () => {
    const args = [ 1, 'key', 'another key']
    const valueToCache = 63
    const map = buildArgMap()
    const success = map.set(args, valueToCache)

    expect(map.has([1])).toEqual(false)
    expect(map.has([1, 'key'])).toEqual(false)
    expect(map.has([1, 'key', 'another key'])).toEqual(true)

  })

  it ('should support setting multiple values using subsets of the same path', () => {
    const caseA = { 
      args: [ 1, 'key', 'another key'],
      value: 'A',
    }
    const caseB = { 
      args: [ 1, 'key'],
      value: 'B',
    }
    const caseC = { 
      args: [ 1 ],
      value: 'C',
    }
    const caseD = { 
      args: [ 1, 'key', 'another key', 'final key' ],
      value: 'D',
    }


    const map = buildArgMap()

    const successA = map.set(caseA.args, caseA.value)
    expect(successA).toBe(true)

    // check that you can't use a subset of the path to get to that value
    expect(map.get(caseB.args)).toEqual(undefined)

    const successB = map.set(caseB.args, caseB.value)
    expect(successB).toBe(true)

    expect(map.get(caseC.args)).toEqual(undefined)

    const successC = map.set(caseC.args, caseC.value)
    expect(successC).toBe(true)

    const successD = map.set(caseD.args, caseD.value)
    expect(successD).toBe(true)

    // check that inserting small paths doesn't overwrite longer paths with shared subsets
    expect(map.get(caseA.args))
      .toEqual(caseA.value)

    expect(map.get(caseB.args))
      .toEqual(caseB.value)

    expect(map.get(caseC.args))
      .toEqual(caseC.value)

    expect(map.get(caseD.args))
      .toEqual(caseD.value)
  })

  it('should work with objects and arrays using reference equality', () => {
    const args = [ 
      { a: 5 },
      [ 1, 2, 3 ]
    ]
    const valueToCache = 'coolness'
    const map = buildArgMap()
    map.set(args, valueToCache)
    expect(map.get(args)).toEqual(valueToCache)
    expect(map.get([
      { a: 5 },
      [ 1, 2, 3 ]
    ])).toEqual(undefined)
  })

  it('should work with empty arrays', () => {
    const map = buildArgMap()
    map.set([], 55)
    expect(map.get([])).toEqual(55)
  })

  it ('should work with variable arg lengths', () => {
    const map = buildArgMap()
    const argsA = [ 'hello' ]
    const argsB = [ 'greetings', 'goodbye' ]
    map.set(argsA, 55)
    map.set(argsB, 77)

    expect(map.get(argsA)).toEqual(55)
    expect(map.get(argsB)).toEqual(77)
  })

  it ('should tell caller if args value is set', () => {
     const map = buildArgMap()
    const argsA = [ 'keyA', 'keyB' ]
    map.set(argsA, false)

    expect(map.has(argsA)).toEqual(true)
    expect(map.has([ 'keyA', 'keyC'])).toEqual(false)
  })

  it ('should return false when provided a null args array', () => {
    const orig = console.error
    console.error = jest.fn()

    const map = buildArgMap()
    map.get(null, 55)

    expect(console.error).toHaveBeenCalledTimes(1)

    console.error = orig
  })
})