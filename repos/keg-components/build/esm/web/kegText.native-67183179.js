import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { Text } from 'react-native';
import { u as useClassName } from './useClassName-477fb4c5.js';
import { useTextAccessibility } from './useTextAccessibility.js';
import '@keg-hub/re-theme';

var ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1
};
var KegText = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var accessibilityRole = props.accessibilityRole,
        children = props.children,
        className = props.className,
        ellipsis = props.ellipsis,
        attrs = _objectWithoutProperties(props, ["accessibilityRole", "children", "className", "ellipsis"]);
    var classRef = useClassName("keg-".concat(element), className, ref);
    var a11y = useTextAccessibility(element, accessibilityRole);
    return React__default.createElement(Text, _extends({}, attrs, a11y, ellipsis && ellipsisProps, {
      ref: classRef
    }), children);
  });
};

export { KegText as K };
//# sourceMappingURL=kegText.native-67183179.js.map
