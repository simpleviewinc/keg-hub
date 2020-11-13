'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');

var useFromToAnimation = function useFromToAnimation(params) {
  var _ref = params || {},
      from = _ref.from,
      to = _ref.to,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? jsutils.noOp : _ref$onFinish,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      easing = _ref.easing;
  var animDependencies = [from, to, duration, loop, easing, onFinish];
  var fromVal = React.useMemo(function () {
    return new reactNative.Animated.Value(from);
  }, animDependencies);
  var config = {
    toValue: to,
    duration: duration,
    easing: easing
  };
   (config.useNativeDriver = true);
  var animatedTiming = reactNative.Animated.timing(fromVal, config);
  React.useEffect(function () {
    loop ? reactNative.Animated.loop(animatedTiming).start() : animatedTiming.start(onFinish);
  }, animDependencies);
  return [fromVal];
};

exports.useFromToAnimation = useFromToAnimation;
//# sourceMappingURL=useFromToAnimation.js.map
