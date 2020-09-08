import React__default, { useState, useEffect, useContext, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { isObj, isNum, isStr, get, isEmptyColl, exists, checkCall, uniqArr, jsonEqual } from '@keg-hub/jsutils';
import { D as Dimensions, R as ReThemeContext, H as HeadContext, g as getRNPlatform } from './headContext-8caf834c.js';
export { R as ReThemeContext, k as ReThemeProvider, f as addThemeEvent, h as fireThemeEvent, i as getDefaultTheme, d as getMergeSizes, b as getSize, c as getSizeMap, r as removeThemeEvent, j as setDefaultTheme, s as setRNDimensions, a as setRNPlatform, e as setSizes } from './headContext-8caf834c.js';
import { _ as _slicedToArray, a as _extends, b as _objectWithoutProperties, h as hasDomAccess, c as _objectSpread2, d as _toConsumableArray } from './hasDomAccess-cac52aef.js';
import { n as noOpObj, g as generateDataSet } from './generateDataSet-229cb0fd.js';

var useDimensions = function useDimensions() {
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
    setDimensions({
      width: width,
      height: height,
      scale: scale,
      fontScale: fontScale
    });
  };
  useEffect(function () {
    Dimensions.addEventListener('change', onChange);
    return function () {
      onChange.shouldUnmount = true;
      return Dimensions.removeEventListener('change', onChange);
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
    return isStr(styleRef) ? get(theme, styleRef, noOpObj) : styleRef || noOpObj;
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

var checkEqual = function checkEqual(obj1, obj2) {
  return obj1 === obj2 || jsonEqual(obj1, obj2);
};
var nativeThemeHook = function nativeThemeHook(offValue, onValue, options) {
  var hookRef = get(options, 'ref', useRef());
  var _useState = useState(offValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];
  useLayoutEffect(function () {
    !checkEqual(offValue, value) && setValue(value);
  }, [offValue, onValue]);
  return [hookRef, offValue, setValue];
};

export { useCss, useDimensions, useStylesCallback, useTheme, nativeThemeHook as useThemeActive, nativeThemeHook as useThemeFocus, nativeThemeHook as useThemeHover, withTheme };
//# sourceMappingURL=index.js.map
