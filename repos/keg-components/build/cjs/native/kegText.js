'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var useTextAccessibility = require('./useTextAccessibility.js');
require('@keg-hub/re-theme');

var ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1
};
var KegText = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var accessibilityRole = props.accessibilityRole,
        children = props.children,
        className = props.className,
        ellipsis = props.ellipsis,
        attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["accessibilityRole", "children", "className", "ellipsis"]);
    var classRef = useClassName_native.useClassName("keg-".concat(element), className, ref);
    var a11y = useTextAccessibility.useTextAccessibility(element, accessibilityRole);
    return React__default.createElement(reactNative.Text, _rollupPluginBabelHelpers._extends({}, attrs, a11y, ellipsis && ellipsisProps, {
      ref: classRef
    }), children);
  });
};

exports.KegText = KegText;
//# sourceMappingURL=kegText.js.map
