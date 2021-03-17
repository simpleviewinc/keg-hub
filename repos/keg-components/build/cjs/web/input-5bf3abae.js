'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var reactNative = require('react-native');
var useClassName = require('./useClassName-51ea3221.js');
var withTouch = require('./withTouch.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Input = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName.useClassName('keg-input', className, ref);
  var TextInputTouch = withTouch.withTouch(reactNative.TextInput, {
    showFeedback: false
  });
  return React__default['default'].createElement(TextInputTouch, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

exports.Input = Input;
//# sourceMappingURL=input-5bf3abae.js.map
