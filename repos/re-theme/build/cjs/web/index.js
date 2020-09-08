'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var headContext = require('./headContext-f5c05ebe.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-ab0fb5b1.js');
var React = require('react');
var React__default = _interopDefault(React);
var generateDataSet = require('./generateDataSet-27db500b.js');

var DEBOUNCE_RATE = 100;
var getWindow = function getWindow() {
  var winAccess = !_rollupPluginBabelHelpers.hasDomAccess();
  return winAccess ? {
    devicePixelRatio: undefined,
    innerHeight: undefined,
    innerWidth: undefined,
    width: undefined,
    height: undefined,
    screen: {
      height: undefined,
      width: undefined
    }
  } : function () {
    return window;
  }();
};
var winDim = getWindow();
var addListener = function addListener(element, event, method, options) {
  element && jsutils.checkCall(element.addEventListener, event, method, options || false);
};
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
var get = function get(key) {
  return dimensions[key];
};
var set = function set(_ref) {
  var screen = _ref.screen,
      win = _ref.window;
  screen && (dimensions.screen = screen);
  win && (dimensions.window = win);
};
var update = function update() {
  dimensions.window = setWin(winDim);
  dimensions.screen = setScreen(winDim);
  jsutils.isArr(listeners[headContext.Constants.CHANGE_EVENT]) && listeners[headContext.Constants.CHANGE_EVENT].forEach(function (listener) {
    return !listener.shouldUnmount && listener(dimensions);
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
_rollupPluginBabelHelpers.hasDomAccess() && jsutils.checkCall(function () {
  return addListener(window, headContext.Constants.RESIZE_EVENT, jsutils.debounce(update, DEBOUNCE_RATE));
});
var Dimensions = {
  get: get,
  set: set,
  update: update,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};
headContext.setRNDimensions(Dimensions);

var useDimensions = function useDimensions() {
  var _useState = React.useState(headContext.Dimensions.get('window')),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
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
    headContext.Dimensions.addEventListener('change', onChange);
    return function () {
      onChange.shouldUnmount = true;
      return headContext.Dimensions.removeEventListener('change', onChange);
    };
  }, []);
  return dimensions;
};

var withTheme = function withTheme(Component) {
  return function (props) {
    return React__default.createElement(headContext.ReThemeContext.Consumer, null, function (value) {
      return React__default.createElement(Component, _rollupPluginBabelHelpers._extends({
        theme: value
      }, props));
    });
  };
};

var useTheme = function useTheme() {
  return React.useContext(headContext.ReThemeContext);
};

var cssProperties = {
  noUnits: {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
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
  }
};

var createRules = function createRules(rule) {
  return Object.entries(rule).reduce(function (ruleString, _ref) {
    var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2),
        propName = _ref2[0],
        propValue = _ref2[1];
    var name = propName.replace(/([A-Z])/g, function (matches) {
      return "-".concat(matches[0].toLowerCase());
    });
    var hasUnits = !cssProperties.noUnits[propName];
    var val = hasUnits && jsutils.isNum(propValue) && propValue + 'px' || propValue;
    return "".concat(ruleString, "\n\t").concat(name, ": ").concat(val, ";");
  }, '');
};
var createBlock = function createBlock(selector, rls) {
  var subSelect = [];
  var filteredRls = Object.keys(rls).reduce(function (filtered, key) {
    !jsutils.isObj(rls[key]) ? filtered[key] = rls[key] : subSelect.push(["".concat(selector, " ").concat(key), rls[key]]);
    return filtered;
  }, {});
  var styRls = createRules(filteredRls);
  var block = "".concat(selector, " {").concat(styRls, "\n}\n");
  subSelect.length && subSelect.map(function (subItem) {
    return block += createBlock(subItem[0], subItem[1]);
  });
  return block;
};
var jsToCss = function jsToCss(rules) {
  return Object.entries(rules).reduce(function (styles, _ref3) {
    var _ref4 = _rollupPluginBabelHelpers._slicedToArray(_ref3, 2),
        selector = _ref4[0],
        rls = _ref4[1];
    return styles + createBlock(selector, rls);
  }, '');
};

var __webPlatform;
var checkWebPlatform = function checkWebPlatform(inline) {
  return inline ? false : jsutils.exists(__webPlatform) ? __webPlatform : jsutils.checkCall(function () {
    var platform = headContext.getRNPlatform();
    __webPlatform = _rollupPluginBabelHelpers.hasDomAccess() && platform.OS === 'web' ? true : false;
    return __webPlatform;
  });
};
var useCss = function useCss(styleRef, customStyles) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var rootClass = config.rootClass,
      inline = config.inline,
      selector = config.selector,
      id = config.id;
  var theme = useTheme();
  var head = React.useContext(headContext.HeadContext);
  var themeStyles = React.useMemo(function () {
    return jsutils.isStr(styleRef) ? jsutils.get(theme, styleRef, generateDataSet.noOpObj) : styleRef || generateDataSet.noOpObj;
  }, [styleRef, theme]);
  var custom = !customStyles || !jsutils.isObj(customStyles) || jsutils.isEmptyColl(customStyles) ? generateDataSet.noOpObj : customStyles;
  return React.useMemo(function () {
    var _ref = themeStyles || generateDataSet.noOpObj,
        $class = _ref.$class,
        $className = _ref.$className,
        cssStyle = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["$class", "$className"]);
    var selector = rootClass || $className || $class || id;
    var webContent = checkWebPlatform(inline) && {
      styles: {},
      hash: []
    };
    var _generateDataSet = generateDataSet.generateDataSet(webContent, cssStyle, custom, _rollupPluginBabelHelpers._objectSpread2({
      selector: selector
    }, config)),
        cssProps = _generateDataSet.cssProps,
        web = _generateDataSet.web;
    if (!web) return {
      cssProps: cssProps,
      styleProps: {}
    };
    var hashId = web && jsutils.uniqArr(web.hash).join('-');
    return {
      cssProps: cssProps,
      styleProps: {
        id: hashId,
        children: head.hasHash(hashId) ? '' : jsToCss(web.styles)
      }
    };
  }, [themeStyles, custom, rootClass, inline, selector, id]);
};

