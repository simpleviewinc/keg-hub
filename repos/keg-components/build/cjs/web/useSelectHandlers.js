'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
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
