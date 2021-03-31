'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var item = require('./item.js');
var selectView = require('./selectView.js');
require('./touchable.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
var withScrollIntoView = require('./withScrollIntoView-91d98602.js');
require('@keg-hub/re-theme/colors');
require('./useThemeWithHeight.js');
require('react-native');
require('./_rollupPluginBabelHelpers-bb55ccbe.js');
require('./text.js');
require('./kegText-f2cfdfd4.js');
require('./kegText.native-1994a0b7.js');
require('./useClassName-51ea3221.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('./useThemePath.js');
require('./useThemeTypeAsClass-a9284938.js');
require('./colors-da502c66.js');
require('./useClassList-89a8dbd4.js');
require('@keg-hub/re-theme/reStyle');
require('./view-276572bd.js');
require('./view.native-99366b4b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var InViewSelectItem = withScrollIntoView.withScrollIntoView(item.SelectItem, false);
var ScrollableSelect = function ScrollableSelect(_ref) {
  var items = _ref.items,
      styles = _ref.styles,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? true : _ref$visible,
      onSelect = _ref.onSelect,
      selectedItem = _ref.selectedItem,
      height = _ref.height;
  return React__default['default'].createElement(selectView.SelectView, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    visible: visible,
    height: height !== null && height !== void 0 ? height : 150
  }, items.map(function (item) {
    var highlighted = selectedItem && item.key === selectedItem.key;
    return React__default['default'].createElement(InViewSelectItem, {
      key: item.key || item.text,
      item: item,
      onSelect: onSelect,
      highlighted: highlighted,
      scrollIntoView: highlighted,
      style: styles === null || styles === void 0 ? void 0 : styles.content
    });
  }));
};

exports.ScrollableSelect = ScrollableSelect;
//# sourceMappingURL=scrollableSelect.js.map
