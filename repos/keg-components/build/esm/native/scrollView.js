import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { u as useScrollClassName } from './useScrollClassName.native-de017e3f.js';
import { ScrollView as ScrollView$1 } from 'react-native';

var ScrollView = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React.createElement(ScrollView$1, _extends({}, props, {
    ref: classRef
  }));
});

export { ScrollView };
//# sourceMappingURL=scrollView.js.map
