import { useRef, useEffect } from 'react';
import { isFunc } from '@keg-hub/jsutils';

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config;
      _ref.startCb;
      var startDelay = _ref.startDelay;
  var aniRef = useRef(ref);
  var animate = function animate() {
    var element = aniRef.current;
    element && isFunc(element.animate) && element.animate(animation, config);
  };
  useEffect(function () {
    var timeout = setTimeout(function () {
      return animate();
    }, startDelay || 0);
    return function () {
      return clearTimeout(timeout);
    };
  }, []);
  return [aniRef];
};

export { useAnimate };
//# sourceMappingURL=useAnimate.js.map
