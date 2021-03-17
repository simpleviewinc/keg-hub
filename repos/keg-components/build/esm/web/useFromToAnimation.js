import { useMemo, useEffect } from 'react';
import { Animated } from 'react-native';
import { noOp } from '@keg-hub/jsutils';

var useFromToAnimation = function useFromToAnimation(params) {
  var _ref = params || {},
      from = _ref.from,
      to = _ref.to,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? noOp : _ref$onFinish,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      easing = _ref.easing;
  var animDependencies = [from, to, duration, loop, easing, onFinish];
  var fromVal = useMemo(function () {
    return new Animated.Value(from);
  }, animDependencies);
  var config = {
    toValue: to,
    duration: duration,
    easing: easing
  };
  var animatedTiming = Animated.timing(fromVal, config);
  useEffect(function () {
    loop ? Animated.loop(animatedTiming).start() : animatedTiming.start(onFinish);
  }, animDependencies);
  return [fromVal];
};

export { useFromToAnimation };
//# sourceMappingURL=useFromToAnimation.js.map
