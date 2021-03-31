'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var jsutils = require('@keg-hub/jsutils');

var isWeb = getPlatform.getPlatform() === 'web';
var useAccessibilityRole = function useAccessibilityRole(role, nativeRole) {
  return React.useMemo(function () {
    return jsutils.isStr(role) ? {
      accessibilityRole: role
    } : jsutils.isStr(nativeRole) ? {
      accessibilityRole: nativeRole
    } : jsutils.noOpObj;
  }, [isWeb, role, nativeRole]);
};

exports.useAccessibilityRole = useAccessibilityRole;
//# sourceMappingURL=useAccessibilityRole.js.map
