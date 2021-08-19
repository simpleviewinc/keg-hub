import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { logData } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';

var useOutsideDetect = function useOutsideDetect() {
  logData('useOutsideDetect is not implemented on native platforms yet', 'warn');
};

var _excluded = ["onOutsideClick"];
var withOutsideDetect = function withOutsideDetect(Component) {
  var wrapped = React__default.forwardRef(function (props, ref) {
    props.onOutsideClick;
        var clientProps = _objectWithoutProperties(props, _excluded);
    var fallbackRef = React__default.useRef();
    var detectRef = ref || fallbackRef;
    useOutsideDetect();
    return React__default.createElement(Component, _extends({}, clientProps, {
      ref: detectRef
    }));
  });
  wrapped.displayName = Component.displayName || Component.name || 'Component';
  return wrapped;
};

export { useOutsideDetect as u, withOutsideDetect as w };
//# sourceMappingURL=withOutsideDetect-d13f1631.js.map
