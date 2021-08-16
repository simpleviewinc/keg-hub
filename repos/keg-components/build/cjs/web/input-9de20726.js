'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var reactNativeWeb = require('react-native-web');
var useClassName = require('./useClassName-eec4a5f1.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "onPress", "onFocus"];
var Input = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      onPress = _ref.onPress,
      onFocus = _ref.onFocus,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName.useClassName('keg-input', className, ref);
  return React__default['default'].createElement(reactNativeWeb.TextInput, _rollupPluginBabelHelpers._extends({
    onFocus: onFocus || onPress,
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

exports.Input = Input;
//# sourceMappingURL=input-9de20726.js.map
