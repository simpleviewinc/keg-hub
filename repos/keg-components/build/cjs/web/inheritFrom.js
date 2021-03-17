'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var platformFlatten = require('./platformFlatten.js');
var jsutils = require('@keg-hub/jsutils');
require('./getPlatform-ec53cd5e.js');

var inheritFrom = function inheritFrom() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  return jsutils.deepMerge.apply(void 0, _rollupPluginBabelHelpers._toConsumableArray(styles.map(function (style) {
    return jsutils.isObj(style) ? platformFlatten.platformFlatten(style) : undefined;
  })));
};

exports.inheritFrom = inheritFrom;
//# sourceMappingURL=inheritFrom.js.map
