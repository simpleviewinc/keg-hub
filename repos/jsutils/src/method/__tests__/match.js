const { isArr } = require('../../array/isArr')
const { isStr } = require('../../string/isStr')
const Method = require('../')

describe('match', () => {

  beforeEach(() => jest.resetAllMocks())
  it ('should match the first matching case', () => {
    const expectedResult = 55

    const matchArg = 'wow'
    const result = Method.match(matchArg,
      [ 'whoa', 1 ],
      [ 'wow', expectedResult ]
    )

    expect(result).toEqual(expectedResult)
  })

  it ('should work with predicate functions as the matching value', () => {
    const expectedResult = 22
    const result = Method.match('fooby',
      [ isStr, expectedResult ],
      [ isArr, 55 ]
    )
    expect(result).toEqual(expectedResult)
  })

  it ('should default to null if no matches were valid and no fallback was specified', () => {
    const result = Method.match('fooby',
      [ isArr, 12],
      [ 'barbaz', 55 ]
    )
    expect(result).toBeNull()
  })

  it ('should console error if a case is not an entry', () => {
    const orig = console.error
    console.error = jest.fn()
    const result = Method.match('fooby', 'wow')
    expect(console.error).toHaveBeenCalled()
    expect(result).toBe(null)
    console.error = orig
  })

  it ('should return the fallback if no cases match', () => {
    const expectedResult = 22
    const result = Method.match(1,
      [ isStr, 33 ],
      [ isArr, 55 ],
      [ Method.match.default, expectedResult ]
    )
    expect(result).toEqual(expectedResult)
  })

  it ('should return null with no cases defined', () => {
    const result = Method.match('my arg')
    expect(result).toBeNull()
  })

})
