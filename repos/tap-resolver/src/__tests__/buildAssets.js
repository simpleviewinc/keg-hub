const { FS } = require('../../mocks')
jest.setMock('fs', FS)

const basePath = './base'
const clientPath = './clients/test'
const buildAssets = require('../buildAssets')

describe('Build Assets', () => {
  
  beforeEach(() => {
    global.testMocks.fs = {
      dirFiles: [ 'test.png', 'duper.jpg', 'no_ext', 'bad.ext' ]
    }
  })
  
  it('Should write the client assets to file with fs.writeFileSync', () => {

    const assetsPath = buildAssets(basePath, clientPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(FS.readdirSync).toHaveBeenCalledWith(`${clientPath}/assets`)
    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe('./base/assets/index.js')

  })

  it('Should only include allowed extensions', () => {

    const assetsPath = buildAssets(basePath, clientPath)
    const saveContent = FS.writeFileSync.mock.calls[0][1]

    expect(saveContent.indexOf('duper.jpg')).not.toEqual(-1)
    expect(saveContent.indexOf('test.png')).not.toEqual(-1)
    expect(saveContent.indexOf('no_ext')).toEqual(-1)
    expect(saveContent.indexOf('bad.ext')).toEqual(-1)

  })

})
