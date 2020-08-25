'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var jsutils = require('@svkeg/jsutils');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var RNDimensions;
var checkDimensions = function checkDimensions(callBack) {
  return function () {
    return RNDimensions ? callBack.apply(void 0, arguments) : console.error("[ ReTheme ERROR ] - Missing Dimensions", "\n   - You must initialize 'Dimensions' before using the 'ReThemeProvider'", "\n   - Do this by calling 'setRNDimensions(Dimensions)'", "\n   - The first argument must be the 'Dimensions' export of 'react-native'", "\n   - Or an Object with a matching API");
  };
};
var setRNDimensions = function setRNDimensions(dims) {
  return RNDimensions = dims;
};
var Dimensions = {
  get: checkDimensions(function () {
    var _RNDimensions;
    return RNDimensions ? (_RNDimensions = RNDimensions).get.apply(_RNDimensions, arguments) : {
      width: 0,
      height: 0
    };
  }),
  set: checkDimensions(function () {
    var _RNDimensions2;
    RNDimensions && (_RNDimensions2 = RNDimensions).set.apply(_RNDimensions2, arguments);
  }),
  update: checkDimensions(function () {
    var _RNDimensions3;
    RNDimensions && (_RNDimensions3 = RNDimensions).update.apply(_RNDimensions3, arguments);
  }),
  addEventListener: checkDimensions(function () {
    var _RNDimensions4;
    RNDimensions && (_RNDimensions4 = RNDimensions).addEventListener.apply(_RNDimensions4, arguments);
  }),
  removeEventListener: checkDimensions(function () {
    var _RNDimensions5;
    RNDimensions && (_RNDimensions5 = RNDimensions).removeEventListener.apply(_RNDimensions5, arguments);
  })
};

var listeners = {};
var addThemeEvent = function addThemeEvent(event, listener) {
  if (!event || !jsutils.isFunc(listener)) return;
  listeners[event] = listeners[event] || [];
  listeners[event].push(listener);
  return listeners[event].length - 1;
};
var removeThemeEvent = function removeThemeEvent(event, removeListener) {
  if (!event || !listeners[event] || !removeListener && removeListener !== 0) return;
  jsutils.isNum(removeListener) ?
  listeners[event].splice(removeListener, 1) :
  jsutils.isFunc(removeListener) && jsutils.isArr(listeners[event]) && (listeners[event] = listeners[event].filter(function (listener) {
    return listener !== removeListener;
  }));
};
var fireThemeEvent = function fireThemeEvent(event) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  jsutils.isArr(listeners[event]) && listeners[event].forEach(function (listener) {
    return listener.apply(void 0, params);
  });
};

var Constants = jsutils.deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize',
  ADD_EVENT: 'addEventListener',
  REMOVE_EVENT: 'removeEventListener',
  NO_CACHE: '__$$RE_NO_CACHE__',
  PLATFORM: {
    NATIVE: '$native',
    WEB: '$web',
    ALL: '$all'
  },
  CSS_UNITS: ['%', 'cm', 'ch', 'em', 'rem', 'ex', 'in', 'mm', 'pc', 'pt', 'px', 'vw', 'vh', 'vmin', 'vmax']
});

var sizeMap = {
  entries: [['$xsmall', 1], ['$small', 320], ['$medium', 768], ['$large', 1024], ['$xlarge', 1366]],
  hash: {},
  indexes: {}
};
var buildSizeMapParts = function buildSizeMapParts() {
  sizeMap.indexes = sizeMap.entries.reduce(function (indexes, entry, index) {
    indexes[entry[0]] = index;
    indexes[index] = entry[0];
    sizeMap.hash[entry[0]] = entry[1];
    return indexes;
  }, {});
};
var setSizes = function setSizes(dims) {
  if (!jsutils.isObj(dims)) return jsutils.logData("setDimensions method requires an argument of type 'Object'.\nReceived: ", dims, 'error');
  jsutils.mapObj(dims, function (key, value) {
    var keyIndex = sizeMap.indexes[key];
    if (!jsutils.softFalsy(keyIndex)) return jsutils.logData("Invalid ".concat(key, " for theme size! Allowed keys are xsmall | small | medium | large | xlarge"), 'warn');
    var newSize = jsutils.toNum(dims[key]);
    if (!newSize || !sizeMap.entries[keyIndex]) return jsutils.logData("Invalid size entry. Size must be a number and the size entry must exist!", "Size: ".concat(newSize), "Entry: ".concat(sizeMap.entries[keyIndex]), 'warn');
    sizeMap.entries[keyIndex] = [key, newSize];
  });
  buildSizeMapParts();
  return sizeMap;
};
var getSize = function getSize(width) {
  var checkWidth = jsutils.isNum(width) && width || jsutils.toNum(width);
  var name = sizeMap.entries.reduce(function (updateSize, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
    checkWidth >= value ?
    updateSize ?
    value > sizeMap.hash[updateSize] && (updateSize = key) :
    updateSize = key : null;
    return updateSize;
  }, '$xsmall');
  return [name, sizeMap.hash[name]];
};
var getMergeSizes = function getMergeSizes(key) {
  return sizeMap.entries.slice(0, sizeMap.indexes[key] + 1).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        name = _ref4[0],
        size = _ref4[1];
    return name;
  });
};
buildSizeMapParts();
var getSizeMap = function getSizeMap() {
  return sizeMap;
};

