'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var svgIcon = require('./svgIcon-47ea55a8.js');
var reactNative = require('react-native');
var useClassName = require('./useClassName-51ea3221.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChevronDown = function ChevronDown(props) {
  return React.createElement(svgIcon.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
  }));
};

var Select = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName.useClassName('keg-select', className, ref);
  return React__default['default'].createElement(reactNative.Picker, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

exports.ChevronDown = ChevronDown;
exports.Select = Select;
//# sourceMappingURL=select-c5faa3d5.js.map
