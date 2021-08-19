'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var useClassName = require('./useClassName-eec4a5f1.js');
var reactNativeWeb = require('react-native-web');
var useTextAccessibility = require('./useTextAccessibility.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["accessibilityRole", "children", "className", "ellipsis"];
var ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1
};
var KegText = function KegText(element) {
  return React__default['default'].forwardRef(function (props, ref) {
    var accessibilityRole = props.accessibilityRole,
        children = props.children,
        className = props.className,
        ellipsis = props.ellipsis,
        attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
    var classRef = useClassName.useClassName("keg-".concat(element), className, ref);
    var a11y = useTextAccessibility.useTextAccessibility(element, accessibilityRole);
    return React__default['default'].createElement(reactNativeWeb.Text, _rollupPluginBabelHelpers._extends({}, attrs, a11y, ellipsis && ellipsisProps, {
      ref: classRef
    }), children);
  });
};

exports.KegText = KegText;
//# sourceMappingURL=kegText.native-100193df.js.map
