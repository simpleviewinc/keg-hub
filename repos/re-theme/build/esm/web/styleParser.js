import { isArr, isFunc, camelCase, exists, checkCall } from '@keg-hub/jsutils';
import { h as hasDomAccess, c as _objectSpread2, _ as _slicedToArray, e as _defineProperty, d as _toConsumableArray } from './_rollupPluginBabelHelpers-8470caf4.js';
export { g as generateDataSet } from './generateDataSet-859b383a.js';

var validateArguments = function validateArguments() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fallbackCB = arguments.length > 1 ? arguments[1] : undefined;
  if (!hasDomAccess() || !isArr(args.classNames)) {
    console.error("[ Error ] styleSheetParser requires Dom Access and an array of class names!");
    return {
      valid: false
    };
  }
  var callback = args.callback || fallbackCB;
  if (!isFunc(callback)) {
    console.error("[ Error ] styleSheetParser requires a function callback.\nIt received:", callback);
    return {
      valid: false
    };
  }
  return _objectSpread2(_objectSpread2({}, args), {}, {
    callback: callback
  });
};

var addToDom = function addToDom(styles) {
  var dataCss = document.createElement('style');
  dataCss.type = 'text/css';
  dataCss.styleSheet ? dataCss.styleSheet.cssText = styles : dataCss.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(dataCss);
};

var getStyleContent = function getStyleContent(styleStr) {
  var matches = _toConsumableArray(styleStr.matchAll(/\{(.+?)\}/gi));
  return isArr(matches) && isArr(matches[0]) ? matches[0][1] : '';
};
var cssToJs = function cssToJs(styleStr) {
  var styleObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styles = getStyleContent(styleStr).trim().split(';');
  return styles.reduce(function (parsed, styleRule) {
    if (styleRule.indexOf(':') === -1) return parsed;
    var _styleRule$split = styleRule.split(':'),
        _styleRule$split2 = _slicedToArray(_styleRule$split, 2),
        name = _styleRule$split2[0],
        value = _styleRule$split2[1];
    name = camelCase(name.trim());
    value = value.trim();
    return !exists(name) || !exists(value) || name === '' || value === '' ? parsed : _objectSpread2(_objectSpread2({}, parsed), {}, _defineProperty({}, name, value));
  }, styleObj);
};

var convertToDataClass = function convertToDataClass(cssRule, rootSelector, formatted) {
  var selectorRef = rootSelector.substring(1);
  var dataClass = "[data-class~=\"".concat(selectorRef, "\"]");
  var dataRule = cssRule.cssText.replace(rootSelector, dataClass);
  formatted.asObj[dataClass] = cssToJs(dataRule, formatted.asObj[dataClass]);
  formatted.dataClass[selectorRef] = formatted.asObj[dataClass];
  formatted.asStr += "".concat(dataRule, "\n");
  return formatted;
};
var loopSheetCssRules = function loopSheetCssRules(formatted, sheet, classNames, callback) {
  return Array.from(sheet.cssRules).reduce(function (formatted, cssRule) {
    if (!cssRule.selectorText || !cssRule.cssText) return formatted;
    var rootSelector = cssRule.selectorText.split(' ').shift();
    return classNames.includes(rootSelector) ? checkCall(callback, cssRule, rootSelector, formatted) : formatted;
  }, formatted);
};
var styleSheetParser = function styleSheetParser(args) {
  var _validateArguments = validateArguments(args, convertToDataClass),
      classNames = _validateArguments.classNames,
      callback = _validateArguments.callback,
      _validateArguments$to = _validateArguments.toDom,
      toDom = _validateArguments$to === void 0 ? true : _validateArguments$to,
      format = _validateArguments.format,
      valid = _validateArguments.valid;
  if (valid === false) return {};
  var parsedStyles = isArr(classNames) &&
  Array.from(document.styleSheets).reduce(function (formatted, sheet) {
    return loopSheetCssRules(formatted, sheet, classNames, callback);
  }, {
    asStr: '',
    asObj: {},
    dataClass: {}
  });
  toDom && stylesText && addToDom(parsedStyles.asStr);
  return parsedStyles;
};

export { styleSheetParser };
//# sourceMappingURL=styleParser.js.map
