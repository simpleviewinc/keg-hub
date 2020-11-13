import { useMemo } from 'react';
import { useTheme } from '@keg-hub/re-theme';

var useTextStyles = function useTextStyles(element) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.get('typography.font.family', 'typography.default', element && "typography.".concat(element));
  }, [theme, element]);
};

export { useTextStyles };
//# sourceMappingURL=useTextStyles.js.map
