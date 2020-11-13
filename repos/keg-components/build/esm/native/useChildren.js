import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { reduceObj } from '@keg-hub/jsutils';
import { useMemo } from 'react';

var useChildren = function useChildren(defaults, overrides) {
  return useMemo(function () {
    return reduceObj(defaults, function (key, value, children) {
      children[key] = overrides[key] || value;
    }, {});
  }, [].concat(_toConsumableArray(Object.values(defaults.values)), _toConsumableArray(Object.values(overrides))));
};

export { useChildren };
//# sourceMappingURL=useChildren.js.map
