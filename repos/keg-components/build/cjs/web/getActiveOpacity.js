'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getActiveOpacity = function getActiveOpacity(isWeb, props, style) {
  return !isWeb ? {
    activeOpacity: props.activeOpacity || props.opacity || style && style.opacity || 0.3,
    accessibilityRole: 'button'
  } : {};
};

exports.getActiveOpacity = getActiveOpacity;
//# sourceMappingURL=getActiveOpacity.js.map
