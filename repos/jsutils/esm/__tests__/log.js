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
      Log.reset();
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
      Log.setLogs(true, 'dir');
      resetConsole(orgWarn);
    });
    it('should set PREFIX to the passed in string', function () {
      var orgLog = overRideConsole('log');
      Log.setLogs(true, 'log', '[ TEST ]');
      Log.logData('I should log to log');
      expect(console.log.mock.calls[0][0]).toEqual('[ TEST ] I should log to log');
      Log.setLogs(true, 'dir', 'type');
      resetConsole(orgLog);
    });
  });
  describe('reset', function () {
    it('should reset log options', function () {
      Log.reset();
      expect(Log.getShowLogs()).toEqual(undefined);
      Log.setLogs(true);
      expect(Log.getShowLogs()).toEqual(true);
      Log.reset();
      expect(Log.getShowLogs()).toEqual(undefined);
    });
  });
  describe('logData', function () {
    beforeEach(function () {
      jest.resetAllMocks();
      Log.reset();
    });
    it('should default log to console.dir', function () {
      Log.setLogs(true);
      var orgDir = overRideConsole('dir');
      Log.logData('I should log to dir');
      expect(console.dir).toHaveBeenCalled();
      resetConsole(orgDir);
    });
    it('should default log to console.dir when last param is not a log method', function () {
      Log.setLogs(true);
      var orgDir = overRideConsole('dir');
      Log.logData('I should log to dir', 'notLogMethod');
      expect(console.dir).toHaveBeenCalled();
      resetConsole(orgDir);
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