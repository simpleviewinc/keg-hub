'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var jsutils = require('jsutils');

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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var RNDimensions;
var setRNDimensions = function setRNDimensions(dims) {
  RNDimensions = dims;
};
var Dimensions = {
  get: function get() {
    var _RNDimensions;
    return RNDimensions ? (_RNDimensions = RNDimensions).get.apply(_RNDimensions, arguments) : {
      width: 0,
      height: 0
    };
  },
  set: function set() {
    var _RNDimensions2;
    RNDimensions && (_RNDimensions2 = RNDimensions).set.apply(_RNDimensions2, arguments);
  },
  update: function update() {
    var _RNDimensions3;
    RNDimensions && (_RNDimensions3 = RNDimensions).update.apply(_RNDimensions3, arguments);
  },
  addEventListener: function addEventListener() {
    var _RNDimensions4;
    RNDimensions && (_RNDimensions4 = RNDimensions).addEventListener.apply(_RNDimensions4, arguments);
  },
  removeEventListener: function removeEventListener() {
    var _RNDimensions5;
    RNDimensions && (_RNDimensions5 = RNDimensions).removeEventListener.apply(_RNDimensions5, arguments);
  }
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
  jsutils.isNum(removeListener)
  ? listeners[event].splice(removeListener, 1)
  : jsutils.isFunc(removeListener) && jsutils.isArr(listeners[event]) && (listeners[event] = listeners[event].filter(function (listener) {
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

var joinCache = {};
addThemeEvent && addThemeEvent(Constants.BUILD_EVENT, function () {
  return clearCache();
});
var hasManyFromTheme = function hasManyFromTheme(arg1, arg2) {
  return jsutils.isObj(arg1) && jsutils.isObj(arg1.RTMeta) && jsutils.isArr(arg2);
};
var clearCache = function clearCache(key) {
  return key ? jsutils.unset(joinCache, [key]) : joinCache = {};
};
var buildCacheObj = function buildCacheObj(arg1, arg2, sources) {
  return hasManyFromTheme(arg1, arg2) ? jsutils.deepMerge.apply(void 0, _toConsumableArray(arg2.map(function (arg) {
    return jsutils.isObj(arg) && arg || arg && jsutils.get(arg1, arg);
  })).concat(_toConsumableArray(sources))) : jsutils.deepMerge.apply(void 0, [arg1, arg2].concat(_toConsumableArray(sources)));
};

var join = function join(arg1, arg2) {
  for (var _len = arguments.length, sources = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    sources[_key - 2] = arguments[_key];
  }
  return buildCacheObj(arg1, arg2, sources);
};

var checkIdForStyle = function checkIdForStyle(theme, id) {
  return jsutils.isStr(id) && jsutils.get(theme, id);
};
var getTheme = function getTheme(id) {
  var _this = this;
  var styleFromId = checkIdForStyle(this, id);
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }
  var sourceStyles = !styleFromId ? sources : [styleFromId].concat(sources);
  var styles = jsutils.deepMerge.apply(void 0, _toConsumableArray(sourceStyles.reduce(function (toMerge, source) {
    var styles = jsutils.isObj(source) ? source : jsutils.isStr(source) ? jsutils.get(_this, source) : null;
    styles && toMerge.push(styles);
    return toMerge;
  }, [])));
  return styles;
};

var sizeMap = {
  entries: [['xsmall', 1], ['small', 320], ['medium', 768], ['large', 1024], ['xlarge', 1366]],
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
    checkWidth >= value
    ? updateSize
    ? value > sizeMap.hash[updateSize] && (updateSize = key)
    : updateSize = key : null;
    return updateSize;
  }, 'xsmall');
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
  var _useState = React.useState(Dimensions.get("window")),
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
    Dimensions.addEventListener("change", onChange);
    return function () {
      return Dimensions.removeEventListener("change", onChange);
    };
  }, []);
  return dimensions;
};

var RNPlatform;
var getRNPlatform = function getRNPlatform() {
  return RNPlatform;
};
var setRNPlatform = function setRNPlatform(Plat) {
  RNPlatform = Plat;
};
var RePlatform = Constants.PLATFORM.NATIVE;

var noUnitRules = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var checkValueUnits = function checkValueUnits(key, value) {
  return noUnitRules[key] || !jsutils.isNum(value) ? value : "".concat(value, "px");
};

