import { e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { noOpObj, noPropObj } from '@keg-hub/jsutils';
import React__default from 'react';
import 'react-native';
import './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import { u as useClassList } from './useClassList.native-70068878.js';

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  return React__default.createElement(View, _extends({
    className: useClassList()
  }, attributes, {
    style: styles.main
  }), React__default.createElement(View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

export { CardContainer };
//# sourceMappingURL=cardContainer.js.map
