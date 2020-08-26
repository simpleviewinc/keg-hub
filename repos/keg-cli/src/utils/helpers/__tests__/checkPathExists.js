const generalError = jest.fn()
jest.setMock('../../error/generalError', { generalError })

let existsMock = []
const pathExists = jest.fn(() => { return existsMock })
jest.setMock('KegFileSys/fileSys', { pathExists })

const { checkPathExists } = require('../checkPathExists')

describe('checkPathExists', () => {

  afterAll(() => jest.resetAllMocks())

  it('should call pathExists from the filesys lib', async () => {

    await checkPathExists('I/am/a/path')

    expect(pathExists).toHaveBeenCalled()

  })

  it('should throw an error if path dose not exist', async () => {

     existsMock = [ { message: 'I am error'}, false ]
    await checkPathExists('I/am/a/path')

    expect(generalError).toHaveBeenCalledWith('I am error')

  })

})