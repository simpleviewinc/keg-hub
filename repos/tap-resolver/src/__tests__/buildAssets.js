const path = require('path')
const { FS } = require('../../mocks')
const appConfig = require('./app.json')

// Helpers to allow calling the setup function in a test env
let isDirectory = false
const isDirMock = jest.fn(() => isDirectory)
const basePath = path.join(__dirname, '../../', './base')
const tapPath = path.join(__dirname, '../../', './taps/test')

// Mock the called functions for testing
jest.setMock('fs', FS)

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

  it('Should write to the assets path set in the appConfig if it is a directory', () => {
    isDirectory = true
    const assetsPath = buildAssets(appConfig, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(FS.readdirSync).toHaveBeenCalledWith(`${tapPath}/assets`)
    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe(path.join(tapPath, './assets/index.js'))
  })

  it('Should write the base assets path when appConfig assets path is NOT a directory', () => {
    isDirectory = false
    const assetsPath = buildAssets(appConfig, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(FS.readdirSync).toHaveBeenCalledWith(`${basePath}/assets`)
    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should use the base assets path when no tap assets path is set in appConfig', () => {
    isDirectory = false
    const confCopy = {
      ...appConfig,
      tapResolver: {
        ...appConfig.tapResolver,
        paths: { ...appConfig.tapResolver.paths, tapAssets: undefined }
      }
    }
    const assetsPath = buildAssets(confCopy, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should only include allowed extensions', () => {

    const assetsPath = buildAssets(appConfig, basePath, tapPath)
    const saveContent = FS.writeFileSync.mock.calls[0][1]

    expect(saveContent.indexOf('duper.jpg')).not.toEqual(-1)
    expect(saveContent.indexOf('test.png')).not.toEqual(-1)
    expect(saveContent.indexOf('no_ext')).toEqual(-1)
    expect(saveContent.indexOf('bad.ext')).toEqual(-1)
  })

  it('Should return the relative path to the assets directory', () => {
    const assetsPath = buildAssets(appConfig, basePath, tapPath)

    expect(assetsPath).toEqual('assets')
  })

})
