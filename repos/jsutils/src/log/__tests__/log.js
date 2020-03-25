const Log = require('../log')

const overRideConsole = type => {
  const overRide = jest.fn()
  const holder = console[type]
  holder.OVR_TYPE = type
  console[type] = overRide

  return holder
}

const resetConsole = holder => {
  holder.OVR_TYPE &&
    (console[holder.OVR_TYPE] = holder)
}

describe('/log', () => {

  describe('setLogs', () => {
    
    beforeEach(() => {
      jest.resetAllMocks()
      Log.resetLogs()
    })
    
    it('should set SHOW_LOGS to passed boolean', () => {
      expect(Log.getShowLogs()).toEqual(undefined)
      Log.setLogs(true)

      expect(Log.getShowLogs()).toEqual(true)
    })

    it('should set the default log method', () => {
      const orgWarn = overRideConsole('warn')
      Log.setLogs(true, 'warn')
      Log.logData('I should log to warn')
      
      expect(console.warn).toHaveBeenCalled()
      
      Log.setLogs(true, 'log')
      resetConsole(orgWarn)
    })

    it('should set PREFIX to the passed in string', () => {
      const orgLog = overRideConsole('log')
      Log.setLogs(true, 'log', '[ TEST ]')
      Log.logData('I should log to log')

      expect(console.log.mock.calls[0][0]).toEqual('[ TEST ] I should log to log')
      Log.setLogs(true, 'log', 'type')
      resetConsole(orgLog)
    })

  })

  describe('resetLogs', () => {

    it('should resetLogs log options', () => {
      Log.resetLogs()
      expect(Log.getShowLogs()).toEqual(undefined)
      Log.setLogs(true)
      expect(Log.getShowLogs()).toEqual(true)
      Log.resetLogs()
      expect(Log.getShowLogs()).toEqual(undefined)
    })

  })

  describe('logData', () => {
    
    beforeEach(() => {
      jest.resetAllMocks()
      Log.resetLogs()
    })
    
    it('should default log to console.log', () => {
      Log.setLogs(true)
      const orgDir = overRideConsole('log')
      Log.logData('I should log')

      expect(console.log).toHaveBeenCalled()
      resetConsole(orgDir)
    })

    it('should default log to console.log when last param is not a log method', () => {
      Log.setLogs(true)
      const orgLog = overRideConsole('log')
      Log.logData('I should log', 'notLogMethod')

      expect(console.log).toHaveBeenCalled()
      resetConsole(orgLog)
    })

    it('should call console method defined in last param', () => {
      Log.setLogs(true)
      const orgErr = overRideConsole('error')
      Log.logData('I should log to error', 'error')

      expect(console.error).toHaveBeenCalled()
      resetConsole(orgErr)

      const orgLog = overRideConsole('log')
      Log.logData('I should log to log', 'log')

      expect(console.log).toHaveBeenCalled()
      resetConsole(orgLog)
    })

    it('should add a prefix of log type to first param', () => {
      Log.setLogs(true)
      const orgErr = overRideConsole('error')
      Log.logData('I should log to error', 'error')
      expect(console.error).toHaveBeenCalledWith(`[ ERROR ] I should log to error`)
      resetConsole(orgErr)
    })

    it('should not log when setLogs is called with false', () => {
      Log.setLogs(false)
      const orgLog = overRideConsole('log')
      Log.logData('I should log to log', 'log')

      expect(console.log).not.toHaveBeenCalled()
      resetConsole(orgLog)
    })

    it('should log when setLogs is called with false and log is error', () => {
      Log.setLogs(false)
      const orgErr = overRideConsole('error')
      Log.logData('I should log to error', 'error')
      expect(console.error).toHaveBeenCalled()
      resetConsole(orgErr)
    })

  })

})