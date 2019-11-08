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

var addListener = function addListener(element, event, method, options) {
  element && jsutils.checkCall(element.addEventListener, event, method, options || false);
};

var hasDomAccess = function hasDomAccess() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

var getWindow = function getWindow() {
  var winAccess = !hasDomAccess();
  return winAccess ? {
    devicePixelRatio: undefined,
    innerHeight: undefined,
    innerWidth: undefined,
    screen: {
      height: undefined,
      width: undefined
    }
  } : function () {
    return window;
  }();
};

var Constants = jsutils.deepFreeze({
  BUILD_EVENT: 'build',
  CHANGE_EVENT: 'change',
  RESIZE_EVENT: 'resize'
});

var DEBOUNCE_RATE = 100;
var domAccess = hasDomAccess();
var winDim = getWindow();
var setScreen = function setScreen(win) {
  return {
    fontScale: 1,
    height: win.screen.height,
    scale: win.devicePixelRatio || 1,
    width: win.screen.width
  };
};
var setWin = function setWin(win) {
  return {
    fontScale: 1,
    height: win.innerHeight,
    scale: win.devicePixelRatio || 1,
    width: win.innerWidth
  };
};
var dimensions = {
  window: setWin(winDim),
  screen: setScreen(winDim)
};
var listeners = {};
var get = function get(dimension) {
  return dimensions[dimension];
};
var set = function set(_ref) {
  var screen = _ref.screen,
      win = _ref.window;
  if (screen) dimensions.screen = screen;
  if (win) dimensions.window = win;
};
var update = function update() {
  dimensions.window = setWin(winDim);
  dimensions.screen = setScreen(winDim);
  jsutils.isArr(listeners[Constants.CHANGE_EVENT]) && listeners[Constants.CHANGE_EVENT].forEach(function (listener) {
    return listener(dimensions);
  });
};
var addEventListener = function addEventListener(type, listener) {
  if (!type || !jsutils.isFunc(listener)) return;
  listeners[type] = listeners[type] || [];
  listeners[type].push(listener);
};
var removeEventListener = function removeEventListener(type, removeListener) {
  type && jsutils.isFunc(removeListener) && jsutils.isArr(listeners[type]) && (listeners[type] = listeners[type].filter(function (listener) {
    return listener !== removeListener;
  }));
};
domAccess && addListener(window, Constants.RESIZE_EVENT, jsutils.debounce(update, DEBOUNCE_RATE));
var Dimensions = {
  get: get,
  set: set,
  update: update,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};

var listeners$1 = {};
var addThemeEvent = function addThemeEvent(event, listener) {
  if (!event || !jsutils.isFunc(listener)) return;
  listeners$1[event] = listeners$1[event] || [];
  listeners$1[event].push(listener);
  return listeners$1[event].length - 1;
};
var removeThemeEvent = function removeThemeEvent(event, removeListener) {
  if (!event || !listeners$1[event] || !removeListener && removeListener !== 0) return;
  isNum(removeListener)
  ? listeners$1[event].splice(removeListener, 1)
  : jsutils.isFunc(removeListener) && jsutils.isArr(listeners$1[event]) && (listeners$1[event] = listeners$1[event].filter(function (listener) {
    return listener !== removeListener;
  }));
};
var fireThemeEvent = function fireThemeEvent(event) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  jsutils.isArr(listeners$1[event]) && listeners$1[event].forEach(function (listener) {
    return listener.apply(void 0, params);
  });
};

