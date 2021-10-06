const {
  execOutputs,
  execBashCmd,
  child_process,
  execCmdNotFound
} = require('../__mocks__/child_process')

jest.setMock('child_process', child_process)
const { findProc } = require('../findProc')

describe('findProc', () => {

  beforeEach(() => {
    child_process.exec.mockClear()
  })
  
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('should call the exec method with a process search function', async () => {
    const resp = await findProc('/bin/bash')
    const [ cmd, callback ] = child_process.exec.mock.calls[0]

    expect(child_process.exec).toHaveBeenCalled()
    process.platform !== `win32` &&
      expect(cmd).toEqual(execBashCmd)
  })

  it('should respond with an array of running processes', async () => {
    const resp = await findProc('/bin/bash')

    expect(Array.isArray(resp)).toBe(true)
    expect(resp).toEqual(execOutputs[execBashCmd].json)
  })

  it('should not throw an error when the command cant be found', async () => {
    try {
      const resp = await findProc(execCmdNotFound)
      expect(Array.isArray(resp)).toBe(true)
      expect(resp.length).toBe(0)
    }
    catch(err){
      throw new Error(`findProc method should not throw`)
    }
  })

  it('should should log an error message when log is passed in options', async () => {
    const oldErr = console.error
    console.error = jest.fn()
    
    await findProc(execCmdNotFound, { log: true })
    expect(console.error).toHaveBeenCalled()
    console.error = oldErr
  })


})