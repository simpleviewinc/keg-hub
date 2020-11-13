'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./colors-b60a70f0.js');
require('@keg-hub/re-theme/colors');
require('./buildColorStyles.js');
require('./platformFlatten-19172034.js');
require('./buildTheme.js');
var React = require('react');
var React__default = _interopDefault(React);
var validateFunctions = require('./validateFunctions.js');

var makeHandlerObject = function makeHandlerObject(handler, _ref) {
  var onChange = _ref.onChange,
      onValueChange = _ref.onValueChange,
      onChangeText = _ref.onChangeText;
  return Boolean(onChange || onValueChange || onChangeText) ? {
    onChange: handler
  } : {};
};
var useInputHandlers = function useInputHandlers() {
  var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = handlers.onChange,
      onValueChange = handlers.onValueChange,
      onChangeText = handlers.onChangeText;
  return React.useMemo(function () {
    var areValidFuncs = validateFunctions.validateFunctions(handlers);
    var handleChange = function handleChange(event) {
      var value = jsutils.get(event, 'target.value');
      areValidFuncs.onChange && onChange(event);
      areValidFuncs.onValueChange && onValueChange(value);
      areValidFuncs.onChangeText && onChangeText(value);
    };
    return makeHandlerObject(handleChange, areValidFuncs);
  }, [onChange, onValueChange, onChangeText]);
};

exports.useInputHandlers = useInputHandlers;
//# sourceMappingURL=useInputHandlers.js.map
