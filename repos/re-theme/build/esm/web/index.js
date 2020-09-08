import { checkCall, debounce, isArr, isFunc, isObj, isNum, isStr, get as get$1, isEmptyColl, exists, uniqArr, isColl, deepMerge } from '@keg-hub/jsutils';
import { C as Constants, s as setRNDimensions, D as Dimensions$1, R as ReThemeContext, H as HeadContext, g as getRNPlatform } from './headContext-19a2409a.js';
export { R as ReThemeContext, k as ReThemeProvider, f as addThemeEvent, h as fireThemeEvent, i as getDefaultTheme, d as getMergeSizes, b as getSize, c as getSizeMap, r as removeThemeEvent, j as setDefaultTheme, s as setRNDimensions, a as setRNPlatform, e as setSizes } from './headContext-19a2409a.js';
import { h as hasDomAccess, _ as _slicedToArray, a as _extends, b as _objectWithoutProperties, c as _objectSpread2, d as _toConsumableArray } from './_rollupPluginBabelHelpers-8470caf4.js';
import React__default, { useState, useEffect, useContext, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { n as noOpObj, g as generateDataSet } from './generateDataSet-859b383a.js';

var DEBOUNCE_RATE = 100;
var getWindow = function getWindow() {
  var winAccess = !hasDomAccess();
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
  element && checkCall(element.addEventListener, event, method, options || false);
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
  isArr(listeners[Constants.CHANGE_EVENT]) && listeners[Constants.CHANGE_EVENT].forEach(function (listener) {
    return !listener.shouldUnmount && listener(dimensions);
  });
};
var addEventListener = function addEventListener(type, listener) {
  if (!type || !isFunc(listener)) return;
  listeners[type] = listeners[type] || [];
  listeners[type].push(listener);
};
var removeEventListener = function removeEventListener(type, removeListener) {
  type && isFunc(removeListener) && isArr(listeners[type]) && (listeners[type] = listeners[type].filter(function (listener) {
    return listener !== removeListener;
  }));
};
hasDomAccess() && checkCall(function () {
  return addListener(window, Constants.RESIZE_EVENT, debounce(update, DEBOUNCE_RATE));
});
var Dimensions = {
  get: get,
  set: set,
  update: update,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};
setRNDimensions(Dimensions);

var useDimensions = function useDimensions() {
  var _useState = useState(Dimensions$1.get('window')),
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
  useEffect(function () {
    Dimensions$1.addEventListener('change', onChange);
    return function () {
      onChange.shouldUnmount = true;
      return Dimensions$1.removeEventListener('change', onChange);
    };
  }, []);
  return dimensions;
};

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
  return useContext(ReThemeContext);
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
    var _ref2 = _slicedToArray(_ref, 2),
        propName = _ref2[0],
        propValue = _ref2[1];
    var name = propName.replace(/([A-Z])/g, function (matches) {
      return "-".concat(matches[0].toLowerCase());
    });
    var hasUnits = !cssProperties.noUnits[propName];
    var val = hasUnits && isNum(propValue) && propValue + 'px' || propValue;
    return "".concat(ruleString, "\n\t").concat(name, ": ").concat(val, ";");
  }, '');
};
var createBlock = function createBlock(selector, rls) {
  var subSelect = [];
  var filteredRls = Object.keys(rls).reduce(function (filtered, key) {
    !isObj(rls[key]) ? filtered[key] = rls[key] : subSelect.push(["".concat(selector, " ").concat(key), rls[key]]);
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
    var _ref4 = _slicedToArray(_ref3, 2),
        selector = _ref4[0],
        rls = _ref4[1];
    return styles + createBlock(selector, rls);
  }, '');
};

