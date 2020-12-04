import { b as _slicedToArray, a as _defineProperty, c as _toConsumableArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { validate, isFunc, isObj, flatMap, deepMerge } from '@keg-hub/jsutils';
import { g as getThemeDefaults } from './themeDefaults-ae219f8e.js';
import './getPlatform-95568099.js';
import { platformFlatten } from './platformFlatten.js';

var buildTheme = function buildTheme(themeFn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaults = getThemeDefaults();
  var defaultColorTypes = Object.keys(defaults.colors.types);
  var defaultStateTypes = Object.keys(defaults.states.types);
  var _validate = validate({
    themeFn: themeFn,
    options: options
  }, {
    themeFn: isFunc,
    options: isObj
  }, {
    prefix: '[buildTheme] Invalid theme setup.'
  }),
      _validate2 = _slicedToArray(_validate, 1),
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
  return platformFlatten(deepMerge.apply(void 0, _toConsumableArray(inheritFrom).concat([themeWithTypes])));
};
var pairsOf = function pairsOf(states, colorTypes) {
  return flatMap(states, function (state) {
    return colorTypes.map(function (type) {
      return [state, type];
    });
  });
};
var themeReducer = function themeReducer(themeFn) {
  return function (totalTheme, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        state = _ref2[0],
        colorType = _ref2[1];
    return deepMerge(totalTheme, themeForType(themeFn, state, colorType));
  };
};
var themeForType = function themeForType(themeFn, state, colorType) {
  return _defineProperty({}, colorType, _defineProperty({}, state, themeFn(state, colorType)));
};

export { buildTheme };
//# sourceMappingURL=buildTheme.js.map
