'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var validateFunctions = require('./validateFunctions.js');

var makeHandlerObject = function makeHandlerObject(isWeb, handler, _ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick;
  var handlerName = isWeb ? 'onClick' : 'onPress';
  return Boolean(onPress || onClick) ? _rollupPluginBabelHelpers._defineProperty({}, handlerName, handler) : {};
};
var usePressHandlers = function usePressHandlers(isWeb) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onPress = handlers.onPress,
      onClick = handlers.onClick;
  return React.useMemo(function () {
    var validFuncsMap = validateFunctions.validateFunctions(handlers);
    var handler = function handler(event) {
      validFuncsMap.onPress && onPress(event);
      validFuncsMap.onClick && onClick(event);
    };
    return makeHandlerObject(isWeb, handler, validFuncsMap);
  }, [onPress, onClick]);
};

exports.usePressHandlers = usePressHandlers;
//# sourceMappingURL=usePressHandlers.js.map
