'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var touchable = require('./touchable-548d2782.js');
var reTheme = require('@keg-hub/re-theme');
var jsutils = require('@keg-hub/jsutils');
require('./touchable.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["touchThemePath", "touchStyle", "onPress"];
var withTouch = function withTouch(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$showFeedback = options.showFeedback,
      showFeedback = _options$showFeedback === void 0 ? true : _options$showFeedback;
  var wrapped = React__default['default'].forwardRef(function (props, ref) {
    var _props$touchThemePath = props.touchThemePath,
        touchThemePath = _props$touchThemePath === void 0 ? '' : _props$touchThemePath,
        _props$touchStyle = props.touchStyle,
        touchStyle = _props$touchStyle === void 0 ? jsutils.noPropObj : _props$touchStyle,
        onPress = props.onPress,
        otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
    var theme = reTheme.useTheme();
    return React__default['default'].createElement(touchable.Touchable, {
      showFeedback: showFeedback,
      style: [jsutils.get(theme, touchThemePath), touchStyle],
      onPress: onPress
    }, React__default['default'].createElement(Component, _rollupPluginBabelHelpers._extends({
      ref: ref
    }, otherProps)));
  });
  return wrapped;
};

exports.withTouch = withTouch;
//# sourceMappingURL=withTouch.js.map
