'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.useAnimate = useAnimate;
//# sourceMappingURL=useAnimate.js.map
