'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var withTouch = require('./withTouch.js');

var Input = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName_native.useClassName('keg-input', className, ref);
  var TextInputTouch = withTouch.withTouch(reactNative.TextInput, {
    showFeedback: false
  });
  return React__default.createElement(TextInputTouch, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});

exports.Input = Input;
//# sourceMappingURL=input-5d42e55a.js.map
