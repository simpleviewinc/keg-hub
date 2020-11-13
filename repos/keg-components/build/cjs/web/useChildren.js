'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);

var useChildren = function useChildren(defaults, overrides) {
  return React.useMemo(function () {
    return jsutils.reduceObj(defaults, function (key, value, children) {
      children[key] = overrides[key] || value;
    }, {});
  }, [].concat(_rollupPluginBabelHelpers._toConsumableArray(Object.values(defaults.values)), _rollupPluginBabelHelpers._toConsumableArray(Object.values(overrides))));
};

exports.useChildren = useChildren;
//# sourceMappingURL=useChildren.js.map
