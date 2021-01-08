const { flatArr } = require('../')

describe('flatArr', () => {

  it('should flatten an array to a single level', () => {
    expect(flatArr([ 1,2, [3,4]])).toEqual([1,2,3,4])
  })

  it('should flatten a multi-level array to a single level', () => {
    expect(flatArr([ 1,2, [[[3]],[[[4]]], [5, [[6]]]]])).toEqual([1,2,3,4,5,6])
  })

  it('should not mutate the original array', () => {
    const original = [ 1,2, [3]]
    const response = flatArr(original)
    expect(response).not.toBe(original)
    expect(response).toEqual([1,2,3])
  })


  it('should mutate the original array when config mutate is set', () => {
    const original = [ 1,2, [3,4], 5, [6]]
    const response = flatArr(original, { mutate: true })
    expect(response).toBe(original)
    expect(response).toEqual([1,2,3,4,5,6])
  })

  it('should remove falsy values when config truthy is set', () => {
    const original = [ '', 1, null, 2, [false], 0, [3,4, undefined] ]
    const response = flatArr(original, { truthy: true })
    expect(response).not.toBe(original)
    expect(response).toEqual([1,2,3,4])
  })

  it('should remove non-existing values when config exists is set', () => {
    const original = [ 0, 1, null, 2, [3,4, undefined, [''], false]]
    const response = flatArr(original, { exists: true })
    expect(response).not.toBe(original)
    expect(response).toEqual([0,1,2,3,4, '', false])
  })

  it('should remove falsy and mutate the original values when config is set', () => {
    const original = [ 1, null, 2, [3,4, undefined], [5, null], false, [[ 0 ]]]
    const response = flatArr(original, { truthy: true, mutate: true })
    expect(response).toBe(original)
    expect(response).toEqual([1,2,3,4,5])
  })

  it('should remove non-existing and mutate the original values when config is set', () => {
    const original = [ '', 1, null, 2, [3,4, undefined], [5, null], false, [[ 0 ]]]
    const response = flatArr(original, { exists: true, mutate: true })
    expect(response).toBe(original)
    expect(response).toEqual(['',1,2,3,4,5,false,0])
  })

})
