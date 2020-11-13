import './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import { useMemo } from 'react';
import { validateFunctions } from './validateFunctions.js';

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
  return useMemo(function () {
    var validFuncMap = validateFunctions(handlers);
    var onChangeHandler = function onChangeHandler(event) {
      var value = get(event, 'target.value');
      validFuncMap.onChange && onChange(event);
      validFuncMap.onValueChange && onValueChange(value);
    };
    return makeHandlerObject(onChangeHandler, validFuncMap);
  }, [onChange, onValueChange]);
};

export { useSelectHandlers };
//# sourceMappingURL=useSelectHandlers.js.map
