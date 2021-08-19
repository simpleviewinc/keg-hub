import { b as _slicedToArray, a as _defineProperty } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { useDimensions } from '@keg-hub/re-theme';
import { useState, useLayoutEffect } from 'react';
import { useThemePath } from './useThemePath.js';
import { deepMerge } from '@keg-hub/jsutils';
import { Dimensions } from 'react-native-web';

var windowHeight = Dimensions.get('window').height;
var heightStyles = {
  height: windowHeight
};
var buildHeightStyles = function buildHeightStyles(height, key) {
  heightStyles.maxHeight = height;
  return key ? _defineProperty({}, key, heightStyles) : heightStyles;
};
var buildHeightWithTheme = function buildHeightWithTheme(stylesWithHeight, themeStyles) {
  return deepMerge(themeStyles, stylesWithHeight);
};
var useThemeWithHeight = function useThemeWithHeight(themePath, styles, key) {
  var themeStyles = useThemePath(themePath, styles);
  var _useDimensions = useDimensions(),
      height = _useDimensions.height;
  var _useState = useState(height),
      _useState2 = _slicedToArray(_useState, 2),
      curHeight = _useState2[0],
      setCurHeight = _useState2[1];
  var _useState3 = useState(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles)),
      _useState4 = _slicedToArray(_useState3, 2),
      stylesWithHeight = _useState4[0],
      setStylesWithHeight = _useState4[1];
  useLayoutEffect(function () {
    if (height === curHeight) return;
    setCurHeight(height);
    setStylesWithHeight(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles));
  }, [curHeight, height, key, themeStyles]);
  return [stylesWithHeight, setStylesWithHeight];
};

export { useThemeWithHeight };
//# sourceMappingURL=useThemeWithHeight.js.map
