import { e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React from 'react';
import { V as View } from './view-2274aefb.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { noOpObj, noPropObj } from '@keg-hub/jsutils';
import './view.native-a7f08b5b.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  return React.createElement(View, _extends({
    className: useClassList('keg-card', className)
  }, attributes, {
    style: styles.main
  }), React.createElement(View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};

export { CardContainer };
//# sourceMappingURL=cardContainer.js.map
