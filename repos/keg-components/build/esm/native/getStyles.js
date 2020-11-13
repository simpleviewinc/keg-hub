import { isObj } from '@keg-hub/jsutils';

var getStyles = function getStyles(isWeb, styles) {
  return isWeb ? isObj(styles) && {
    styles: styles
  } || {
    styles: {}
  } : {};
};

export { getStyles };
//# sourceMappingURL=getStyles.js.map
