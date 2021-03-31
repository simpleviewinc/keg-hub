import { useMemo } from 'react';
import { g as getPlatform } from './getPlatform-95568099.js';
import { isStr, noOpObj } from '@keg-hub/jsutils';

var isWeb = getPlatform() === 'web';
var useAccessibilityRole = function useAccessibilityRole(role, nativeRole) {
  return useMemo(function () {
    return isStr(role) ? {
      accessibilityRole: role
    } : isStr(nativeRole) ? {
      accessibilityRole: nativeRole
    } : noOpObj;
  }, [isWeb, role, nativeRole]);
};

export { useAccessibilityRole };
//# sourceMappingURL=useAccessibilityRole.js.map
