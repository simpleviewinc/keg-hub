'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config,
      startCb = _ref.startCb,
      startDelay = _ref.startDelay;
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
