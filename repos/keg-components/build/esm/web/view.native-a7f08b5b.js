import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { View as View$1 } from 'react-native';
import { u as useClassName } from './useClassName-682bc33b.js';

var View = React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["children", "className"]);
  var classRef = useClassName('keg-view', className, ref);
  return React.createElement(View$1, _extends({}, props, {
    ref: classRef
  }), children);
});

export { View as V };
//# sourceMappingURL=view.native-a7f08b5b.js.map
