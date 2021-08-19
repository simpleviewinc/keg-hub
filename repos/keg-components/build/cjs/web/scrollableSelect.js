'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var item = require('./item.js');
var selectView = require('./selectView.js');
require('./touchable.js');
require('@keg-hub/re-theme');
require('@keg-hub/jsutils');
var withScrollIntoView = require('./withScrollIntoView-0faf5e7e.js');
require('@keg-hub/re-theme/colors');
require('./useThemeWithHeight.js');
require('react-native-web');
require('./_rollupPluginBabelHelpers-95f0bff4.js');
require('./text.js');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useClassName-eec4a5f1.js');
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
require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./colors-da502c66.js');
require('./useClassList-89a8dbd4.js');
require('@keg-hub/re-theme/reStyle');
require('./view-3fcb25db.js');
require('./view.native-895f9104.js');

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
