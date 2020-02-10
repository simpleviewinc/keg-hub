const path = require('path')
const { config, FS, basePath, tapPath } = require('../../mocks')

// Helpers to allow calling the setup function in a test env
let isDirectory = false
const isDirMock = jest.fn(() => isDirectory)

// Module to test
const buildAssets = require('../buildAssets')

describe('Build Assets', () => {
  
  beforeEach(() => {
    isDirMock.mockClear()
    FS.writeFileSync.mockClear()

    global.testMocks.fs = {
      readdirSync: [ 'test.png', 'duper.jpg', 'no_ext', 'bad.ext' ],
      lstat: { isDirectory: isDirMock },
    }
  })

  it('Should write to the assets path set in the config if it is a directory', () => {
    isDirectory = true
    const assetsPath = buildAssets(config, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(FS.readdirSync).toHaveBeenCalledWith(`${tapPath}/assets`)
    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe(path.join(tapPath, './assets/index.js'))
  })

  it('Should write the base assets path when config assets path is NOT a directory', () => {
    isDirectory = false
    const assetsPath = buildAssets(config, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(FS.readdirSync).toHaveBeenCalledWith(`${basePath}/assets`)
    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should use the base assets path when no tap assets path is set in config', () => {
    isDirectory = false
    const confCopy = {
      ...config,
      keg: {
        tapResolver: {
          ...config.keg.tapResolver,
          paths: { ...config.keg.tapResolver.paths, tapAssets: undefined }
        }
      }
    }
    const assetsPath = buildAssets(confCopy, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should only include allowed extensions', () => {

    const assetsPath = buildAssets(config, basePath, tapPath)
    const saveContent = FS.writeFileSync.mock.calls[0][1]

    expect(saveContent.indexOf('duper.jpg')).not.toEqual(-1)
    expect(saveContent.indexOf('test.png')).not.toEqual(-1)
    expect(saveContent.indexOf('no_ext')).toEqual(-1)
    expect(saveContent.indexOf('bad.ext')).toEqual(-1)
  })

  it('Should return the relative path to the assets directory', () => {
    const assetsPath = buildAssets(config, basePath, tapPath)

    expect(assetsPath).toEqual('assets')
  })

})
