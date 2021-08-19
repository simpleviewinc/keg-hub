'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var svgIcon_native = require('./svgIcon.native-f6027179.js');
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ChevronDown = function ChevronDown(props) {
  return React__namespace.createElement(svgIcon_native.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
  }));
};

var _excluded = ["className"];
var Select = React__default['default'].forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName_native.useClassName('keg-select', className, ref);
  return React__default['default'].createElement(reactNative.Picker, _rollupPluginBabelHelpers._extends({}, props, {
    ref: classRef
  }));
});

exports.ChevronDown = ChevronDown;
exports.Select = Select;
//# sourceMappingURL=select-86099f38.js.map