var sizeMap = {
  entries: [['xsmall', 1], ['small', 320], ['medium', 768], ['large', 1024], ['xlarge', 1366]],
  hash: {},
  indexes: {},
  keys: []
};
var buildSizeMapParts = function buildSizeMapParts() {
  sizeMap.indexes = sizeMap.entries.reduce(function (indexes, entry, index) {
    indexes[entry[0]] = index;
    indexes[index] = entry[0];
    sizeMap.hash[entry[0]] = entry[1];
    sizeMap.keys.push(entry[0]);
    return indexes;
  }, {});
};
var setSizes = function setSizes(dims) {
  if (!jsutils.isObj(dims)) return console.error("setDimensions method requires an argument of type 'Object'.\nReceived: ", dims);
  jsutils.mapObj(dims, function (key, value) {
    var keyIndex = sizeMap.indexes[key];
    var newSize = jsutils.toNum(dims[key]);
    if (!keyIndex || !newSize || !sizeMap.entries[keyIndex]) return;
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
    if (checkWidth <= value) return updateSize;
    value <= checkWidth
    ? updateSize
    ? value > sizeMap.hash[updateSize] && (updateSize = key)
    : updateSize = key
    : null;
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

var dims = Dimensions.get("window");
var useDimensions = function useDimensions() {
  var _useState = React.useState(dims),
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

var mergeWithDefault = function mergeWithDefault(theme, defaultTheme) {
  return defaultTheme && theme !== defaultTheme ? jsutils.deepMerge(defaultTheme, theme) : theme;
};
var joinThemeSizes = function joinThemeSizes(theme, sizeKey) {
  var extraTheme = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return jsutils.deepMerge.apply(void 0, [
  extraTheme].concat(_toConsumableArray(getMergeSizes(sizeKey).reduce(function (themes, key) {
    theme[key] && themes.push(theme[key]);
    return themes;
  }, []))));
};
var buildTheme = function buildTheme(theme, width, height, defaultTheme) {
  if (!jsutils.isObj(theme)) return theme;
  var _getSize = getSize(width),
      _getSize2 = _slicedToArray(_getSize, 2),
      key = _getSize2[0],
      size = _getSize2[1];
  var _mergeWithDefault = mergeWithDefault(theme, defaultTheme),
      xsmall = _mergeWithDefault.xsmall,
      small = _mergeWithDefault.small,
      medium = _mergeWithDefault.medium,
      large = _mergeWithDefault.large,
      xlarge = _mergeWithDefault.xlarge,
      extraTheme = _objectWithoutProperties(_mergeWithDefault, ["xsmall", "small", "medium", "large", "xlarge"]);
  var builtTheme = size ? joinThemeSizes(theme, key, extraTheme) : extraTheme;
  fireThemeEvent(Constants.BUILD_EVENT, builtTheme);
  builtTheme.RTMeta = {
    key: key,
    size: size,
    width: width,
    height: height
  };
  return builtTheme;
};

var defaultTheme = {};
var dims$1 = Dimensions.get("window");
var setDefaultTheme = function setDefaultTheme(theme) {
  var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!jsutils.isObj(theme)) return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ", theme);
  defaultTheme = merge ? jsutils.deepMerge(defaultTheme, theme) : theme;
  var useTheme = buildTheme(defaultTheme, dims$1.width, dims$1.height);
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

var useTheme = function useTheme() {
  var _useState = React.useState(orgTheme),
      _useState2 = _slicedToArray(_useState, 2),
      theme = _useState2[0],
      setTheme = _useState2[1];
  var onChange = function onChange(_ref) {
    var win = _ref.window;
    buildTheme(theme, win.width, win.height);
    setTheme(theme);
  };
  React.useEffect(function () {
    Dimensions.addEventListener(Constants.CHANGE_EVENT, onChange);
    return function () {
      Dimensions.removeEventListener(Constants.CHANGE_EVENT, onChange);
    };
  }, []);
  return theme;
};

var dims$2 = Dimensions.get("window");
var ReThemeProvider = function ReThemeProvider(props) {
  var children = props.children,
      theme = props.theme,
      doMerge = props.merge;
  var merge = Boolean(doMerge || !doMerge && doMerge !== false) || false;
  var _useState = React.useState(dims$2),
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
  return React__default.createElement(ReThemeContext.Provider, {
    value: buildTheme(theme, dimensions.width, dimensions.height, merge && getDefaultTheme())
  }, children);
};

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
exports.setSizes = setSizes;
exports.useDimensions = useDimensions;
exports.useTheme = useTheme;
exports.withTheme = withTheme;