var useDimensions = function useDimensions() {
  var _useState = React.useState(Dimensions.get('window')),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    var width = win.width,
        height = win.height,
        scale = win.scale,
        fontScale = win.fontScale;
    setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  React.useEffect(function () {
    Dimensions.addEventListener('change', onChange);
    return function () {
      onChange.shouldUnmount = true;
      return Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  return dimensions;
};

var webDefPlatform = {
  OS: 'web',
  select: function select(obj) {
    return jsutils.isObj(obj) && obj.web;
  },
  Version: 'ReTheme'
};
var RNPlatform;
var getRNPlatform = function getRNPlatform() {
  return RNPlatform || webDefPlatform;
};
var setRNPlatform = function setRNPlatform(Plat) {
  RNPlatform = Plat;
};

var getDefaultPlatforms = function getDefaultPlatforms() {
  var Platform = getRNPlatform();
  var stylePlatforms = ['$' + jsutils.get(Platform, 'OS')];
  if (jsutils.get(Platform, 'OS') !== 'web') stylePlatforms.push('$native');
  return stylePlatforms.concat([Constants.PLATFORM.ALL]);
};
var buildPlatforms = function buildPlatforms(usrPlatforms) {
  var platsToUse = Object.keys(usrPlatforms).filter(function (key) {
    return usrPlatforms[key];
  });
  return getDefaultPlatforms().reduce(function (platforms, plat) {
    usrPlatforms[plat] !== false && platforms.indexOf(plat) === -1 && platforms.unshift(plat);
    return platforms;
  }, platsToUse);
};
var buildSizedThemes = function buildSizedThemes(theme, sizedTheme, size) {
  return jsutils.reduceObj(theme, function (name, value, sizedTheme) {
    if (!jsutils.isObj(value)) return sizedTheme;
    if (name === size) {
      var mergedSize = jsutils.deepMerge(sizedTheme, value);
      jsutils.unset(theme, [size]);
      return mergedSize;
    }
    var subSized = buildSizedThemes(value, sizedTheme[name] || {}, size);
    if (!jsutils.isEmpty(subSized)) sizedTheme[name] = subSized;
    return sizedTheme;
  }, sizedTheme);
};
var mergePlatformOS = function mergePlatformOS(theme, platforms) {
  var toMerge = platforms.reduce(function (toMerge, plat) {
    theme[plat] && toMerge.push(theme[plat]);
    return toMerge;
  }, []);
  return toMerge.length ? jsutils.deepMerge.apply(void 0, [{}].concat(_toConsumableArray(toMerge))) : theme;
};
var getPlatformTheme = function getPlatformTheme(theme, platforms) {
  if (!theme) return theme;
  return jsutils.reduceObj(theme, function (key, value, platformTheme) {
    platformTheme[key] = jsutils.isObj(value) ? getPlatformTheme(mergePlatformOS(value, platforms), platforms) : value;
    return platformTheme;
  }, theme);
};
var restructureTheme = function restructureTheme(theme) {
  var usrPlatform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(getSizeMap().hash).reduce(function (updatedTheme, size) {
    var builtSize = buildSizedThemes(theme, theme[size] || {}, size);
    if (!jsutils.isEmpty(builtSize)) updatedTheme[size] = builtSize;
    return updatedTheme;
  }, getPlatformTheme(theme, buildPlatforms(usrPlatform)));
};

var currentTheme = {};
var getCurrentTheme = function getCurrentTheme() {
  return currentTheme;
};
var updateCurrentTheme = function updateCurrentTheme(updatedTheme) {
  return currentTheme = updatedTheme;
};

var getTheme = function getTheme() {
  var theme = getCurrentTheme();
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }
  return jsutils.deepMerge.apply(void 0, _toConsumableArray(sources.reduce(function (toMerge, source) {
    var styles = jsutils.isObj(source) ? source : jsutils.isStr(source) || jsutils.isArr(source) ? jsutils.get(theme, source) : null;
    styles && toMerge.push(styles);
    return toMerge;
  }, [])));
};

var hasManyFromTheme = function hasManyFromTheme(arg1, arg2) {
  return jsutils.isObj(arg1) && jsutils.isObj(arg1.RTMeta);
};
var joinTheme = function joinTheme(arg1, arg2) {
  for (var _len = arguments.length, sources = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    sources[_key - 2] = arguments[_key];
  }
  return hasManyFromTheme(arg1) ? getTheme.apply(void 0, _toConsumableArray(!jsutils.isArr(arg2) ? arg2 : arg2.map(function (arg) {
    return jsutils.isObj(arg) && arg || arg && jsutils.get(arg1, arg);
  })).concat(sources)) : getTheme.apply(void 0, [arg1, arg2].concat(sources));
};

var joinThemeSizes = function joinThemeSizes(theme, sizeKey) {
  var extraTheme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var sizesToMerge = getMergeSizes(sizeKey);
  return jsutils.deepMerge.apply(void 0, [
  extraTheme].concat(_toConsumableArray(sizesToMerge.reduce(function (themes, key) {
    theme[key] && themes.push(theme[key]);
    return themes;
  }, []))));
};
var mergeWithDefault = function mergeWithDefault(theme, defaultTheme, usrPlatform) {
  var mergedTheme = defaultTheme && theme !== defaultTheme ? jsutils.deepMerge(defaultTheme, theme) : jsutils.deepMerge({}, theme);
  return restructureTheme(mergedTheme, usrPlatform);
};
var buildTheme = function buildTheme(theme, width, height, defaultTheme, usrPlatform) {
  if (!jsutils.isObj(theme)) return theme;
  if (!jsutils.isObj(usrPlatform)) usrPlatform = {};
  var _getSize = getSize(width),
      _getSize2 = _slicedToArray(_getSize, 2),
      key = _getSize2[0],
      size = _getSize2[1];
  var mergedTheme = mergeWithDefault(theme, defaultTheme, usrPlatform);
  var $xsmall = mergedTheme.$xsmall,
      $small = mergedTheme.$small,
      $medium = mergedTheme.$medium,
      $large = mergedTheme.$large,
      $xlarge = mergedTheme.$xlarge,
      extraTheme = _objectWithoutProperties(mergedTheme, ["$xsmall", "$small", "$medium", "$large", "$xlarge"]);
  var builtTheme = size ? joinThemeSizes(mergedTheme, key, extraTheme) : extraTheme;
  builtTheme.RTMeta = {
    key: key,
    size: size,
    width: width,
    height: height
  };
  builtTheme.get = getTheme;
  builtTheme.join = joinTheme;
  updateCurrentTheme(builtTheme);
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme);
  return builtTheme;
};

var defaultTheme = {};
var setDefaultTheme = function setDefaultTheme(theme) {
  var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!jsutils.isObj(theme)) return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ", theme);
  defaultTheme = merge ? jsutils.deepMerge(defaultTheme, theme) : theme;
  var dims = Dimensions.get('window');
  var useTheme = buildTheme(defaultTheme, dims.width, dims.height);
  return useTheme;
};
var getDefaultTheme = function getDefaultTheme() {
  return defaultTheme;
};

