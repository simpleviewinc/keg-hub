'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');

var useChildren = function useChildren(defaults, overrides) {
  return React.useMemo(function () {
    return jsutils.reduceObj(defaults, function (key, value, children) {
      children[key] = overrides[key] || value;
    }, {});
  }, [].concat(_rollupPluginBabelHelpers._toConsumableArray(Object.values(defaults.values)), _rollupPluginBabelHelpers._toConsumableArray(Object.values(overrides))));
};

exports.useChildren = useChildren;
//# sourceMappingURL=useChildren.js.map
