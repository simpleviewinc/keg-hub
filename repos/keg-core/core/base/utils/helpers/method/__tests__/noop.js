import { Mocks } from 'SVMocks'

const { noOp } = require('../noop')

describe('noOp', () => {
  const orig = console.error
  beforeAll(() => (console.error = jest.fn()))
  afterAll(() => (console.error = orig))
  beforeEach(() => Mocks.resetMocks())

  it('should return undefined', () => {
    expect(noOp()).toBe(undefined)
  })
})
