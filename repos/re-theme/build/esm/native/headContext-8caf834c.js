import React__default, { useState, useEffect, useMemo, createContext } from 'react';
import { isFunc, isNum, isArr, deepFreeze, isObj, logData, mapObj, softFalsy, toNum, reduceObj, deepMerge, unset, isEmpty, get, isStr } from '@keg-hub/jsutils';
import { _ as _slicedToArray, b as _objectWithoutProperties, d as _toConsumableArray } from './hasDomAccess-cac52aef.js';

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
  if (!event || !isFunc(listener)) return;
  listeners[event] = listeners[event] || [];
  listeners[event].push(listener);
  return listeners[event].length - 1;
};
var removeThemeEvent = function removeThemeEvent(event, removeListener) {
  if (!event || !listeners[event] || !removeListener && removeListener !== 0) return;
  isNum(removeListener) ?
  listeners[event].splice(removeListener, 1) :
  isFunc(removeListener) && isArr(listeners[event]) && (listeners[event] = listeners[event].filter(function (listener) {
    return listener !== removeListener;
  }));
};
var fireThemeEvent = function fireThemeEvent(event) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  isArr(listeners[event]) && listeners[event].forEach(function (listener) {
    return listener.apply(void 0, params);
  });
};

var Constants = deepFreeze({
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
  if (!isObj(dims)) return logData("setDimensions method requires an argument of type 'Object'.\nReceived: ", dims, 'error');
  mapObj(dims, function (key, value) {
    var keyIndex = sizeMap.indexes[key];
    if (!softFalsy(keyIndex)) return logData("Invalid ".concat(key, " for theme size! Allowed keys are xsmall | small | medium | large | xlarge"), 'warn');
    var newSize = toNum(dims[key]);
    if (!newSize || !sizeMap.entries[keyIndex]) return logData("Invalid size entry. Size must be a number and the size entry must exist!", "Size: ".concat(newSize), "Entry: ".concat(sizeMap.entries[keyIndex]), 'warn');
    sizeMap.entries[keyIndex] = [key, newSize];
  });
  buildSizeMapParts();
  return sizeMap;
};
var getSize = function getSize(width) {
  var checkWidth = isNum(width) && width || toNum(width);
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

var webDefPlatform = {
  OS: 'web',
  select: function select(obj) {
    return isObj(obj) && obj.web;
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
  var stylePlatforms = ['$' + get(Platform, 'OS')];
  if (get(Platform, 'OS') !== 'web') stylePlatforms.push('$native');
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
  return reduceObj(theme, function (name, value, sizedTheme) {
    if (!isObj(value)) return sizedTheme;
    if (name === size) {
      var mergedSize = deepMerge(sizedTheme, value);
      unset(theme, [size]);
      return mergedSize;
    }
    var subSized = buildSizedThemes(value, sizedTheme[name] || {}, size);
    if (!isEmpty(subSized)) sizedTheme[name] = subSized;
    return sizedTheme;
  }, sizedTheme);
};
var mergePlatformOS = function mergePlatformOS(theme, platforms) {
  var toMerge = platforms.reduce(function (toMerge, plat) {
    theme[plat] && toMerge.push(theme[plat]);
    return toMerge;
  }, []);
  return toMerge.length ? deepMerge.apply(void 0, _toConsumableArray(toMerge)) : theme;
};
var updatePlatformTheme = function updatePlatformTheme(platforms, Platform, themeData) {
  if (!isObj(themeData)) return themeData;
  var $class = themeData.$class,
      $className = themeData.$className,
      cleanTheme = _objectWithoutProperties(themeData, ["$class", "$className"]);
  var mergedPlatform = getPlatformTheme(mergePlatformOS(cleanTheme, platforms), platforms, Platform);
  var className = $className || $class;
  className && (mergedPlatform.$class = className);
  return mergedPlatform;
};
var getPlatformTheme = function getPlatformTheme(theme, platforms) {
  var Platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!theme) return theme;
  return reduceObj(theme, function (key, value, platformTheme) {
    platformTheme[key] = updatePlatformTheme(platforms, Platform, value);
    return platformTheme;
  }, theme);
};
var restructureTheme = function restructureTheme(theme) {
  var usrPlatform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var Platform = getRNPlatform();
  return Object.keys(getSizeMap().hash).reduce(function (updatedTheme, size) {
    var builtSize = buildSizedThemes(theme, theme[size] || {}, size);
    if (!isEmpty(builtSize)) updatedTheme[size] = builtSize;
    return updatedTheme;
  }, getPlatformTheme(theme, buildPlatforms(usrPlatform), Platform));
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
  return deepMerge.apply(void 0, _toConsumableArray(sources.reduce(function (toMerge, source) {
    var styles = isObj(source) ? source : isStr(source) || isArr(source) ? get(theme, source) : null;
    styles && toMerge.push(styles);
    return toMerge;
  }, [])));
};

var hasManyFromTheme = function hasManyFromTheme(arg1) {
  return isObj(arg1) && isObj(arg1.RTMeta);
};
var joinTheme = function joinTheme(arg1, arg2) {
  for (var _len = arguments.length, sources = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    sources[_key - 2] = arguments[_key];
  }
  sources = !isArr(arg2) ? [arg2].concat(sources) : [].concat(_toConsumableArray(arg2.map(function (arg) {
    return isObj(arg) && arg || arg && get(arg1, arg);
  })), _toConsumableArray(sources));
  return hasManyFromTheme(arg1) ? getTheme.apply(void 0, _toConsumableArray(sources)) : getTheme.apply(void 0, [arg1].concat(_toConsumableArray(sources)));
};

var joinThemeSizes = function joinThemeSizes(theme, sizeKey) {
  var extraTheme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var sizesToMerge = getMergeSizes(sizeKey);
  return deepMerge.apply(void 0, [
  extraTheme].concat(_toConsumableArray(sizesToMerge.reduce(function (themes, key) {
    theme[key] && themes.push(theme[key]);
    return themes;
  }, []))));
};
var mergeWithDefault = function mergeWithDefault(theme, defaultTheme, usrPlatform) {
  var mergedTheme = defaultTheme && theme !== defaultTheme ? deepMerge(defaultTheme, theme) : deepMerge({}, theme);
  return restructureTheme(mergedTheme, usrPlatform);
};
var buildTheme = function buildTheme(theme, width, height, defaultTheme, usrPlatform) {
  if (!isObj(theme)) return theme;
  if (!isObj(usrPlatform)) usrPlatform = {};
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
  if (!isObj(theme)) return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ", theme);
  defaultTheme = merge ? deepMerge(defaultTheme, theme) : theme;
  var dims = Dimensions.get('window');
  var useTheme = buildTheme(defaultTheme, dims.width, dims.height);
  return useTheme;
};
var getDefaultTheme = function getDefaultTheme() {
  return defaultTheme;
};

var ReThemeContext = React__default.createContext(getDefaultTheme());

var ReThemeProvider = function ReThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      doMerge = props.merge,
      platforms = props.platforms,
      logRenders = props.logRenders;
  var merge = Boolean(doMerge || !doMerge && doMerge !== false) || false;
  var _useState = useState(Dimensions.get('window')),
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
    var currentSize = get(currentTheme, ['RTMeta', 'key']);
    sizeToBe !== currentSize && setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  useEffect(function () {
    Dimensions.addEventListener('change', onChange);
    return function () {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  logRenders && console.log("---------- RE-THEME RE-RENDER ----------");
  var builtTheme = useMemo(function () {
    return buildTheme(theme, dimensions.width, dimensions.height, merge && getDefaultTheme(), platforms);
  }, [theme, dimensions.width, dimensions.height, merge, platforms]);
  return React__default.createElement(ReThemeContext.Provider, {
    value: builtTheme
  }, children);
};

var HeadContext = createContext(null);
var Consumer = HeadContext.Consumer,
    Provider = HeadContext.Provider;

export { Consumer as C, Dimensions as D, HeadContext as H, Provider as P, ReThemeContext as R, setRNPlatform as a, getSize as b, getSizeMap as c, getMergeSizes as d, setSizes as e, addThemeEvent as f, getRNPlatform as g, fireThemeEvent as h, getDefaultTheme as i, setDefaultTheme as j, ReThemeProvider as k, removeThemeEvent as r, setRNDimensions as s };
//# sourceMappingURL=headContext-8caf834c.js.map
