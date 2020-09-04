const { isObj, isArr, isStr, isNum, isBool } = require('@keg-hub/jsutils')
const cmdArgs = require('../cmdArgs')
const path = require('path')

describe('/asyncCmd', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('cmdArgs.getArgs', () => {

    it('should return an object with cmd, config, and cwd keys', () => {

      const keys = [ 'cmd', 'config', 'cwd' ]
      const resp = cmdArgs.getArgs()

      Object.keys(resp).map(key => expect(keys.indexOf(key)).not.toBe(-1))

    })

    it('should use the second argument as the config when passed in', () => {

      const conf = {}
      const resp = cmdArgs.getArgs('', conf)

      expect(resp.config).toBe(conf)

    })

    it('should return the config always as an object', () => {

      const { config } = cmdArgs.getArgs()
      expect(isObj(config)).toBe(true)

      const { config:conf2 } = cmdArgs.getArgs('', [])

      expect(isArr(conf2)).toBe(false)
      expect(isObj(conf2)).toBe(true)
      
      const { config:conf3 } = cmdArgs.getArgs('', '')

      expect(isStr(conf3)).toBe(false)
      expect(isObj(conf3)).toBe(true)

      const { config:conf4 } = cmdArgs.getArgs('', 1)

      expect(isNum(conf4)).toBe(false)
      expect(isObj(conf4)).toBe(true)

      const { config:conf5 } = cmdArgs.getArgs('', true)

      expect(isBool(conf5)).toBe(false)
      expect(isObj(conf5)).toBe(true)

    })

    it('should the third argument used as the cwd when its a string', () => {

      const cwd = ''
      const resp = cmdArgs.getArgs('', {}, cwd)

      expect(resp.cwd).toBe(cwd)

    })

    it('should the second argument used as the cwd when its a string', () => {

      const cwd = ''
      const resp = cmdArgs.getArgs('', cwd, false)

      expect(resp.cwd).toBe(cwd)

    })

    it('should use the cwd of the second argument when its an object with a cwd key', () => {

      const config = { cwd: 'i am string' }
      const resp = cmdArgs.getArgs('', config)

      expect(resp.cwd).toBe(config.cwd)

    })

  })
  
  describe('cmdArgs.checkExtraArgs', () => {

    it('should return an object with cmd, and args keys', () => {

      const keys = [ 'cmd', 'args' ]
      const resp = cmdArgs.checkExtraArgs('', [])

      Object.keys(resp).map(key => expect(keys.indexOf(key)).not.toBe(-1))

    })

    it('should return only the first word of the first argument as the cmd', () => {

      const resp = cmdArgs.checkExtraArgs('test thing', [])

      expect(resp.cmd).toBe('test')

    })

    it('should return all other word of the first argument in the args array', () => {

      const keys = [ 'thing', 'again' ]
      const resp = cmdArgs.checkExtraArgs('test thing again', [])

      resp.args.map(arg => expect(keys.indexOf(arg)).not.toBe(-1))

    })

    it('should concat the extra args, with the passed in second argument array', () => {

      const keys = [ 'thing', 'again', 'with', 'args' ]
      const resp = cmdArgs.checkExtraArgs('test thing again', [ 'with', 'args' ])

      resp.args.map(arg => expect(keys.indexOf(arg)).not.toBe(-1))

    })

    it('should convert the second argument into an array of words when its a string', () => {

      const keys = [ 'thing', 'again', 'with', 'args' ]
      const resp = cmdArgs.checkExtraArgs('test thing again', 'with args')

      resp.args.map(arg => expect(keys.indexOf(arg)).not.toBe(-1))

    })

    it('should call console.error, if second argument is not a array or string', () => {

      const oldErr = console.error
      console.error = jest.fn()

      const resp = cmdArgs.checkExtraArgs('test thing again', {})

      expect(console.error).toHaveBeenCalled()

      console.error = oldErr

    })

    it('should always return args as an array', () => {

      const oldErr = console.error
      console.error = jest.fn()

      const resp = cmdArgs.checkExtraArgs('test thing again', true)

      expect(isBool(resp.args)).toBe(false)
      expect(isArr(resp.args)).toBe(true)

      const resp2 = cmdArgs.checkExtraArgs('test thing again', {})

      expect(isObj(resp2.args)).toBe(false)
      expect(isArr(resp2.args)).toBe(true)

      const resp3 = cmdArgs.checkExtraArgs('test thing again', 23)

      expect(isNum(resp3.args)).toBe(false)
      expect(isArr(resp3.args)).toBe(true)

      console.error = oldErr

    })

  })

})