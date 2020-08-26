
const throwTaskFailed = jest.fn(() => {})
jest.setMock('KegUtils/error/throwTaskFailed', { throwTaskFailed })

const { yml } = require('../yml')
const { pathExistsSync } = require('../fileSys')

const path = require('path')
const { isArr, isObj, isStr } = require('@svkeg/jsutils')

const testYmlPath = path.join(__dirname, './ymlTest.yml')
const testYmlWrite = path.join(__dirname, './ymlWriteTest.yml')

const writeToYml = async (file, data) => {
  await removeYmlFile(file)
  return yml.write(file, data)
}

const removeYmlFile = (file) => {
  return pathExistsSync(file) && yml.remove(file)
}

const testYmlData = {
  test: [ 'baz', 'foo' ],
  bar: { 'sub-content': { more: [ 'item:item' ] } }
}

describe('Yaml Lib', () => {

  beforeAll( async () => {
    await writeToYml(testYmlPath, testYmlData)
  })

  afterAll( async () => {
    await removeYmlFile(testYmlPath)
    await removeYmlFile(testYmlWrite)
  })

  afterAll(() => jest.resetAllMocks())

  describe('loadYml', () => {

    it('should load a yml file as a JS object', async done => {

      const loaded = await yml.load(testYmlPath)

      expect(isObj(loaded)).toBe(true)
      expect(isArr(loaded.test)).toBe(true)

      done()

    })

    it('should call throwTaskFailed if file can not be found', async () => {

      await yml.load('./foo.yml')

      expect(throwTaskFailed).toHaveBeenCalled()

    })

  })

  describe('writeYml', () => {

    it('should return true when the yml file is written succesfully', async done => {

      const written = await writeToYml(testYmlWrite, { test: 'data', foo: [ 'bar', 'baz' ] })

      expect(written).toBe(true)

      done()

    })

    it('should write a JS object to a yml file', async done => {

      await writeToYml(testYmlWrite, { test: 'data', foo: [ 'bar', 'baz' ] })

      const loaded = await yml.load(testYmlWrite)

      expect(loaded.test).toBe('data')
      expect(isArr(loaded.foo)).toBe(true)
      expect(loaded.foo[0]).toBe('bar')
      expect(loaded.foo[1]).toBe('baz')

      done()

    })

  })

  describe('mergeYml', () => {

    it('should load and merge and return multimple yml files as a JS object', async done => {

      await writeToYml(testYmlWrite, { test: 'data', foo: [ 'bar', 'baz' ] })

      const merged = await yml.merge(testYmlWrite, testYmlPath)
      expect(isObj(merged)).toBe(true)
      expect(isArr(merged.test)).toBe(true)

      expect(merged.test[0]).toBe('baz')
      expect(merged.test[1]).toBe('foo')
      
      expect(merged.foo[0]).toBe('bar')
      expect(merged.foo[1]).toBe('baz')

      expect(merged.bar['sub-content'].more[0]).toBe('item:item')

      done()

    })


    it('should merge files from left to right', async done => {

      await writeToYml(testYmlWrite, { test: 'data', foo: [ 'bar', 'baz' ] })

      const merged = await yml.merge(testYmlPath, testYmlWrite)

      expect(isStr(merged.test)).toBe(true)
      expect(merged.test).toBe('data')

      done()

    })

  })

  describe('removeYml', () => {

    it('should remove a yml file from the file system', async done => {

      await writeToYml(testYmlWrite, { test: 'data', foo: [ 'bar', 'baz' ] })

      expect(pathExistsSync(testYmlWrite)).toBe(true)

      await yml.remove(testYmlWrite)

      expect(pathExistsSync(testYmlWrite)).toBe(false)

      done()

    })

  })

})