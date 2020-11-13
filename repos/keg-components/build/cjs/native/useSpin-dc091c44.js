'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config,
      startCb = _ref.startCb,
      startDelay = _ref.startDelay;
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
//# sourceMappingURL=useSpin-dc091c44.js.map
