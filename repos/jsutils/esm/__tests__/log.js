"use strict";

var Log = require('../log');

var overRideConsole = function overRideConsole(type) {
  var overRide = jest.fn();
  var holder = console[type];
  holder.OVR_TYPE = type;
  console[type] = overRide;
  return holder;
};

var resetConsole = function resetConsole(holder) {
  holder.OVR_TYPE && (console[holder.OVR_TYPE] = holder);
};

describe('/log', function () {
  describe('setLogs', function () {
    beforeEach(function () {
      jest.resetAllMocks();
      Log.resetLogs();
    });
    it('should set SHOW_LOGS to passed boolean', function () {
      expect(Log.getShowLogs()).toEqual(undefined);
      Log.setLogs(true);
      expect(Log.getShowLogs()).toEqual(true);
    });
    it('should set the default log method', function () {
      var orgWarn = overRideConsole('warn');
      Log.setLogs(true, 'warn');
      Log.logData('I should log to warn');
      expect(console.warn).toHaveBeenCalled();
      Log.setLogs(true, 'log');
      resetConsole(orgWarn);
    });
    it('should set PREFIX to the passed in string', function () {
      var orgLog = overRideConsole('log');
      Log.setLogs(true, 'log', '[ TEST ]');
      Log.logData('I should log to log');
      expect(console.log.mock.calls[0][0]).toEqual('[ TEST ] I should log to log');
      Log.setLogs(true, 'log', 'type');
      resetConsole(orgLog);
    });
  });
  describe('resetLogs', function () {
    it('should resetLogs log options', function () {
      Log.resetLogs();
      expect(Log.getShowLogs()).toEqual(undefined);
      Log.setLogs(true);
      expect(Log.getShowLogs()).toEqual(true);
      Log.resetLogs();
      expect(Log.getShowLogs()).toEqual(undefined);
    });
  });
  describe('logData', function () {
    beforeEach(function () {
      jest.resetAllMocks();
      Log.resetLogs();
    });
    it('should default log to console.log', function () {
      Log.setLogs(true);
      var orgDir = overRideConsole('log');
      Log.logData('I should log');
      expect(console.log).toHaveBeenCalled();
      resetConsole(orgDir);
    });
    it('should default log to console.log when last param is not a log method', function () {
      Log.setLogs(true);
      var orgLog = overRideConsole('log');
      Log.logData('I should log', 'notLogMethod');
      expect(console.log).toHaveBeenCalled();
      resetConsole(orgLog);
    });
    it('should call console method defined in last param', function () {
      Log.setLogs(true);
      var orgErr = overRideConsole('error');
      Log.logData('I should log to error', 'error');
      expect(console.error).toHaveBeenCalled();
      resetConsole(orgErr);
      var orgLog = overRideConsole('log');
      Log.logData('I should log to log', 'log');
      expect(console.log).toHaveBeenCalled();
      resetConsole(orgLog);
    });
    it('should add a prefix of log type to first param', function () {
      Log.setLogs(true);
      var orgErr = overRideConsole('error');
      Log.logData('I should log to error', 'error');
      expect(console.error).toHaveBeenCalledWith("[ ERROR ] I should log to error");
      resetConsole(orgErr);
    });
    it('should not log when setLogs is called with false', function () {
      Log.setLogs(false);
      var orgLog = overRideConsole('log');
      Log.logData('I should log to log', 'log');
      expect(console.log).not.toHaveBeenCalled();
      resetConsole(orgLog);
    });
    it('should log when setLogs is called with false and log is error', function () {
      Log.setLogs(false);
      var orgErr = overRideConsole('error');
      Log.logData('I should log to error', 'error');
      expect(console.error).toHaveBeenCalled();
      resetConsole(orgErr);
    });
  });
});