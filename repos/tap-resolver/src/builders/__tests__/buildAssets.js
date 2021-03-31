const path = require('path')
const { deepMerge } = require('@keg-hub/jsutils')
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
    FS.readdirSync.mockClear()

    global.testMocks.fs = {
      readdirSync: [
        { name: 'test.png', isDirectory: () => false },
        { name: 'duper.jpg', isDirectory: () => false },
        { name: 'no_ext', isDirectory: () => false },
        { name: 'bad.ext', isDirectory: () => false },
      ],
      lstat: { isDirectory: isDirMock },
    }
  })

  it('Should write to the assets path set in the config if it is a directory', () => {
    isDirectory = true
    buildAssets(config, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]
    const assetsRead = FS.readdirSync.mock.calls[0]
    const fontsRead = FS.readdirSync.mock.calls[1]

    expect(assetsRead).toEqual([ `${tapPath}/assets`, { withFileTypes: true }])
    expect(fontsRead).toEqual([
      `${tapPath}/assets/fonts`,
      { withFileTypes: true },
    ])

    expect(FS.writeFileSync).toHaveBeenCalled()
    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should write the base assets path when config assets path is NOT a directory', () => {
    isDirectory = false

    const noAssConfig = deepMerge(config, {
      keg: { tapResolver: { paths: { tapAssets: undefined } } },
    })

    buildAssets(noAssConfig, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]
    const assetsRead = FS.readdirSync.mock.calls[0]
    const fontsRead = FS.readdirSync.mock.calls[1]

    expect(assetsRead).toEqual([ `${basePath}/assets`, { withFileTypes: true }])
    expect(fontsRead).toEqual([
      `${basePath}/assets/fonts`,
      { withFileTypes: true },
    ])
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
          paths: { ...config.keg.tapResolver.paths, tapAssets: undefined },
        },
      },
    }
    buildAssets(confCopy, basePath, tapPath)
    const savePath = FS.writeFileSync.mock.calls[0][0]

    expect(savePath).toBe(path.join(basePath, './assets/index.js'))
  })

  it('Should only include allowed extensions', () => {
    buildAssets(config, basePath, tapPath)
    const saveContent = FS.writeFileSync.mock.calls[0][1]

    expect(saveContent.indexOf('duper.jpg')).not.toEqual(-1)
    expect(saveContent.indexOf('test.png')).not.toEqual(-1)
    expect(saveContent.indexOf('no_ext')).toEqual(-1)
    expect(saveContent.indexOf('bad.ext')).toEqual(-1)
  })

  it('Should return the relative path for the assets and fonts directory', () => {
    const { ASSETS_PATH, FONTS_PATH } = buildAssets(config, basePath, tapPath)

    expect(ASSETS_PATH).toEqual('assets')
    expect(FONTS_PATH).toEqual('assets/fonts')
  })
})
