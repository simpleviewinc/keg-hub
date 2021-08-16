import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { View as View$1 } from 'react-native-web';
import { u as useClassName } from './useClassName-ed83df40.js';

var _excluded = ["children", "className"];
var View = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-view', className, ref);
  return React__default.createElement(View$1, _extends({}, props, {
    ref: classRef
  }), children);
});

export { View as V };
//# sourceMappingURL=view.native-2491eb60.js.map
