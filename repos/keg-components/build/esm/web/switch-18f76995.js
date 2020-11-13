import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { Switch as Switch$1 } from 'react-native';
import { u as useClassName } from './useClassName-477fb4c5.js';

var Switch = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-switch', className, ref);
  return React__default.createElement(Switch$1, _extends({}, props, {
    reg: classRef
  }));
});

export { Switch as S };
//# sourceMappingURL=switch-18f76995.js.map
