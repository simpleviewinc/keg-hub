import { d as _objectWithoutProperties, c as _toConsumableArray, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default, { useMemo } from 'react';
import Svg__default, { Path } from 'react-native-svg';
import { useTheme, useStyle } from '@keg-hub/re-theme';
import { isArr, deepMerge, get, noPropObj } from '@keg-hub/jsutils';

var _excluded = ["border", "className", "color", "clipRule", "delta", "fill", "fillRule", "height", "size", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "style", "svgFill", "viewBox", "width", "children"];
var useIconStyle = function useIconStyle(style) {
  return useMemo(function () {
    return isArr(style) ? deepMerge.apply(void 0, _toConsumableArray(style)) : style;
  }, [style]);
};
var useSize = function useSize(size, width, height, style, theme) {
  return useMemo(function () {
    var iconSize = size || get(style, 'fontSize');
    var themeSize = get(theme, 'typography.default.fontSize', 15) * 2;
    return {
      height: height || iconSize || get(style, 'height', themeSize),
      width: width || iconSize || get(style, 'width', themeSize)
    };
  }, [size, width, height, style]);
};
var useColor = function useColor(fill, stroke, color, border, style, theme) {
  return useMemo(function () {
    var themeColor = get(theme, 'typography.default.color');
    return {
      stroke: stroke || border || style.border || color || style.color || themeColor,
      fill: fill || color || style.color || stroke
    };
  }, [fill, stroke, color, border, style]);
};
var useClassName = function useClassName(className) {
  return noPropObj;
};
var SvgIcon = React__default.forwardRef(function (props, ref) {
  var border = props.border;
      props.className;
      var color = props.color,
      clipRule = props.clipRule,
      delta = props.delta,
      fill = props.fill,
      fillRule = props.fillRule,
      height = props.height,
      size = props.size,
      stroke = props.stroke,
      strokeWidth = props.strokeWidth,
      strokeLinecap = props.strokeLinecap,
      strokeLinejoin = props.strokeLinejoin,
      _props$style = props.style,
      style = _props$style === void 0 ? noPropObj : _props$style,
      svgFill = props.svgFill,
      viewBox = props.viewBox,
      width = props.width,
      children = props.children,
      attrs = _objectWithoutProperties(props, _excluded);
  var theme = useTheme();
  var iconStyle = useIconStyle(style);
  var sizeStyle = useSize(size, width, height, iconStyle, theme);
  var svgStyles = useStyle(iconStyle, sizeStyle);
  var colorStyle = useColor(fill, stroke, color, border, iconStyle, theme);
  var classProps = useClassName();
  return React__default.createElement(Svg__default, _extends({}, attrs, classProps, {
    fill: svgFill,
    viewBox: viewBox,
    style: svgStyles
  }), delta && React__default.createElement(Path, {
    clipRule: clipRule,
    d: delta,
    fill: colorStyle.fill,
    fillRule: fillRule,
    stroke: colorStyle.stroke,
    strokeWidth: strokeWidth,
    strokeLinecap: strokeLinecap,
    strokeLinejoin: strokeLinejoin
  }), children);
});

export { SvgIcon as S };
//# sourceMappingURL=svgIcon.native-4f87bca3.js.map
