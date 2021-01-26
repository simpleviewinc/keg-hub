import { d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import React__default from 'react';
import './isValidComponent.js';
import { renderFromType } from './renderFromType.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-6851fdf6.js';
import './view.native-5aeb3e53.js';
import '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-a64440c5.js';
import './useTextAccessibility.js';
import './kegText.native-7cc07481.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText-653699c8.js';
import { Text } from './text.js';

var SectionWrap = function SectionWrap(_ref) {
  var children = _ref.children,
      numberOfLines = _ref.numberOfLines,
      showBorder = _ref.showBorder,
      styles = _ref.styles,
      type = _ref.type;
  type = type || 'section';
  return React__default.createElement(Text, {
    className: "keg-".concat(type, "-text"),
    numberOfLines: numberOfLines,
    style: [get(styles, "text"), showBorder === false && get(styles, "noBorder.text")]
  }, children);
};
var CardSection = function CardSection(_ref2) {
  var Section = _ref2.Section,
      props = _objectWithoutProperties(_ref2, ["Section"]);
  var type = props.type || 'section';
  return Section && React__default.createElement(View, {
    className: "keg-card-".concat(type),
    style: [get(props, "styles.main"), props.showBorder === false && get(props, "styles.noBorder.main")]
  }, renderFromType(Section, props, SectionWrap));
};

export { CardSection };
//# sourceMappingURL=cardSection.js.map
