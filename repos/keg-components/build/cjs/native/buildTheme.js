'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var defaults$a = require('./defaults-75e5d8bf.js');
var platformFlatten = require('./platformFlatten-3e8e9019.js');

var defaultColorTypes = Object.keys(defaults$a.defaults.colors.types);
var defaultStateTypes = Object.keys(defaults$a.defaults.states.types);
var buildTheme = function buildTheme(themeFn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _validate = jsutils.validate({
    themeFn: themeFn,
    options: options
  }, {
    themeFn: jsutils.isFunc,
    options: jsutils.isObj
  }, {
    prefix: '[buildTheme] Invalid theme setup.'
  }),
      _validate2 = _rollupPluginBabelHelpers._slicedToArray(_validate, 1),
      valid = _validate2[0];
  if (!valid) return;
  var _options$states = options.states,
      states = _options$states === void 0 ? defaultStateTypes : _options$states,
      _options$colorTypes = options.colorTypes,
      colorTypes = _options$colorTypes === void 0 ? defaultColorTypes : _options$colorTypes,
      _options$inheritFrom = options.inheritFrom,
      inheritFrom = _options$inheritFrom === void 0 ? [] : _options$inheritFrom;
  var combinations = pairsOf(states, colorTypes);
  var themeWithTypes = combinations.reduce(themeReducer(themeFn), {});
  return platformFlatten.platformFlatten(jsutils.deepMerge.apply(void 0, _rollupPluginBabelHelpers._toConsumableArray(inheritFrom).concat([themeWithTypes])));
};
var pairsOf = function pairsOf(states, colorTypes) {
  return jsutils.flatMap(states, function (state) {
    return colorTypes.map(function (type) {
      return [state, type];
    });
  });
};
var themeReducer = function themeReducer(themeFn) {
  return function (totalTheme, _ref) {
    var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2),
        state = _ref2[0],
        colorType = _ref2[1];
    return jsutils.deepMerge(totalTheme, themeForType(themeFn, state, colorType));
  };
};
var themeForType = function themeForType(themeFn, state, colorType) {
  return _rollupPluginBabelHelpers._defineProperty({}, colorType, _rollupPluginBabelHelpers._defineProperty({}, state, themeFn(state, colorType)));
};

exports.buildTheme = buildTheme;
//# sourceMappingURL=buildTheme.js.map