var __webPlatform;
var checkWebPlatform = function checkWebPlatform(inline) {
  return inline ? false : exists(__webPlatform) ? __webPlatform : checkCall(function () {
    var platform = getRNPlatform();
    __webPlatform = hasDomAccess() && platform.OS === 'web' ? true : false;
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
  var head = useContext(HeadContext);
  var themeStyles = useMemo(function () {
    return isStr(styleRef) ? get$1(theme, styleRef, noOpObj) : styleRef || noOpObj;
  }, [styleRef, theme]);
  var custom = !customStyles || !isObj(customStyles) || isEmptyColl(customStyles) ? noOpObj : customStyles;
  return useMemo(function () {
    var _ref = themeStyles || noOpObj,
        $class = _ref.$class,
        $className = _ref.$className,
        cssStyle = _objectWithoutProperties(_ref, ["$class", "$className"]);
    var selector = rootClass || $className || $class || id;
    var webContent = checkWebPlatform(inline) && {
      styles: {},
      hash: []
    };
    var _generateDataSet = generateDataSet(webContent, cssStyle, custom, _objectSpread2({
      selector: selector
    }, config)),
        cssProps = _generateDataSet.cssProps,
        web = _generateDataSet.web;
    if (!web) return {
      cssProps: cssProps,
      styleProps: {}
    };
    var hashId = web && uniqArr(web.hash).join('-');
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
  var cb = useCallback(stylesCb, cbDependencies || []);
  var styles = !customStyles || !isObj(customStyles) || isEmptyColl(customStyles) ? false : customStyles;
  var theme = useTheme();
  return useMemo(function () {
    return checkCall.apply(void 0, [cb, theme, styles].concat(_toConsumableArray(cbDependencies))) || {};
  }, [theme, cb, styles]);
};

var updateListeners = function updateListeners(element, type, events, methods) {
  if (!isObj(element) || !isFunc(element[type])) return null;
  element[type](events.on, methods.on);
  element[type](events.off, methods.off);
};
var createCBRef = function createCBRef(hookRef, events, methods, ref) {
  return useCallback(function (element) {
    hookRef.current && updateListeners(hookRef.current, Constants.REMOVE_EVENT, events, methods);
    hookRef.current = element;
    hookRef.current && updateListeners(hookRef.current, Constants.ADD_EVENT, events, methods);
    !hookRef.current && methods.cleanup();
  }, [methods.on, methods.off]);
};
var createMethods = function createMethods(offValue, onValue, setValue) {
  var cbWatchers = [onValue, offValue];
  return {
    off: useCallback(function () {
      return setValue(offValue);
    }, cbWatchers),
    on: useCallback(function () {
      return setValue(onValue);
    }, cbWatchers),
    cleanup: function cleanup(methods) {
      if (!methods) return;
      isFunc(methods.on) && methods.on(undefined);
      isFunc(methods.off) && methods.off(undefined);
      onValue = undefined;
      offValue = undefined;
      setValue = undefined;
      methods = undefined;
    }
  };
};
var getOptions = function getOptions() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return options && !isObj(options) ? {} : options;
};
var checkJoinValues = function checkJoinValues(offValue, onValue, valueOn, noMerge) {
  return noMerge || !isColl(onValue) || !isColl(offValue) ? valueOn : deepMerge(offValue, onValue);
};
var hookFactory = function hookFactory(events) {
  return (
    function (offValue, onValue) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _getOptions = getOptions(options),
          ref = _getOptions.ref,
          noMerge = _getOptions.noMerge;
      var hookRef = ref || useRef();
      var _useState = useState(offValue),
          _useState2 = _slicedToArray(_useState, 2),
          value = _useState2[0],
          setValue = _useState2[1];
      var _useState3 = useState(onValue),
          _useState4 = _slicedToArray(_useState3, 2),
          valueOn = _useState4[0],
          setValueOn = _useState4[1];
      var _useState5 = useState(checkJoinValues(offValue, valueOn, valueOn, noMerge)),
          _useState6 = _slicedToArray(_useState5, 2),
          activeValue = _useState6[0],
          setActiveValue = _useState6[1];
      useLayoutEffect(function () {
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
      return !isFunc(ref) ?
      [elementRef, useValue, setValue] : checkCall(function () {
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

export { useCss, useDimensions, useStylesCallback, useTheme, useThemeActive, useThemeFocus, useThemeHover, withTheme };
//# sourceMappingURL=index.js.map
