import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { logData } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';

var useOutsideDetect = function useOutsideDetect() {
  logData('useOutsideDetect is not implemented on native platforms yet', 'warn');
};

var withOutsideDetect = function withOutsideDetect(Component) {
  var wrapped = React.forwardRef(function (props, ref) {
    props.onOutsideClick;
        var clientProps = _objectWithoutProperties(props, ["onOutsideClick"]);
    var fallbackRef = React.useRef();
    var detectRef = ref || fallbackRef;
    useOutsideDetect();
    return React.createElement(Component, _extends({}, clientProps, {
      ref: detectRef
    }));
  });
  wrapped.displayName = Component.displayName || Component.name || 'Component';
  return wrapped;
};

export { useOutsideDetect as u, withOutsideDetect as w };
//# sourceMappingURL=withOutsideDetect-8bf57fab.js.map
