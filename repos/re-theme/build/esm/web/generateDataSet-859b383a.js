import { isStr, exists, reduceObj, isObj, set, get } from '@keg-hub/jsutils';
import { c as _objectSpread2 } from './_rollupPluginBabelHelpers-8470caf4.js';

var noOpObj = Object.freeze({});

var stringHasher = function stringHasher(str) {
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!isStr(str) || str.length == 0) return 0;
  str = str.split('').reverse().join('');
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var _char = str.charCodeAt(i);
    hash = (hash << 5) - hash + _char;
    hash = "".concat(Math.abs(hash & hash));
  }
  return maxLength ? hash.slice(0, maxLength) : hash;
};

var getCssSelector = function getCssSelector(_ref) {
  var selector = _ref.selector,
      prefix = _ref.prefix,
      format = _ref.format;
  format = (format || "[data-class~=\"{{selector}}\"]").replace(/\s/g, '');
  var hasRef = selector.indexOf('.') === 0 || selector.indexOf('#') === 0 || selector.indexOf('[') === 0;
  return hasRef ? selector : !exists(prefix) || prefix && selector.indexOf(prefix) === 0 ? "".concat(format.replace('{{selector}}', selector)) : selector;
};

var addRuleToStyles = function addRuleToStyles(styleObj, rulePath, value) {
  set(styleObj, rulePath, value);
  return styleObj;
};
var buildStyleRules = function buildStyleRules(current, config, rule, value) {
  var web = current.web,
      cssProps = current.cssProps,
      custom = current.custom;
  var cssValue = isObj(custom) && custom[rule] || value;
  var selector = getCssSelector(config);
  var rulePath = web ? "styles.".concat(selector, ".").concat(rule) : "style.".concat(rule);
  addRuleToStyles(web || cssProps, rulePath, cssValue);
  return {
    web: web,
    cssProps: cssProps,
    selector: selector
  };
};
var addDataSet = function addDataSet(web, cssProps, key, selector, dataSet) {
  (web && get(web, "styles.".concat(selector)) || get(cssProps, "".concat(key, ".style"))) && set(cssProps, "".concat(key, ".dataSet"), dataSet);
};
var buildDataSet = function buildDataSet(current, config, key, value) {
  var web = current.web,
      cssProps = current.cssProps;
  var custom = isObj(current.custom) && current.custom[key] || noOpObj;
  var selector = "".concat(config.selector, "-").concat(key);
  var built = generateDataSet(web, value, custom, _objectSpread2(_objectSpread2({}, config), {}, {
    selector: selector
  }));
  cssProps[key] = built.cssProps;
  addDataSet(web, cssProps, key, built.selector, {
    "class": selector
  });
  web && web.hash.push(stringHasher(selector));
  return {
    cssProps: cssProps,
    web: web && _objectSpread2(_objectSpread2({}, web), built.web)
  };
};
var generateDataSet = function generateDataSet(web, css, custom) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return reduceObj(css, function (key, value, built) {
    return isObj(value)
    ? buildDataSet(built, config, key, value)
    : buildStyleRules(built, config, key, value);
  }, {
    cssProps: {},
    web: web,
    custom: custom
  });
};

export { generateDataSet as g, noOpObj as n };
//# sourceMappingURL=generateDataSet-859b383a.js.map
