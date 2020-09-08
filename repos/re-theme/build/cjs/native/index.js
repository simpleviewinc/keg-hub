'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var jsutils = require('@keg-hub/jsutils');
var headContext = require('./headContext-ceffa92d.js');
var hasDomAccess = require('./hasDomAccess-2ec85d5e.js');
var generateDataSet = require('./generateDataSet-b9aca5d7.js');

var useDimensions = function useDimensions() {
  var _useState = React.useState(headContext.Dimensions.get('window')),
      _useState2 = hasDomAccess._slicedToArray(_useState, 2),
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
      return React__default.createElement(Component, hasDomAccess._extends({
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
    var _ref2 = hasDomAccess._slicedToArray(_ref, 2),
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
    var _ref4 = hasDomAccess._slicedToArray(_ref3, 2),
        selector = _ref4[0],
        rls = _ref4[1];
    return styles + createBlock(selector, rls);
  }, '');
};

var __webPlatform;
var checkWebPlatform = function checkWebPlatform(inline) {
  return inline ? false : jsutils.exists(__webPlatform) ? __webPlatform : jsutils.checkCall(function () {
    var platform = headContext.getRNPlatform();
    __webPlatform = hasDomAccess.hasDomAccess() && platform.OS === 'web' ? true : false;
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
        cssStyle = hasDomAccess._objectWithoutProperties(_ref, ["$class", "$className"]);
    var selector = rootClass || $className || $class || id;
    var webContent = checkWebPlatform(inline) && {
      styles: {},
      hash: []
    };
    var _generateDataSet = generateDataSet.generateDataSet(webContent, cssStyle, custom, hasDomAccess._objectSpread2({
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
    return jsutils.checkCall.apply(void 0, [cb, theme, styles].concat(hasDomAccess._toConsumableArray(cbDependencies))) || {};
  }, [theme, cb, styles]);
};

var checkEqual = function checkEqual(obj1, obj2) {
  return obj1 === obj2 || jsutils.jsonEqual(obj1, obj2);
};
var nativeThemeHook = function nativeThemeHook(offValue, onValue, options) {
  var hookRef = jsutils.get(options, 'ref', React.useRef());
  var _useState = React.useState(offValue),
      _useState2 = hasDomAccess._slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];
  React.useLayoutEffect(function () {
    !checkEqual(offValue, value) && setValue(value);
  }, [offValue, onValue]);
  return [hookRef, offValue, setValue];
};

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
exports.useThemeActive = nativeThemeHook;
exports.useThemeFocus = nativeThemeHook;
exports.useThemeHover = nativeThemeHook;
exports.withTheme = withTheme;
//# sourceMappingURL=index.js.map
