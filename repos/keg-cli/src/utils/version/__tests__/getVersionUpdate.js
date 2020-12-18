const { AskIt } = require('KegMocks/ask')
const { Logger } = require('KegMocks/logger')
const { set } = require('@keg-hub/jsutils')

jest.setMock('KegLog', { Logger })
jest.setMock('@keg-hub/ask-it', { ask: AskIt })

const publishContext =  {
  "name": "test",
  "dependent": true,
  "order": {
    0: '@keg-hub/test-repo'
  }
}

let isValid = true
const mockValidate = jest.fn(version => { return isValid })
jest.setMock('../validateVersion', { validateVersion: mockValidate })

const mockRepo = {
  repo: 'test-repo',
  package: {
    name: '@keg-hub/test-repo',
    version: '1.0.0',
  }
}

const { getVersionUpdate } = require('../getVersionUpdate')

describe('getVersionUpdate', () => {

  afterEach(() => mockValidate.mockClear())
  afterAll(() => jest.resetAllMocks())

  it('should return the update version when its valid', async () => {
    const updateVersion = await getVersionUpdate(mockRepo, `2.0.0`, publishContext)
    expect(updateVersion).toBe(`2.0.0`)
  })

  it('should call validateVersion', async () => {
    await getVersionUpdate(mockRepo, `2.0.0`, publishContext)
    expect(mockValidate).toHaveBeenCalled()
  })

  it('should return undefined when an invalid version is passed', async () => {
    isValid = false
    const updatedVersion = await getVersionUpdate(mockRepo, `0.0.2`, publishContext)
    expect(updatedVersion).toBe(undefined)
    isValid = true
  })

  it('should increment patch version when patch is passed in', async () => {
    const updatedVersion = await getVersionUpdate(mockRepo, `patch`, publishContext)
    expect(updatedVersion).toBe('1.0.1')
  })

  it('should increment minor version when minor is passed in', async () => {
    const updatedVersion = await getVersionUpdate(mockRepo, `minor`, publishContext)
    expect(updatedVersion).toBe('1.1.0')
  })

  it('should increment major version when major is passed in', async () => {
    const updatedVersion = await getVersionUpdate(mockRepo, `major`, publishContext)
    expect(updatedVersion).toBe('2.0.0')
  })

  it('should ask the user for the version when none is passed in', async () => {
    set(global, 'test.askit.input', '1.1.1')
    const updatedVersion = await getVersionUpdate(mockRepo, undefined, publishContext)
    expect(AskIt.input).toHaveBeenCalled()
    expect(updatedVersion).toBe('1.1.1')
  })

  it('should return undefined when an invalid version is entered by the user', async () => {
    isValid = false
    set(global, 'test.askit.input', '0.0.1')
    const updatedVersion = await getVersionUpdate(mockRepo, undefined, publishContext)
    expect(AskIt.input).toHaveBeenCalled()
    expect(updatedVersion).toBe(undefined)
    isValid = true
  })

})