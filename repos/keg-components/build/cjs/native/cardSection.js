'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view_native = require('./view.native-b34604af.js');
var text = require('./text.js');
var renderFromType = require('./renderFromType.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./kegText-965ef4d3.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('@keg-hub/re-theme');
require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SectionWrap = function SectionWrap(_ref) {
  var children = _ref.children,
      numberOfLines = _ref.numberOfLines,
      showBorder = _ref.showBorder,
      styles = _ref.styles,
      type = _ref.type;
  type = type || 'section';
  return React__default['default'].createElement(text.Text, {
    className: "keg-".concat(type, "-text"),
    numberOfLines: numberOfLines,
    style: [jsutils.get(styles, "text"), showBorder === false && jsutils.get(styles, "noBorder.text")]
  }, children);
};
var CardSection = function CardSection(_ref2) {
  var Section = _ref2.Section,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref2, ["Section"]);
  var type = props.type || 'section';
  return Section && React__default['default'].createElement(view_native.View, {
    className: "keg-card-".concat(type),
    style: [jsutils.get(props, "styles.main"), props.showBorder === false && jsutils.get(props, "styles.noBorder.main")]
  }, renderFromType.renderFromType(Section, props, SectionWrap));
};

exports.CardSection = CardSection;
//# sourceMappingURL=cardSection.js.map
