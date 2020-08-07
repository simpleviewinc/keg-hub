const { argsParse } = require('../argsParse')
const { testTask1 } = require('../__mocks__/testTasks')

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
      args: [ '-d', "\"I am a long quoted string value\"" ],
      task: testTask1,
    })

    expect(parsed.doo).toBe("\"I am a long quoted string value\"")

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

})
