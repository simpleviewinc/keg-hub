import { d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { Text } from './text.js';
import { renderFromType } from './renderFromType.js';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import 'react-native';
import './useClassName.native-32e8827d.js';
import './kegText-97d3d571.js';
import './kegText.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import '@keg-hub/re-theme';
import './isValidComponent.js';

var _excluded = ["Section"];
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
      props = _objectWithoutProperties(_ref2, _excluded);
  var type = props.type || 'section';
  return Section && React__default.createElement(View, {
    className: "keg-card-".concat(type),
    style: [get(props, "styles.main"), props.showBorder === false && get(props, "styles.noBorder.main")]
  }, renderFromType(Section, props, SectionWrap));
};

export { CardSection };
//# sourceMappingURL=cardSection.js.map
