import { e as _extends, d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { createElement } from 'react';
import { S as SvgIcon } from './svgIcon-ac9e14ca.js';
import { Picker } from 'react-native';
import { u as useClassName } from './useClassName-682bc33b.js';

var ChevronDown = function ChevronDown(props) {
  return createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
  }));
};

var Select = React.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-select', className, ref);
  return React.createElement(Picker, _extends({}, props, {
    ref: classRef
  }));
});

export { ChevronDown as C, Select as S };
//# sourceMappingURL=select-3ed4abed.js.map
