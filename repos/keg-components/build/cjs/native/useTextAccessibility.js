'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var React = require('react');
var React__default = _interopDefault(React);

var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var useTextAccessibility = function useTextAccessibility(element, accessibilityRole) {
  return React.useMemo(function () {
    var type = accessibilityRole ? accessibilityRole : headings.includes(element) ? 'header' : element;
    return _rollupPluginBabelHelpers._objectSpread2({
      accessibilityRole: type
    }, type === 'header' && _rollupPluginBabelHelpers._defineProperty({}, 'aria-level', element[1]));
  }, [element, accessibilityRole]);
};

exports.useTextAccessibility = useTextAccessibility;
//# sourceMappingURL=useTextAccessibility.js.map
