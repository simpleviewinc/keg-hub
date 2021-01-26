import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { ScrollView as ScrollView$1 } from 'react-native';
import { u as useScrollClassName } from './useScrollClassName.native-de017e3f.js';

var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassName('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(ScrollView$1, _extends({}, props, {
    ref: classRef
  }));
});

export { ScrollView };
//# sourceMappingURL=scrollView.js.map
