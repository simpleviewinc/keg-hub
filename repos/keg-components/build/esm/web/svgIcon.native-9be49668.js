import { d as _objectWithoutProperties, c as _toConsumableArray, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useMemo } from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme, useStyle } from '@keg-hub/re-theme';
import { isArr, deepMerge, get, eitherArr, isStr, noPropObj } from '@keg-hub/jsutils';

var defClass = 'keg-svg-icon';
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
  var deps = eitherArr(className, [className]).join(' ');
  return useMemo(function () {
    var classes = isArr(className) ? className.join(' ') : isStr(className) ? className : '';
    return {
      className: classes.includes(defClass) ? classes : "".concat(defClass, " ").concat(classes)
    };
  }, [deps]);
};
var SvgIcon = React.forwardRef(function (props, ref) {
  var border = props.border,
      className = props.className,
      color = props.color,
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
      attrs = _objectWithoutProperties(props, ["border", "className", "color", "clipRule", "delta", "fill", "fillRule", "height", "size", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "style", "svgFill", "viewBox", "width"]);
  var theme = useTheme();
  var iconStyle = useIconStyle(style);
  var sizeStyle = useSize(size, width, height, iconStyle, theme);
  var svgStyles = useStyle(iconStyle, sizeStyle);
  var colorStyle = useColor(fill, stroke, color, border, iconStyle, theme);
  var classProps = useClassName(className);
  return React.createElement(Svg, _extends({}, attrs, classProps, {
    fill: svgFill,
    viewBox: viewBox,
    style: svgStyles
  }), React.createElement(Path, {
    clipRule: clipRule,
    d: delta,
    fill: colorStyle.fill,
    fillRule: fillRule,
    stroke: colorStyle.stroke,
    strokeWidth: strokeWidth,
    strokeLinecap: strokeLinecap,
    strokeLinejoin: strokeLinejoin
  }));
});

export { SvgIcon as S };
//# sourceMappingURL=svgIcon.native-9be49668.js.map