var ReThemeContext = React__default.createContext(getDefaultTheme());

var withTheme = function withTheme(Component) {
  return function (props) {
    return React__default.createElement(ReThemeContext.Consumer, null, function (value) {
      return React__default.createElement(Component, _extends({
        theme: value
      }, props));
    });
  };
};

var ReThemeProvider = function ReThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      doMerge = props.merge,
      platforms = props.platforms,
      logRenders = props.logRenders;
  var merge = Boolean(doMerge || !doMerge && doMerge !== false) || false;
  var _useState = React.useState(Dimensions.get('window')),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    var width = win.width,
        height = win.height,
        scale = win.scale,
        fontScale = win.fontScale;
    var changeToSize = getSize(width);
    if (!changeToSize) return;
    var sizeToBe = changeToSize[0];
    var currentTheme = getCurrentTheme();
    var currentSize = jsutils.get(currentTheme, ['RTMeta', 'key']);
    sizeToBe !== currentSize && setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  React.useEffect(function () {
    Dimensions.addEventListener('change', onChange);
    return function () {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  logRenders && console.log("---------- RE-THEME RE-RENDER ----------");
  return React__default.createElement(ReThemeContext.Provider, {
    value: buildTheme(theme, dimensions.width, dimensions.height, merge && getDefaultTheme(), platforms)
  }, children);
};

var convertToPercent = function convertToPercent(num, percent) {
  return parseInt(num * (100 + percent) / 100);
};
var checkColorMax = function checkColorMax(num) {
  return num < 255 ? num : 255;
};
var convertToColor = function convertToColor(num, percent) {
  var asPercent = convertToPercent(num, percent);
  var withMax = checkColorMax(asPercent);
  var asStr = withMax.toString(16);
  return asStr.length == 1 ? "0".concat(asStr) : asStr;
};
var mapOpacity = function mapOpacity(opacity) {
  for (var amount = 100; amount >= 0; amount -= 5) {
    opacity["_".concat(amount)] = opacity((amount / 100).toFixed(2));
  }
  return opacity;
};
var hexToRgba = function hexToRgba(hex, opacity, asObj) {
  if (!hex) return console.warn('Can not convert hex to rgba', hex) || "rgba(255,255,255,0)";
  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex;
  opacity = opacity > 1 ? (opacity / 100).toFixed(4) : opacity;
  var rgbaObj = {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity
  };
  return asObj ? rgbaObj : toRgb(rgbaObj);
};
var opacity = mapOpacity(function (amount, color) {
  return jsutils.isStr(color) && color.indexOf('#') === 0 ? hexToRgba(color, amount) : jsutils.isObj(color) ? toRgb(color, amount) : "rgba(".concat(color || '0,0,0', ", ").concat(amount, ")");
});
var shadeHex = function shadeHex(color, percent) {
  var rgba = hexToRgba(color, 1, true);
  return '#' + convertToColor(rgba.r, percent) + convertToColor(rgba.g, percent) + convertToColor(rgba.b, percent);
};
var toRgb = function toRgb(red, green, blue, alpha) {
  var obj = jsutils.isObj(red) ? red : {
    r: red,
    g: green,
    b: blue,
    a: alpha
  };
  obj.a = !obj.a && obj.a !== 0 ? 1 : obj.a;
  return "rgba(".concat(obj.r, ", ").concat(obj.g, ", ").concat(obj.b, ", ").concat(obj.a, ")");
};
var transition = function transition() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var timingFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
  return typeof props === 'string' ? "".concat(props, " ").concat(speed, "ms ").concat(timingFunc) : jsutils.isArr(props) ? props.reduce(function (trans, prop) {
    trans.push("".concat(prop, " ").concat(speed, "ms ").concat(timingFunc));
    return trans;
  }, []).join(', ') : null;
};

var colors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hexToRgba: hexToRgba,
  opacity: opacity,
  shadeHex: shadeHex,
  toRgb: toRgb,
  transition: transition
});

