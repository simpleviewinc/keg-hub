'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var getStyles = function getStyles(isWeb, styles) {
  return isWeb ? jsutils.isObj(styles) && {
    styles: styles
  } || {
    styles: {}
  } : {};
};

exports.getStyles = getStyles;
//# sourceMappingURL=getStyles.js.map
