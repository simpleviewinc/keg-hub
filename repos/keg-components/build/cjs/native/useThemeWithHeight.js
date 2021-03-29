'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var reTheme = require('@keg-hub/re-theme');
var React = require('react');
var useThemePath = require('./useThemePath.js');
var jsutils = require('@keg-hub/jsutils');
var reactNative = require('react-native');

var windowHeight = reactNative.Dimensions.get('window').height;
var heightStyles = {
  height: windowHeight
};
var buildHeightStyles = function buildHeightStyles(height, key) {
  heightStyles.maxHeight = height;
  return key ? _rollupPluginBabelHelpers._defineProperty({}, key, heightStyles) : heightStyles;
};
var buildHeightWithTheme = function buildHeightWithTheme(stylesWithHeight, themeStyles) {
  return jsutils.deepMerge(themeStyles, stylesWithHeight);
};
var useThemeWithHeight = function useThemeWithHeight(themePath, styles, key) {
  var themeStyles = useThemePath.useThemePath(themePath, styles);
  var _useDimensions = reTheme.useDimensions(),
      height = _useDimensions.height;
  var _useState = React.useState(height),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      curHeight = _useState2[0],
      setCurHeight = _useState2[1];
  var _useState3 = React.useState(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles)),
      _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
      stylesWithHeight = _useState4[0],
      setStylesWithHeight = _useState4[1];
  React.useLayoutEffect(function () {
    if (height === curHeight) return;
    setCurHeight(height);
    setStylesWithHeight(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles));
  }, [curHeight, height, key, themeStyles]);
  return [stylesWithHeight, setStylesWithHeight];
};

exports.useThemeWithHeight = useThemeWithHeight;
//# sourceMappingURL=useThemeWithHeight.js.map
