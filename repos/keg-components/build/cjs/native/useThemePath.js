'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');

var validateStyles = function validateStyles(styles) {
  return !Boolean(!styles || styles === jsutils.noPropObj || jsutils.isEmptyColl(styles));
};
var getStylesFromPath = function getStylesFromPath(theme, path) {
  return path && jsutils.get(theme, path) || function () {
  }();
};
var mergeStyles = function mergeStyles(pathStyles, userStyles) {
  if (!userStyles || userStyles === jsutils.noPropObj) return pathStyles;
  var pathKeys = Object.keys(pathStyles);
  var userKeys = Object.keys(userStyles);
  return !userKeys.length ? pathStyles : pathKeys.indexOf(userKeys[0]) !== -1 ?
  jsutils.deepMerge(pathStyles, userStyles) :
  jsutils.reduceObj(pathStyles, function (key, value, updated) {
    updated[key] = jsutils.deepMerge(value, userStyles);
    return updated;
  }, {});
};
var useThemePath = function useThemePath(path) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noPropObj;
  var theme = reTheme.useTheme();
  return React.useMemo(function () {
    var pathStyles = getStylesFromPath(theme, path);
    var validStyles = validateStyles(styles);
    return validStyles ? mergeStyles(pathStyles, styles) : pathStyles || jsutils.noPropObj;
  }, [theme, path, styles]);
};

exports.useThemePath = useThemePath;
//# sourceMappingURL=useThemePath.js.map
