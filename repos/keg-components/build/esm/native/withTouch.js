import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, noPropObj } from '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import '@keg-hub/re-theme/styleInjector';
import { useTheme } from '@keg-hub/re-theme';
import './touchable.js';
import { T as Touchable } from './touchable-e78a3026.js';

var withTouch = function withTouch(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$showFeedback = options.showFeedback,
      showFeedback = _options$showFeedback === void 0 ? true : _options$showFeedback;
  var wrapped = React__default.forwardRef(function (props, ref) {
    var _props$touchThemePath = props.touchThemePath,
        touchThemePath = _props$touchThemePath === void 0 ? '' : _props$touchThemePath,
        _props$touchStyle = props.touchStyle,
        touchStyle = _props$touchStyle === void 0 ? noPropObj : _props$touchStyle,
        onPress = props.onPress,
        otherProps = _objectWithoutProperties(props, ["touchThemePath", "touchStyle", "onPress"]);
    var theme = useTheme();
    return React__default.createElement(Touchable, {
      showFeedback: showFeedback,
      style: [get(theme, touchThemePath), touchStyle],
      onPress: onPress
    }, React__default.createElement(Component, _extends({
      ref: ref
    }, otherProps)));
  });
  return wrapped;
};

export { withTouch };
//# sourceMappingURL=withTouch.js.map
