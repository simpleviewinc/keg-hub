'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var getActiveOpacity = function getActiveOpacity(isWeb) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOpObj;
  var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : jsutils.noOpObj;
  var activeOpacity = props.activeOpacity,
      opacity = props.opacity,
      showFeedback = props.showFeedback;
  var list = [activeOpacity, opacity, style === null || style === void 0 ? void 0 : style.opacity, 0.3];
  return !isWeb && showFeedback !== false ? {
    accessibilityRole: 'button',
    activeOpacity: list.find(jsutils.isNonNegative)
  } : {};
};

exports.getActiveOpacity = getActiveOpacity;
//# sourceMappingURL=getActiveOpacity.js.map
