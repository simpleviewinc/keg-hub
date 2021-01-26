import { runSeq } from '../runSeq'
import { wait } from '../../promise/wait'

const oldConsole = console.error
describe('runSeq', () => {
  beforeAll(() => (console.error = jest.fn()))
  afterAll(() => (console.error = oldConsole))

  it('should validate input', async () => {
    const result = await runSeq(null)
    expect(console.error).toHaveBeenCalled()
    expect(result).toEqual([])
    // done()
  })

  it('should run each function in sequence', async () => {
    const fns = [
      (index, results) => wait(30).then(_ => ({ index, results })),
      (index, results) => wait(30).then(_ => ({ index, results })),
      (index, results) => wait(30).then(_ => ({ index, results })),
    ]

    const expectedResults = [
      { index: 0, results: [] },
      { 
        index: 1, 
        results: [ { index: 0, results: [] }]
      },
      { 
        index: 2, 
        results: [ 
          { index: 0, results: [] }, 
          { index: 1, results: [ { index: 0, results: [] } ] }
        ]
      }
    ]

    const results = await runSeq(fns, { cloneResults: true })

    ;[ 0, 1, 2 ].map(index =>
      expect(results[index])
        .toMatchObject(expectedResults[index])
    )
  })

  it('should return the returnOriginal item at the index of any non-function', async () => {
    const input = [ 'not a function', 123 ]
    let results = await runSeq(input, { returnOriginal: false })
    results.map(result => expect(result).toBeUndefined())

    results = await runSeq(input, { returnOriginal: true })
    results.map((result, idx) => expect(result).toEqual(input[idx]))
  })
})