import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useEffect } from 'react';
import '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';

var eventIsOutside = function eventIsOutside(evt, ref) {
  return (ref === null || ref === void 0 ? void 0 : ref.current) && !ref.current.contains(evt.target);
};
var useOutsideDetect = function useOutsideDetect(ref, onOutsideClick) {
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      return eventIsOutside(event, ref) && (onOutsideClick === null || onOutsideClick === void 0 ? void 0 : onOutsideClick(event));
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

var withOutsideDetect = function withOutsideDetect(Component) {
  var wrapped = React.forwardRef(function (props, ref) {
    var onOutsideClick = props.onOutsideClick,
        clientProps = _objectWithoutProperties(props, ["onOutsideClick"]);
    var fallbackRef = React.useRef();
    var detectRef = ref || fallbackRef;
    useOutsideDetect(detectRef, onOutsideClick);
    return React.createElement(Component, _extends({}, clientProps, {
      ref: detectRef
    }));
  });
  wrapped.displayName = Component.displayName || Component.name || 'Component';
  return wrapped;
};

export { useOutsideDetect as u, withOutsideDetect as w };
//# sourceMappingURL=withOutsideDetect-c4848693.js.map
