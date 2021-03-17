'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var reTheme = require('@keg-hub/re-theme');

var useTextStyles = function useTextStyles(element) {
  var theme = reTheme.useTheme();
  return React.useMemo(function () {
    return theme.get('typography.font.family', 'typography.default', element && "typography.".concat(element));
  }, [theme, element]);
};

exports.useTextStyles = useTextStyles;
//# sourceMappingURL=useTextStyles.js.map
