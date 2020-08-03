import { identity } from '../'

describe('identity', () => {
  it ('should return its input argument', () => {
    expect(identity(5)).toEqual(5)
  })
})