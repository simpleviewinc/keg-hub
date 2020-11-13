'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var reTheme = require('@keg-hub/re-theme');
var Svg = require('react-native-svg');
var Svg__default = _interopDefault(Svg);

var useIconStyle = function useIconStyle(style) {
  return React.useMemo(function () {
    return jsutils.isArr(style) ? jsutils.deepMerge.apply(void 0, _rollupPluginBabelHelpers._toConsumableArray(style)) : style;
  }, [style]);
};
var useSize = function useSize(size, width, height, style, theme) {
  return React.useMemo(function () {
    var iconSize = size || jsutils.get(style, 'fontSize');
    var themeSize = jsutils.get(theme, 'typography.default.fontSize', 15) * 2;
    return {
      height: height || iconSize || jsutils.get(style, 'height', themeSize),
      width: width || iconSize || jsutils.get(style, 'width', themeSize)
    };
  }, [size, width, height, style]);
};
var useColor = function useColor(fill, stroke, color, border, style, theme) {
  return React.useMemo(function () {
    var themeColor = jsutils.get(theme, 'typography.default.color');
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
      style = _props$style === void 0 ? jsutils.noPropObj : _props$style,
      svgFill = props.svgFill,
      viewBox = props.viewBox,
      width = props.width,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["border", "color", "clipRule", "delta", "fill", "fillRule", "height", "size", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "style", "svgFill", "viewBox", "width"]);
  var iconStyle = useIconStyle(style);
  var theme = reTheme.useTheme();
  var sizeStyle = useSize(size, width, height, iconStyle, theme);
  var colorStyle = useColor(fill, stroke, color, border, iconStyle, theme);
  return React__default.createElement(Svg__default, _rollupPluginBabelHelpers._extends({}, attrs, {
    fill: svgFill,
    viewBox: viewBox,
    style: [iconStyle, sizeStyle]
  }), React__default.createElement(Svg.Path, {
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

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon-21afc6ae.js.map
