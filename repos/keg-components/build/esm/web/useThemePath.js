import { useMemo } from 'react';
import { useTheme } from '@keg-hub/re-theme';
import { get, noPropObj, isEmptyColl, deepMerge, reduceObj } from '@keg-hub/jsutils';

var validateStyles = function validateStyles(styles) {
  return !Boolean(!styles || styles === noPropObj || isEmptyColl(styles));
};
var getStylesFromPath = function getStylesFromPath(theme, path) {
  return path && get(theme, path) || function () {
  }();
};
var mergeStyles = function mergeStyles(pathStyles, userStyles) {
  if (!userStyles || userStyles === noPropObj) return pathStyles;
  var pathKeys = Object.keys(pathStyles);
  var userKeys = Object.keys(userStyles);
  return !userKeys.length ? pathStyles : pathKeys.indexOf(userKeys[0]) !== -1 ?
  deepMerge(pathStyles, userStyles) :
  reduceObj(pathStyles, function (key, value, updated) {
    updated[key] = deepMerge(value, userStyles);
    return updated;
  }, {});
};
var useThemePath = function useThemePath(path) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noPropObj;
  var theme = useTheme();
  return useMemo(function () {
    var pathStyles = getStylesFromPath(theme, path);
    var validStyles = validateStyles(styles);
    return validStyles ? mergeStyles(pathStyles, styles) : pathStyles || noPropObj;
  }, [theme, path, styles]);
};

export { useThemePath };
//# sourceMappingURL=useThemePath.js.map
