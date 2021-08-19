import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { platformFlatten } from './platformFlatten.js';
import { deepMerge, isObj } from '@keg-hub/jsutils';
import './getPlatform-95568099.js';

var inheritFrom = function inheritFrom() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  return deepMerge.apply(void 0, _toConsumableArray(styles.map(function (style) {
    return isObj(style) ? platformFlatten(style) : undefined;
  })));
};

export { inheritFrom };
//# sourceMappingURL=inheritFrom.js.map
