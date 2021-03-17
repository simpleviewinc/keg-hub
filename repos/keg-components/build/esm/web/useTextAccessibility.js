import { _ as _objectSpread2, a as _defineProperty } from './_rollupPluginBabelHelpers-b6f65682.js';
import { useMemo } from 'react';

var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var useTextAccessibility = function useTextAccessibility(element, accessibilityRole) {
  return useMemo(function () {
    var type = accessibilityRole ? accessibilityRole : headings.includes(element) ? 'header' : element;
    return _objectSpread2({
      accessibilityRole: type
    }, type === 'header' && _defineProperty({}, 'aria-level', element[1]));
  }, [element, accessibilityRole]);
};

export { useTextAccessibility };
//# sourceMappingURL=useTextAccessibility.js.map
