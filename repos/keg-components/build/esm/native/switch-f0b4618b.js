import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { Switch as Switch$1 } from 'react-native';

var Switch = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-switch', className, ref);
  return React.createElement(Switch$1, _extends({}, props, {
    reg: classRef
  }));
});

export { Switch as S };
//# sourceMappingURL=switch-f0b4618b.js.map
