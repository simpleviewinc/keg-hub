import { runSeq } from '../runSeq'
import { wait } from '../../promise/wait'

const oldConsole = console.error
describe('runSeq', () => {
  beforeAll(() => (console.error = jest.fn()))
  afterAll(() => (console.error = oldConsole))

  it('should validate input', async done => {
    const result = await runSeq(null)
    expect(console.error).toHaveBeenCalled()
    expect(result).toEqual([])
    done()
  })

  it('should run each function in sequence', async done => {
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

    const results = await runSeq(fns, true)

    ;[ 0, 1, 2 ].map(index =>
      expect(results[index])
        .toMatchObject(expectedResults[index])
    )


    done()
  })

  it('should return undefined at the index of any non-function', async done => {
    const results = await runSeq([ 'not a function', 123 ])
    results.map(result => expect(result).toBeUndefined())
    done() 
  })
})