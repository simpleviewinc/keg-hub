'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');

var TouchableComp = reactNative.Platform.OS === 'android' ? reactNative.TouchableNativeFeedback : reactNative.TouchableOpacity;
var Touchable = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? true : _props$showFeedback,
      touchRef = props.touchRef,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "showFeedback", "touchRef"]);
  var Component = showFeedback ? TouchableComp : reactNative.TouchableWithoutFeedback;
  var classRef = useClassName_native.useClassName('keg-touchable', className, touchRef || ref);
  return React__default.createElement(Component, _rollupPluginBabelHelpers._extends({
    accessible: true
  }, attrs, {
    ref: classRef
  }));
});

exports.Touchable = Touchable;
//# sourceMappingURL=touchable.js.map
