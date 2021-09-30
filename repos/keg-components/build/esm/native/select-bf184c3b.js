import { e as _extends, d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b49fe34a.js';
import * as React from 'react';
import React__default from 'react';
import { S as SvgIcon } from './svgIcon.native-4f87bca3.js';
import { Picker } from 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';

var ChevronDown = function ChevronDown(props) {
  return React.createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
  }));
};

var _excluded = ["className"];
var Select = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, _excluded);
  var classRef = useClassName('keg-select', className, ref);
  return React__default.createElement(Picker, _extends({}, props, {
    ref: classRef
  }));
});

export { ChevronDown as C, Select as S };
//# sourceMappingURL=select-bf184c3b.js.map
