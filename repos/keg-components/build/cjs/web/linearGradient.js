'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view = require('./view-276572bd.js');
var useClassList = require('./useClassList-89a8dbd4.js');
var jsutils = require('@keg-hub/jsutils');
require('./view.native-99366b4b.js');
require('react-native');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
      colors = _props$colors === void 0 ? jsutils.noPropArr : _props$colors,
      _props$locations = props.locations,
      locations = _props$locations === void 0 ? jsutils.noPropArr : _props$locations,
      _props$useAngle = props.useAngle,
      useAngle = _props$useAngle === void 0 ? false : _props$useAngle;
      props.angleCenter;
      var _props$angle = props.angle,
      angle = _props$angle === void 0 ? 0 : _props$angle,
      style = props.style,
      children = props.children,
      className = props.className,
      otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["start", "end", "colors", "locations", "useAngle", "angleCenter", "angle", "style", "children", "className"]);
  var _useState = React.useState(1),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];
  var _useState3 = React.useState(1),
      _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];
  var measure = React.useCallback(function (_ref) {
    var nativeEvent = _ref.nativeEvent;
    setWidth(nativeEvent.layout.width);
    setHeight(nativeEvent.layout.height);
  }, [setWidth, setHeight]);
  var newAngle = useAngle && angle ? "".concat(angle, "deg") : calculateAngle(width, height, start, end);
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList("keg-linear-gradient", className)
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
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noPropArr;
  var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noPropArr;
  return colors.map(function (color, index) {
    var location = locations[index];
    var locationStyle = '';
    if (location) {
      locationStyle = ' ' + location * 100 + '%';
    }
    return color + locationStyle;
  }).join(',');
};

exports.LinearGradient = LinearGradient;
//# sourceMappingURL=linearGradient.js.map
