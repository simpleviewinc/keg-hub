"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var loadModule = require('../loadModule');

var testFunc = require('../__mocks__/test_load_func');

var path = require('path');

describe('loadModule', function () {
  beforeEach(function () {
    return jest.resetAllMocks();
  });
  it('should accept a string as the first argument', function () {
    var packageConfig = loadModule('../../../../package.json');
    expect(_typeof(packageConfig)).toBe('object');
    expect(packageConfig.name).toBe('jsutils');
  });
  it('should accept an array as the first argument', function () {
    var packageConfig = loadModule(['../../../../package.json']);
    expect(_typeof(packageConfig)).toBe('object');
    expect(packageConfig.name).toBe('jsutils');
  });
  it('should load the first found module in the array', function () {
    var packageConfig = loadModule([// Bad Path
    '../../package.json', // Bad Path
    '../../../package.json', // Good Path
    '../../../../package.json']);
    expect(_typeof(packageConfig)).toBe('object');
    expect(packageConfig.name).toBe('jsutils');
    var loadedModule = loadModule([// Bad Path
    '../../../package.json', // Good Path
    '../__mocks__/test_load_json.json', // Good Path - Should not be loaded
    '../../../../package.json']); // Should not load the package.json

    expect(_typeof(loadedModule)).toBe('object');
    expect(loadedModule.name).toBe(undefined); // Should load the test helper json

    expect(loadedModule.TEST_HELPER).not.toBe(undefined);
    expect(_typeof(loadedModule.TEST_HELPER)).toBe('string');
  });
  it('should load a function, and call it with passed in params', function () {
    var arrObj = ["array"];
    var loadedModule = loadModule('../__mocks__/test_load_func', {}, arrObj, 1, 'string');
    expect(testFunc).toHaveBeenCalledWith(arrObj, 1, 'string');
  });
  it('should load the module from the passed in rootDir when it exists', function () {
    var rootDir = path.join(__dirname, '../../../../');
    var packageConfig = loadModule('./package.json', {
      rootDir: rootDir
    });
    expect(_typeof(packageConfig)).toBe('object');
    expect(packageConfig.name).toBe('jsutils');
  });
});