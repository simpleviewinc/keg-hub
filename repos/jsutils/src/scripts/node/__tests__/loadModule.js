const loadModule = require('../loadModule')
const testFunc = require('../__mocks__/test_load_func')
const path = require('path')

describe('loadModule', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should accept a string as the first argument', () => {
    const packageConfig = loadModule('../../../../package.json')
    
    expect(typeof packageConfig).toBe('object')
    expect(packageConfig.name).toBe('jsutils')
  })

  it('should accept an array as the first argument', () => {
    const packageConfig = loadModule(['../../../../package.json'])
    
    expect(typeof packageConfig).toBe('object')
    expect(packageConfig.name).toBe('jsutils')
  })

  it('should load the first found module in the array', () => {
    const packageConfig = loadModule([
      // Bad Path
      '../../package.json',
      // Bad Path
      '../../../package.json',
      // Good Path
      '../../../../package.json',
    ])
    
    expect(typeof packageConfig).toBe('object')
    expect(packageConfig.name).toBe('jsutils')

    const loadedModule = loadModule([
      // Bad Path
      '../../../package.json',
      // Good Path
      '../__mocks__/test_load_json.json',
      // Good Path - Should not be loaded
      '../../../../package.json',
    ])
    
    // Should not load the package.json
    expect(typeof loadedModule).toBe('object')
    expect(loadedModule.name).toBe(undefined)
    
    // Should load the test helper json
    expect(loadedModule.TEST_HELPER).not.toBe(undefined)
    expect(typeof loadedModule.TEST_HELPER).toBe('string')

  })

  it('should load a function, and call it with passed in params', () => {
    const arrObj = [ "array" ]
    const loadedModule = loadModule(
      '../__mocks__/test_load_func',
      {},
      arrObj,
      1,
      'string'
    )

    expect(testFunc).toHaveBeenCalledWith(arrObj, 1, 'string')

  })


  it('should load the module from the passed in rootDir when it exists', () => {
    const rootDir = path.join(__dirname, '../../../../')
    const packageConfig = loadModule('./package.json', { rootDir })
    
    expect(typeof packageConfig).toBe('object')
    expect(packageConfig.name).toBe('jsutils')

  })

})