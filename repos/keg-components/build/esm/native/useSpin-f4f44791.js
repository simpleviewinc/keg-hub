import { useRef } from 'react';

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref;
      _ref.animation;
      _ref.config;
      _ref.startCb;
      _ref.startDelay;
  var aniRef = useRef(ref);
  console.warn('useAnimate not implemented on native');
  return [aniRef];
};

var defAnimation = [{
  transform: 'rotate(0)'
}, {
  transform: 'rotate(360deg)'
}];
var defConfig = {
  duration: 2000,
  iterations: Infinity
};
var useSpin = function useSpin() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ref = props.ref,
      animation = props.animation,
      config = props.config;
  animation = animation || defAnimation;
  config = config || defConfig;
  return useAnimate({
    animation: animation,
    config: config,
    ref: ref
  });
};

export { useSpin as a, useAnimate as u };
//# sourceMappingURL=useSpin-f4f44791.js.map
