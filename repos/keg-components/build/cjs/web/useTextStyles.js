'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reTheme = require('@keg-hub/re-theme');

var useTextStyles = function useTextStyles(element) {
  var theme = reTheme.useTheme();
  return React.useMemo(function () {
    return theme.get('typography.font.family', 'typography.default', element && "typography.".concat(element));
  }, [theme, element]);
};

exports.useTextStyles = useTextStyles;
//# sourceMappingURL=useTextStyles.js.map
