import { d as _objectWithoutProperties, c as _toConsumableArray, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useMemo } from 'react';
import { isArr, deepMerge, get, noPropObj } from '@keg-hub/jsutils';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@keg-hub/re-theme';

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
var SvgIcon = function SvgIcon(props) {
  var border = props.border,
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
      attrs = _objectWithoutProperties(props, ["border", "color", "clipRule", "delta", "fill", "fillRule", "height", "size", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "style", "svgFill", "viewBox", "width"]);
  var iconStyle = useIconStyle(style);
  var theme = useTheme();
  var sizeStyle = useSize(size, width, height, iconStyle, theme);
  var colorStyle = useColor(fill, stroke, color, border, iconStyle, theme);
  return React.createElement(Svg, _extends({}, attrs, {
    fill: svgFill,
    viewBox: viewBox,
    style: [iconStyle, sizeStyle]
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
};

export { SvgIcon };
//# sourceMappingURL=svgIcon.js.map
