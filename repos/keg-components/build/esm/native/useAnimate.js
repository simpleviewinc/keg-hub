import { useRef } from 'react';

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config,
      startCb = _ref.startCb,
      startDelay = _ref.startDelay;
  var aniRef = useRef(ref);
  console.warn('useAnimate not implemented on native');
  return [aniRef];
};

export { useAnimate };
//# sourceMappingURL=useAnimate.js.map
