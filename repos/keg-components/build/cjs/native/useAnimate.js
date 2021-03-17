'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.useAnimate = useAnimate;
//# sourceMappingURL=useAnimate.js.map
