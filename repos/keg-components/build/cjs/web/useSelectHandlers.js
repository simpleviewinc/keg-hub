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
      onValueChange = _ref.onValueChange;
  return Boolean(onChange || onValueChange) ? {
    onChange: handler
  } : {};
};
var useSelectHandlers = function useSelectHandlers() {
  var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = handlers.onChange,
      onValueChange = handlers.onValueChange;
  return React.useMemo(function () {
    var validFuncMap = validateFunctions.validateFunctions(handlers);
    var onChangeHandler = function onChangeHandler(event) {
      var value = jsutils.get(event, 'target.value');
      validFuncMap.onChange && onChange(event);
      validFuncMap.onValueChange && onValueChange(value);
    };
    return makeHandlerObject(onChangeHandler, validFuncMap);
  }, [onChange, onValueChange]);
};

exports.useSelectHandlers = useSelectHandlers;
//# sourceMappingURL=useSelectHandlers.js.map
