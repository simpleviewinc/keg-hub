'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var Svg = require('react-native-svg');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Svg__default = /*#__PURE__*/_interopDefaultLegacy(Svg);

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
var useClassName = function useClassName(className) {
  return jsutils.noPropObj;
};
var SvgIcon = React__default['default'].forwardRef(function (props, ref) {
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
      style = _props$style === void 0 ? jsutils.noPropObj : _props$style,
      svgFill = props.svgFill,
      viewBox = props.viewBox,
      width = props.width,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["border", "className", "color", "clipRule", "delta", "fill", "fillRule", "height", "size", "stroke", "strokeWidth", "strokeLinecap", "strokeLinejoin", "style", "svgFill", "viewBox", "width"]);
  var theme = reTheme.useTheme();
  var iconStyle = useIconStyle(style);
  var sizeStyle = useSize(size, width, height, iconStyle, theme);
  var svgStyles = reTheme.useStyle(iconStyle, sizeStyle);
  var colorStyle = useColor(fill, stroke, color, border, iconStyle, theme);
  var classProps = useClassName();
  return React__default['default'].createElement(Svg__default['default'], _rollupPluginBabelHelpers._extends({}, attrs, classProps, {
    fill: svgFill,
    viewBox: viewBox,
    style: svgStyles
  }), React__default['default'].createElement(Svg.Path, {
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

exports.SvgIcon = SvgIcon;
//# sourceMappingURL=svgIcon.js.map
