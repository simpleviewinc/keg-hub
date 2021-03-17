import { e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { V as View } from './view.native-b0b1ddd4.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import { noOpObj, noPropObj } from '@keg-hub/jsutils';
import 'react-native';
import './useClassName.native-32e8827d.js';

var CardContainer = function CardContainer(_ref) {
  _ref.className;
      var _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  return React.createElement(View, _extends({
    className: useClassList()
  }, attributes, {
    style: styles.main
  }), React.createElement(View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

export { CardContainer };
//# sourceMappingURL=cardContainer.js.map
