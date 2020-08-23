const { testTask1, testTask2, testTask3, testTask4 } = require('../__mocks__/testTasks')
const Ask = require('../__mocks__/ask')
jest.setMock('@svkeg/ask-it', Ask)

const { argsParse } = require('../argsParse')

describe('argsParse', () => {

  afterAll(() => jest.resetAllMocks())

  it('should return an object with the arguments parsed', async () => {

    const parsed = await argsParse({
      args: [ 'foo=test', 'doo=f' ],
      task: testTask1,
    })
    
    expect(parsed.foo).toBe('test')
    expect(parsed.doo).toBe(false)

  })

  it('should not parse value matching the next key as the key', async () => {

    const parsed = await argsParse({
      args: [ '--context', 'tap', '--tap', 'test' ],
      task: testTask2,
    })

    expect(parsed.context).toBe('tap')
    expect(parsed.tap).toBe('test')

    const parsed2 = await argsParse({
      args: [ '-c', 'tap', '-t', 'test' ],
      task: testTask2,
    })

    expect(parsed2.context).toBe('tap')
    expect(parsed2.tap).toBe('test')

  })

  it('should call process.exit when a required argument is not passed', async () => {

    const orgError = console.error
    console.error = jest.fn()

    const orgExit = process.exit
    process.exit = jest.fn()
    
    const parsed = await argsParse({
      args: [ 'foo=test' ],
      task: testTask1,
    })

    expect(process.exit).toHaveBeenCalled()

    console.error = orgError
    process.exit = orgExit

  })

  it('should set the first arg to the first option if no other args are passed', async () => {

    const parsed = await argsParse({
      args: [ 'auto-set' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('auto-set')

  })

  it('should set the default value for an option if no arg is passed', async () => {

    const parsed = await argsParse({
      args: [ 'doo=test' ],
      task: testTask1,
    })

    expect(parsed.foo).toBe('bar')

  })

  it('should not parse non-defined task options', async () => {

    const parsed = await argsParse({
      args: [ 'doo=test', 'not=defined' ],
      task: testTask1,
    })

    expect(parsed.not).toBe(undefined)

  })

  it('should parse args with -- or =', async () => {

    const parsed = await argsParse({
      args: [ 'doo=test', '--foo', 'doot' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('test')
    expect(parsed.foo).toBe('doot')

  })

  it('should not parse single - for full option keys', async () => {

    const parsed = await argsParse({
      args: [ 'doo=test', '-foo', 'doot' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('test')
    expect(parsed.foo).toBe('bar')

  })

  it('should use the first char as the short name of an option key', async () => {

    const parsed = await argsParse({
      args: [ '-d', 'test', '-f', 'doot' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('test')
    expect(parsed.foo).toBe('doot')

  })

  it('should allow using the short name with =', async () => {

    const parsed = await argsParse({
      args: [ 'd=test' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('test')
    expect(parsed.d).toBe(undefined)

  })

  it('should parse quoted string values', async () => {

    const parsed = await argsParse({
      args: [ '-d', "\"I am a long quoted string value\"", '--foo', '\'single quotes\'' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe("I am a long quoted string value")
    expect(parsed.foo).toBe("single quotes")

  })

  it('should parse alias, and set the value to the original option key', async () => {

    const parsed = await argsParse({
      args: [ 'd=test', 'zoo=alias' ],
      task: testTask1,
    })

    expect(parsed.foo).toBe('alias')
    expect(parsed.zoo).toBe(undefined)

  })

  it('should allow passing an env argument always', async () => {

    const parsed = await argsParse({
      args: [ 'd=test', '--env', 'dev' ],
      task: testTask1,
    })

    expect(parsed.env).toBe('development')

  })

  it('should convert the value type when the type field is set', async () => {
    
    const testObj = JSON.stringify({
      test: 'object'
    })
    const testArr = JSON.stringify([ 'foo', 'bar' ])

    const parsed = await argsParse({
      args: [
        `number=5`,
        `num=0`,
        `object=${ testObj }`,
        `--obj`,
        `${ testObj }`,
        `array=${ testArr }`,
        `arr=1,2,3`,
        `--boolean`,
        'true',
        `bool=false`,
        `--quoted`,
        `"Quoted`,
        `string"`
      ],
      task: testTask3,
    })

    expect(parsed.number).toBe(5)
    expect(parsed.num).toBe(0)
    expect(typeof parsed.object).toBe('object')
    expect(parsed.object.test).toBe('object')
    expect(typeof parsed.obj).toBe('object')
    expect(parsed.obj.test).toBe('object')
    expect(Array.isArray(parsed.array)).toBe(true)
    expect(parsed.array[0]).toBe('foo')
    expect(parsed.array[1]).toBe('bar')
    expect(Array.isArray(parsed.arr)).toBe(true)
    expect(parsed.arr[0]).toBe('1')
    expect(parsed.arr[1]).toBe('2')
    expect(parsed.arr[2]).toBe('3')
    expect(parsed.boolean).toBe(true)
    expect(parsed.bool).toBe(false)
    expect(parsed.quoted).toBe('Quoted string')

  })

  it('should call askIt when no value is passed and task.ask is exist', async () => {

    expect(Ask.ask).not.toHaveBeenCalled()
    expect(Ask.buildModel).not.toHaveBeenCalled()

    const parsed = await argsParse({
      args: [ '--context', 'tap' ],
      task: testTask2,
    })

    expect(Ask.ask).toHaveBeenCalled()
    expect(Ask.buildModel).toHaveBeenCalled()

  })

  it('should map the options to the keys when no identifiers are used', async () => {

    const parsed = await argsParse({
      args: [ 'test', 'try', 'duper' ],
      task: testTask1,
    })

    expect(parsed.doo).toBe('test')
    expect(parsed.foo).toBe('try')
    expect(parsed.baz).toBe('duper')
    expect(parsed.env).toBe('development')

  })

  it('should return only the default options when task has no options', async () => {

    const parsed = await argsParse({
      args: [],
      task: testTask4,
    })

    expect(Object.keys(parsed).length).toBe(1)
    expect(Boolean(parsed.env)).toBe(true)

  })

})
