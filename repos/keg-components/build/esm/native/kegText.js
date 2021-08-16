import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { Text } from 'react-native';
import { useTextAccessibility } from './useTextAccessibility.js';

var _excluded = ["accessibilityRole", "children", "className", "ellipsis"];
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
        attrs = _objectWithoutProperties(props, _excluded);
    var classRef = useClassName("keg-".concat(element), className, ref);
    var a11y = useTextAccessibility(element, accessibilityRole);
    return React__default.createElement(Text, _extends({}, attrs, a11y, ellipsis && ellipsisProps, {
      ref: classRef
    }), children);
  });
};

export { KegText };
//# sourceMappingURL=kegText.js.map
