import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { Switch as Switch$1 } from 'react-native';

var _excluded = ["className"];
var Switch = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-switch', className, ref);
  return React__default.createElement(Switch$1, _extends({}, props, {
    reg: classRef
  }));
});

export { Switch as S };
//# sourceMappingURL=switch-f5bd7d4f.js.map
