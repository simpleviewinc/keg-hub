import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { u as useClassName } from './useClassName-ed83df40.js';
import { Image as Image$1 } from 'react-native-web';

var _excluded = ["className"];
var Image = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-image', className, ref);
  return React__default.createElement(Image$1, _extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});

export { Image as I };
//# sourceMappingURL=image-e4047948.js.map