var helpers = {
  colors: colors
};

var useTheme = function useTheme() {
  return React.useContext(ReThemeContext);
};

var useStylesCallback = function useStylesCallback(stylesCb, cbDependencies, customStyles) {
  var cb = React.useCallback(stylesCb, cbDependencies || []);
  var styles = !customStyles || !jsutils.isObj(customStyles) || jsutils.isEmptyColl(customStyles) ? false : customStyles;
  var theme = useTheme();
  return React.useMemo(function () {
    return jsutils.checkCall(cb, theme, styles) || {};
  }, [theme, cb, styles]);
};

var checkEqual = function checkEqual(obj1, obj2) {
  return obj1 === obj2 || jsutils.jsonEqual(obj1, obj2);
};
var nativeThemeHook = function nativeThemeHook(offValue, onValue, options) {
  var hookRef = jsutils.get(options, 'ref', React.useRef());
  var _useState = React.useState(offValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];
  React.useLayoutEffect(function () {
    !checkEqual(offValue, value) && setValue(value);
  }, [offValue, onValue]);
  return [hookRef, offValue, setValue];
};

exports.ReThemeContext = ReThemeContext;
exports.ReThemeProvider = ReThemeProvider;
exports.addThemeEvent = addThemeEvent;
exports.fireThemeEvent = fireThemeEvent;
exports.getDefaultTheme = getDefaultTheme;
exports.getMergeSizes = getMergeSizes;
exports.getSize = getSize;
exports.getSizeMap = getSizeMap;
exports.helpers = helpers;
exports.removeThemeEvent = removeThemeEvent;
exports.setDefaultTheme = setDefaultTheme;
exports.setRNDimensions = setRNDimensions;
exports.setRNPlatform = setRNPlatform;
exports.setSizes = setSizes;
exports.useDimensions = useDimensions;
exports.useStylesCallback = useStylesCallback;
exports.useTheme = useTheme;
exports.useThemeActive = nativeThemeHook;
exports.useThemeFocus = nativeThemeHook;
exports.useThemeHover = nativeThemeHook;
exports.withTheme = withTheme;
//# sourceMappingURL=reTheme.native.js.map
