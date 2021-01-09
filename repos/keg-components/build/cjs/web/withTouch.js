'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('@keg-hub/re-theme/styleInjector');
var reTheme = require('@keg-hub/re-theme');
var touchable = require('./touchable.js');

var withTouch = function withTouch(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$showFeedback = options.showFeedback,
      showFeedback = _options$showFeedback === void 0 ? true : _options$showFeedback;
  var wrapped = React__default.forwardRef(function (props, ref) {
    var _props$touchThemePath = props.touchThemePath,
        touchThemePath = _props$touchThemePath === void 0 ? '' : _props$touchThemePath,
        _props$touchStyle = props.touchStyle,
        touchStyle = _props$touchStyle === void 0 ? jsutils.noPropObj : _props$touchStyle,
        onPress = props.onPress,
        otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["touchThemePath", "touchStyle", "onPress"]);
    var theme = reTheme.useTheme();
    return React__default.createElement(touchable.Touchable, {
      showFeedback: showFeedback,
      style: [jsutils.get(theme, touchThemePath), touchStyle],
      onPress: onPress
    }, React__default.createElement(Component, _rollupPluginBabelHelpers._extends({
      ref: ref
    }, otherProps)));
  });
  return wrapped;
};

exports.withTouch = withTouch;
//# sourceMappingURL=withTouch.js.map
