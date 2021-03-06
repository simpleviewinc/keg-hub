import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { Image as Image$1 } from 'react-native';

var Image = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-image', className, ref);
  return React.createElement(Image$1, _extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});

export { Image as I };
//# sourceMappingURL=image-d610d905.js.map
