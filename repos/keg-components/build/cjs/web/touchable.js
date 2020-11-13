'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
var reactNative = require('react-native');
var useClassName = require('./useClassName-afee43f7.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

var TouchableComp = reactNative.Platform.OS === 'android' ? reactNative.TouchableNativeFeedback : reactNative.TouchableOpacity;
var Touchable = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? true : _props$showFeedback,
      touchRef = props.touchRef,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "showFeedback", "touchRef"]);
  var Component = showFeedback ? TouchableComp : reactNative.TouchableWithoutFeedback;
  var classRef = useClassName.useClassName('keg-touchable', className, touchRef || ref);
  return React__default.createElement(Component, _rollupPluginBabelHelpers._extends({
    accessible: true
  }, attrs, {
    ref: classRef
  }));
});

var Touchable$1 = styleInjector.StyleInjector(Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable$1.propTypes = Touchable.propTypes;

exports.Touchable = Touchable$1;
//# sourceMappingURL=touchable.js.map
