import { a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { isFunc } from '@keg-hub/jsutils';

var getPressHandler = function getPressHandler(isWeb, onClick, onPress) {
  var action = onClick || onPress;
  return isFunc(action) && _defineProperty({}, isWeb ? 'onClick' : 'onPress', onClick || onPress) || {};
};

export { getPressHandler };
//# sourceMappingURL=getPressHandler.js.map
