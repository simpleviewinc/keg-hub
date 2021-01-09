import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { Switch as Switch$1 } from 'react-native';
import { u as useClassName } from './useClassName-a3859346.js';

var Switch = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-switch', className, ref);
  return React__default.createElement(Switch$1, _extends({}, props, {
    reg: classRef
  }));
});

export { Switch as S };
//# sourceMappingURL=switch-babdd77a.js.map
