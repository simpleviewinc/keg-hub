import { a as _defineProperty } from './_rollupPluginBabelHelpers-b6f65682.js';
import { useMemo } from 'react';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { validateFunctions } from './validateFunctions.js';

var makeHandlerObject = function makeHandlerObject(isWeb, handler, _ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick;
  var handlerName = isWeb ? 'onClick' : 'onPress';
  return Boolean(onPress || onClick) ? _defineProperty({}, handlerName, handler) : {};
};
var usePressHandlers = function usePressHandlers(isWeb) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onPress = handlers.onPress,
      onClick = handlers.onClick;
  return useMemo(function () {
    var validFuncsMap = validateFunctions(handlers);
    var handler = function handler(event) {
      validFuncsMap.onPress && onPress(event);
      validFuncsMap.onClick && onClick(event);
    };
    return makeHandlerObject(isWeb, handler, validFuncsMap);
  }, [onPress, onClick]);
};

export { usePressHandlers };
//# sourceMappingURL=usePressHandlers.js.map
