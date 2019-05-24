const Log = require('../log')

const overRideConsole = type => {
  const overRide = jest.fn
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
    
    beforeEach(() => jest.resetMocks())
    
    it('should set SHOW_LOGS to passed boolean', () => {
      expect(Log.getShowLogs()).toEqual(undefined)
      Log.setLogs(true)

      expect(Log.getShowLogs()).toEqual(true)
    })

  })

  describe('logData', () => {
    
    beforeEach(() => jest.resetMocks())
    
    it('should default log to console.dir', () => {
      const orgDir = overRideConsole('dir')
      Log.logData('I should log to dir')

      expect(console.dir).toHaveBeenCalled()
      resetConsole(orgDir)
    })

    it('should default log to console.dir when last param is not a log method', () => {
      const orgDir = overRideConsole('dir')
      Log.logData('I should log to dir', 'notLogMethod')

      expect(console.dir).toHaveBeenCalled()
      resetConsole(orgDir)
    })

    it('should call console method defined in last param', () => {
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
      const orgErr = overRideConsole('error')
      Log.logData('I should log to error', 'error')
      expect(console.error).toHaveBeenCalledWith(`[ Error ] I should log to error`)
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