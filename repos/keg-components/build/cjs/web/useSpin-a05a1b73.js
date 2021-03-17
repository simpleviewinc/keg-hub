'use strict';

var React = require('react');
var jsutils = require('@keg-hub/jsutils');

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config;
      _ref.startCb;
      var startDelay = _ref.startDelay;
  var aniRef = React.useRef(ref);
  var animate = function animate() {
    var element = aniRef.current;
    element && jsutils.isFunc(element.animate) && element.animate(animation, config);
  };
  React.useEffect(function () {
    var timeout = setTimeout(function () {
      return animate();
    }, startDelay || 0);
    return function () {
      return clearTimeout(timeout);
    };
  }, []);
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
//# sourceMappingURL=useSpin-a05a1b73.js.map
