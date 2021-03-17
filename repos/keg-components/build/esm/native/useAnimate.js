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

export { useAnimate };
//# sourceMappingURL=useAnimate.js.map
