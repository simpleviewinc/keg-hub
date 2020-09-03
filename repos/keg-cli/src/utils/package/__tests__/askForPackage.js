
const { Logger } = require('KegMocks/logger')
const { AskIt } = require('KegMocks/ask')

const throwPackageError = jest.fn()
jest.setMock('../../error/throwPackageError', { throwPackageError })
jest.setMock('KegLog', { Logger })
jest.setMock('@keg-hub/ask-it', { ask: AskIt })

const { askForPackage } = require('../askForPackage')

describe('askForPackage', () => {

  afterAll(() => jest.resetAllMocks())

  it('should ask the user to choose a package ', async () => {

    const package = await askForPackage([ 'package0', 'package1' ], 'user')

    expect(package).toBe('package1')
    expect(AskIt.promptList).toHaveBeenCalled()

  })

  it('should throw if no packages are passed in', async () => {

    const package = await askForPackage([], 'user')

    expect(throwPackageError).toHaveBeenCalled()

  })

})