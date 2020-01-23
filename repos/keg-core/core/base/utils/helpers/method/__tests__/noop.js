import { Mocks } from 'SVMocks'

const { noOp } = require('../noop')

describe('noOp', () => {
  beforeEach(() => Mocks.resetMocks())

  it('should return undefined', () => {
    expect(noOp()).toBe(undefined)
  })
})
