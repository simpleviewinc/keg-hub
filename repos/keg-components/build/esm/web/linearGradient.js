import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { noPropArr } from '@keg-hub/jsutils';
import React__default, { useState, useCallback } from 'react';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-a3859346.js';
import './view.native-117494a9.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-216fa8c1.js';
import { u as useClassList } from './useClassList-eea8a571.js';

var LinearGradient = function LinearGradient(props) {
  var _props$start = props.start,
      start = _props$start === void 0 ? {
    x: 0.5,
    y: 0
  } : _props$start,
      _props$end = props.end,
      end = _props$end === void 0 ? {
    x: 0.5,
    y: 1
  } : _props$end,
      _props$colors = props.colors,
      colors = _props$colors === void 0 ? noPropArr : _props$colors,
      _props$locations = props.locations,
      locations = _props$locations === void 0 ? noPropArr : _props$locations,
      _props$useAngle = props.useAngle,
      useAngle = _props$useAngle === void 0 ? false : _props$useAngle,
      angleCenter = props.angleCenter,
      _props$angle = props.angle,
      angle = _props$angle === void 0 ? 0 : _props$angle,
      style = props.style,
      children = props.children,
      className = props.className,
      otherProps = _objectWithoutProperties(props, ["start", "end", "colors", "locations", "useAngle", "angleCenter", "angle", "style", "children", "className"]);
  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];
  var _useState3 = useState(1),
      _useState4 = _slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];
  var measure = useCallback(function (_ref) {
    var nativeEvent = _ref.nativeEvent;
    setWidth(nativeEvent.layout.width);
    setHeight(nativeEvent.layout.height);
  }, [setWidth, setHeight]);
  var newAngle = useAngle && angle ? "".concat(angle, "deg") : calculateAngle(width, height, start, end);
  return React__default.createElement(View, _extends({
    className: useClassList("keg-linear-gradient", className)
  }, otherProps, {
    style: [style, {
      backgroundImage: "linear-gradient(".concat(newAngle, ",").concat(getColors(colors, locations), ")")
    }],
    onLayout: measure
  }), children);
};
var calculateAngle = function calculateAngle(width, height, start, end) {
  var newAngle = Math.atan2(width * (end.y - start.y), height * (end.x - start.x)) + Math.PI / 2;
  return newAngle + 'rad';
};
var getColors = function getColors() {
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noPropArr;
  var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noPropArr;
  return colors.map(function (color, index) {
    var location = locations[index];
    var locationStyle = '';
    if (location) {
      locationStyle = ' ' + location * 100 + '%';
    }
    return color + locationStyle;
  }).join(',');
};

export { LinearGradient };
//# sourceMappingURL=linearGradient.js.map
