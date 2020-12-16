const { deepMerge } = require('@keg-hub/jsutils')
const globalConfig = global.getGlobalCliConfig()
const testTask = global.getTask()

const mockArgs = {
  globalConfig,
  __internal: {},
  options: [],
  params: { context: 'base' },
  task: testTask,
}

const runInternalTaskMock = jest.fn((args) => {}) 
jest.setMock('../../task/runInternalTask', { runInternalTask: runInternalTaskMock })

const getBaseTagMock = jest.fn((args) => {}) 
jest.setMock('../../getters/getBaseTag', { getBaseTag: getBaseTagMock })


const { checkPullBaseImage } = require('../checkPullBaseImage')

describe('checkPullBaseImage', () => {

  beforeEach(() => {
    runInternalTaskMock.mockClear()
    getBaseTagMock.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  it('should call runInternalTask when forcePull is true', async () => {
    expect(runInternalTaskMock).not.toHaveBeenCalled()
    await checkPullBaseImage(mockArgs, 'core', true)
    expect(runInternalTaskMock).toHaveBeenCalled()
  })

  it('should call getBaseTag when forcePull is true', async () => {
    expect(getBaseTagMock).not.toHaveBeenCalled()
    await checkPullBaseImage(mockArgs, 'tap', true)
    expect(getBaseTagMock).toHaveBeenCalled()
  })

  it('should call runInternalTask when __internal.forcePull is true', async () => {
    expect(runInternalTaskMock).not.toHaveBeenCalled()
    await checkPullBaseImage(deepMerge(mockArgs, {
      __internal: { forcePull: true }
    }), 'core')
    expect(runInternalTaskMock).toHaveBeenCalled()
  })

  it('should call getBaseTag when __internal.forcePull is true', async () => {
    expect(getBaseTagMock).not.toHaveBeenCalled()
    await checkPullBaseImage(deepMerge(mockArgs, {
      __internal: { forcePull: true }
    }), 'core')
    expect(getBaseTagMock).toHaveBeenCalled()
  })

  it('should use forcePull value over __internal.forcePull value', async () => {
    expect(runInternalTaskMock).not.toHaveBeenCalled()
    expect(getBaseTagMock).not.toHaveBeenCalled()
    await checkPullBaseImage(deepMerge(mockArgs, {
      __internal: { forcePull: true }
    }), 'core', false)
    expect(runInternalTaskMock).not.toHaveBeenCalled()
    expect(getBaseTagMock).not.toHaveBeenCalled()
  })

  // TODO: Add keg_from_base test for the cmdContext

})
