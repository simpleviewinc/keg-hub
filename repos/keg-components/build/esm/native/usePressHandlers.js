import { a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import { useMemo } from 'react';
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
