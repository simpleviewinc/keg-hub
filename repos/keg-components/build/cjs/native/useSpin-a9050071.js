'use strict';

var React = require('react');

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref;
      _ref.animation;
      _ref.config;
      _ref.startCb;
      _ref.startDelay;
  var aniRef = React.useRef(ref);
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

exports.useAnimate = useAnimate;
exports.useSpin = useSpin;
//# sourceMappingURL=useSpin-a9050071.js.map
