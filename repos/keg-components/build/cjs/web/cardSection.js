'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
var renderFromType = require('./renderFromType.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-afee43f7.js');
require('./view.native-b2081485.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-bc6e3186.js');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText.native-cdb9059e.js');
require('./kegText-90bd3366.js');
var text = require('./text.js');

var SectionWrap = function SectionWrap(_ref) {
  var children = _ref.children,
      numberOfLines = _ref.numberOfLines,
      showBorder = _ref.showBorder,
      styles = _ref.styles,
      type = _ref.type;
  type = type || 'section';
  return React__default.createElement(text.Text, {
    className: "keg-".concat(type, "-text"),
    numberOfLines: numberOfLines,
    style: [jsutils.get(styles, "text"), showBorder === false && jsutils.get(styles, "noBorder.text")]
  }, children);
};
var CardSection = function CardSection(_ref2) {
  var Section = _ref2.Section,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref2, ["Section"]);
  var type = props.type || 'section';
  return Section && React__default.createElement(view.View, {
    className: "keg-card-".concat(type),
    style: [jsutils.get(props, "styles.main"), props.showBorder === false && jsutils.get(props, "styles.noBorder.main")]
  }, renderFromType.renderFromType(Section, props, SectionWrap));
};

exports.CardSection = CardSection;
//# sourceMappingURL=cardSection.js.map
