'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var validateFunctions = function validateFunctions(functionObj) {
  return jsutils.isObj(functionObj) && jsutils.mapEntries(functionObj, function (name, func) {
    return [name, jsutils.isFunc(func)];
  }) || {};
};

exports.validateFunctions = validateFunctions;
//# sourceMappingURL=validateFunctions.js.map
