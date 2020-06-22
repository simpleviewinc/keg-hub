const { parseTemplate } = require('../parseTemplate')
const { yml } = require('../yml')
const { pathExistsSync, readPath } = require('../fileSys')
const { getGlobalConfig } = require('KegUtils/globalConfig/getGlobalConfig')
const path = require('path')
const { get } = require('jsutils')

const testYmlPath = path.join(__dirname, './test.yml')
const testYmlWrite = path.join(__dirname, './writeTest.yml')

const writeToYml = async (file, data) => {
  await removeYmlFile(file)
  return yml.write(file, data)
}

const removeYmlFile = (file) => {
  return pathExistsSync(file) && yml.remove(file)
}

const validateReplace = `cli.paths.cli`
const testYmlData = {
  cli: `{{ ${ validateReplace } }}`,
  bar: { 'sub-content': { more: [ 'item:item' ] } }
}

describe('parseTemplate', () => {

  beforeAll( async () => {
    await writeToYml(testYmlPath, testYmlData)
  })

  afterAll( async () => {
    await removeYmlFile(testYmlPath)
    await removeYmlFile(testYmlWrite)
  })

  beforeEach(() => jest.resetAllMocks())


  it('Should load and parse content from the passed in file path', async done => {

    const globalConfig = getGlobalConfig() || {}
    const parsed = parseTemplate({ filePath: testYmlPath })

    expect(parsed.indexOf(get(globalConfig, validateReplace))).not.toBe(-1)
    done()

  })

  it.only('Should load and parse content from the passed in template', async done => {

    const globalConfig = getGlobalConfig() || {}
    const parsed = parseTemplate({ template: `{{ ${ validateReplace } }}` })

    expect(parsed.indexOf(get(globalConfig, validateReplace))).not.toBe(-1)
    done()

  })


})