import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import { useMemo } from 'react';
import { validateFunctions } from './validateFunctions.js';

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
  return useMemo(function () {
    var areValidFuncs = validateFunctions(handlers);
    var handleChange = function handleChange(event) {
      var value = get(event, 'target.value');
      areValidFuncs.onChange && onChange(event);
      areValidFuncs.onValueChange && onValueChange(value);
      areValidFuncs.onChangeText && onChangeText(value);
    };
    return makeHandlerObject(handleChange, areValidFuncs);
  }, [onChange, onValueChange, onChangeText]);
};

export { useInputHandlers };
//# sourceMappingURL=useInputHandlers.js.map