var useStylesCallback = function useStylesCallback(stylesCb, cbDependencies, customStyles) {
  var cb = React.useCallback(stylesCb, cbDependencies || []);
  var styles = !customStyles || !jsutils.isObj(customStyles) || jsutils.isEmptyColl(customStyles) ? false : customStyles;
  var theme = useTheme();
  return React.useMemo(function () {
    return jsutils.checkCall.apply(void 0, [cb, theme, styles].concat(_rollupPluginBabelHelpers._toConsumableArray(cbDependencies))) || {};
  }, [theme, cb, styles]);
};

var updateListeners = function updateListeners(element, type, events, methods) {
  if (!jsutils.isObj(element) || !jsutils.isFunc(element[type])) return null;
  element[type](events.on, methods.on);
  element[type](events.off, methods.off);
};
var createCBRef = function createCBRef(hookRef, events, methods, ref) {
  return React.useCallback(function (element) {
    hookRef.current && updateListeners(hookRef.current, headContext.Constants.REMOVE_EVENT, events, methods);
    hookRef.current = element;
    hookRef.current && updateListeners(hookRef.current, headContext.Constants.ADD_EVENT, events, methods);
    !hookRef.current && methods.cleanup();
  }, [methods.on, methods.off]);
};
var createMethods = function createMethods(offValue, onValue, setValue) {
  var cbWatchers = [onValue, offValue];
  return {
    off: React.useCallback(function () {
      return setValue(offValue);
    }, cbWatchers),
    on: React.useCallback(function () {
      return setValue(onValue);
    }, cbWatchers),
    cleanup: function cleanup(methods) {
      if (!methods) return;
      jsutils.isFunc(methods.on) && methods.on(undefined);
      jsutils.isFunc(methods.off) && methods.off(undefined);
      onValue = undefined;
      offValue = undefined;
      setValue = undefined;
      methods = undefined;
    }
  };
};
var getOptions = function getOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return options && !jsutils.isObj(options) ? {} : options;
};
var checkJoinValues = function checkJoinValues(offValue, onValue, valueOn, noMerge) {
  return noMerge || !jsutils.isColl(onValue) || !jsutils.isColl(offValue) ? valueOn : jsutils.deepMerge(offValue, onValue);
};
var hookFactory = function hookFactory(events) {
  return (
    function (offValue, onValue) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _getOptions = getOptions(options),
          ref = _getOptions.ref,
          noMerge = _getOptions.noMerge;
      var hookRef = ref || React.useRef();
      var _useState = React.useState(offValue),
          _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
          value = _useState2[0],
          setValue = _useState2[1];
      var _useState3 = React.useState(onValue),
          _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
          valueOn = _useState4[0],
          setValueOn = _useState4[1];
      var _useState5 = React.useState(checkJoinValues(offValue, valueOn, valueOn, noMerge)),
          _useState6 = _rollupPluginBabelHelpers._slicedToArray(_useState5, 2),
          activeValue = _useState6[0],
          setActiveValue = _useState6[1];
      React.useLayoutEffect(function () {
        if (onValue !== valueOn) {
          setValueOn(onValue);
          setActiveValue(checkJoinValues(offValue, onValue, onValue, noMerge));
        }
      }, [onValue, valueOn, offValue, noMerge]);
      var elementRef = createCBRef(
      hookRef,
      events,
      createMethods(offValue, activeValue, setValue));
      var useValue = value === offValue ?
      value :
      value === activeValue ?
      activeValue : offValue;
      return !jsutils.isFunc(ref) ?
      [elementRef, useValue, setValue] : jsutils.checkCall(function () {
        var wrapRef = function wrapRef(element) {
          ref(element);
          elementRef(element);
        };
        return [wrapRef, useValue, setValue];
      });
    }
  );
};

var useThemeHover = hookFactory({
  on: 'pointerover',
  off: 'pointerout'
});

var useThemeActive = hookFactory({
  on: 'mousedown',
  off: 'mouseup'
});

var useThemeFocus = hookFactory({
  on: 'focus',
  off: 'blur'
});

exports.ReThemeContext = headContext.ReThemeContext;
exports.ReThemeProvider = headContext.ReThemeProvider;
exports.addThemeEvent = headContext.addThemeEvent;
exports.fireThemeEvent = headContext.fireThemeEvent;
exports.getDefaultTheme = headContext.getDefaultTheme;
exports.getMergeSizes = headContext.getMergeSizes;
exports.getSize = headContext.getSize;
exports.getSizeMap = headContext.getSizeMap;
exports.removeThemeEvent = headContext.removeThemeEvent;
exports.setDefaultTheme = headContext.setDefaultTheme;
exports.setRNDimensions = headContext.setRNDimensions;
exports.setRNPlatform = headContext.setRNPlatform;
exports.setSizes = headContext.setSizes;
exports.useCss = useCss;
exports.useDimensions = useDimensions;
exports.useStylesCallback = useStylesCallback;
exports.useTheme = useTheme;
exports.useThemeActive = useThemeActive;
exports.useThemeFocus = useThemeFocus;
exports.useThemeHover = useThemeHover;
exports.withTheme = withTheme;
//# sourceMappingURL=index.js.map