var getDefaultPlatforms = function getDefaultPlatforms() {
  var Platform = getRNPlatform();
  return [
  '$' + jsutils.get(Platform, 'OS'),
  RePlatform,
  Constants.PLATFORM.ALL];
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
  var Platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!theme) return theme;
  return jsutils.reduceObj(theme, function (key, value, platformTheme) {
    platformTheme[key] = jsutils.isObj(value) ? getPlatformTheme(mergePlatformOS(value, platforms), platforms, Platform) : Platform && Platform.OS === 'web' ? checkValueUnits(key, value) : value;
    return platformTheme;
  }, theme);
};
var restructureTheme = function restructureTheme(theme) {
  var usrPlatform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var Platform = getRNPlatform();
  return Object.keys(getSizeMap().hash).reduce(function (updatedTheme, size) {
    var builtSize = buildSizedThemes(theme, theme[size] || {}, size);
    if (!jsutils.isEmpty(builtSize)) updatedTheme[size] = builtSize;
    return updatedTheme;
  }, getPlatformTheme(theme, buildPlatforms(usrPlatform), Platform));
};

var joinThemeSizes = function joinThemeSizes(theme, sizeKey) {
  var extraTheme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return jsutils.deepMerge.apply(void 0, [
  extraTheme].concat(_toConsumableArray(getMergeSizes(sizeKey).reduce(function (themes, key) {
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
  var xsmall = mergedTheme.xsmall,
      small = mergedTheme.small,
      medium = mergedTheme.medium,
      large = mergedTheme.large,
      xlarge = mergedTheme.xlarge,
      extraTheme = _objectWithoutProperties(mergedTheme, ["xsmall", "small", "medium", "large", "xlarge"]);
  var builtTheme = size ? joinThemeSizes(theme, key, extraTheme) : extraTheme;
  builtTheme.RTMeta = {
    key: key,
    size: size,
    width: width,
    height: height
  };
  builtTheme.join = builtTheme.join || join;
  builtTheme.get = builtTheme.get || getTheme.bind(builtTheme);
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme);
  return builtTheme;
};

var defaultTheme = {};
var setDefaultTheme = function setDefaultTheme(theme) {
  var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!jsutils.isObj(theme)) return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ", theme);
  defaultTheme = merge ? jsutils.deepMerge(defaultTheme, theme) : theme;
  var dims = Dimensions.get("window");
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

var currentTheme = {};
var updateCurrentTheme = function updateCurrentTheme(updatedTheme) {
  return currentTheme = updatedTheme;
};
var ReThemeProvider = function ReThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      doMerge = props.merge,
      platforms = props.platforms,
      logRenders = props.logRenders;
  var merge = Boolean(doMerge || !doMerge && doMerge !== false) || false;
  var _useState = React.useState(Dimensions.get("window")),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];
  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hasListener = _useState4[0],
      setListener = _useState4[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    var width = win.width,
        height = win.height,
        scale = win.scale,
        fontScale = win.fontScale;
    var changeToSize = getSize(width);
    if (!changeToSize) return;
    var sizeToBe = changeToSize[0];
    var currentSize = jsutils.get(currentTheme, ['RTMeta', 'key']);
    sizeToBe !== currentSize && setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  React.useEffect(function () {
    if (!hasListener) {
      Dimensions.addEventListener("change", onChange);
      addThemeEvent(Constants.BUILD_EVENT, updateCurrentTheme);
      setListener(true);
    }
    return function () {
      Dimensions.removeEventListener("change", onChange);
      removeThemeEvent(Constants.BUILD_EVENT, updateCurrentTheme);
      currentTheme = {};
    };
  }, []);
  logRenders && console.log("---------- RE-THEME RE-RENDER ----------");
  return React__default.createElement(ReThemeContext.Provider, {
    value: buildTheme(theme, dimensions.width, dimensions.height, merge && getDefaultTheme(), platforms)
  }, children);
};

var useTheme = function useTheme() {
  var theme = React.useContext(ReThemeContext);
  theme.get = getTheme.bind(theme);
  return theme;
};

var nativeThemeHook = function nativeThemeHook(offValue, onValue, options) {
  var hookRef = jsutils.get(options, 'ref', React.useRef());
  var _useState = React.useState(offValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];
  return [hookRef, offValue, setValue];
};

exports.Dimensions = Dimensions;
exports.ReThemeContext = ReThemeContext;
exports.ReThemeProvider = ReThemeProvider;
exports.addThemeEvent = addThemeEvent;
exports.fireThemeEvent = fireThemeEvent;
exports.getDefaultTheme = getDefaultTheme;
exports.getMergeSizes = getMergeSizes;
exports.getSize = getSize;
exports.getSizeMap = getSizeMap;
exports.removeThemeEvent = removeThemeEvent;
exports.setDefaultTheme = setDefaultTheme;
exports.setRNDimensions = setRNDimensions;
exports.setRNPlatform = setRNPlatform;
exports.setSizes = setSizes;
exports.useDimensions = useDimensions;
exports.useTheme = useTheme;
exports.useThemeActive = nativeThemeHook;
exports.useThemeFocus = nativeThemeHook;
exports.useThemeHover = nativeThemeHook;
exports.withTheme = withTheme;
