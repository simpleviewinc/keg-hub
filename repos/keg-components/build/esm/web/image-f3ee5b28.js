import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import React__default from 'react';
import { Image as Image$1 } from 'react-native';
import { u as useClassName } from './useClassName-6851fdf6.js';

var Image = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-image', className, ref);
  return React__default.createElement(Image$1, _extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});

export { Image as I };
//# sourceMappingURL=image-f3ee5b28.js.map
