import React__default from 'react';
import { SelectItem } from './item.js';
import { SelectView } from './selectView.js';
import './touchable.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import { w as withScrollIntoView } from './withScrollIntoView-bd1a8185.js';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native-web';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import './text.js';
import './kegText-9f80996b.js';
import './kegText.native-6bbad9e4.js';
import './useClassName-ed83df40.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import './useThemePath.js';
import './useThemeTypeAsClass-fb17085e.js';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';
import '@keg-hub/re-theme/reStyle';
import './view-9c41ec1e.js';
import './view.native-2491eb60.js';

var InViewSelectItem = withScrollIntoView(SelectItem, false);
var ScrollableSelect = function ScrollableSelect(_ref) {
  var items = _ref.items,
      styles = _ref.styles,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? true : _ref$visible,
      onSelect = _ref.onSelect,
      selectedItem = _ref.selectedItem,
      height = _ref.height;
  return React__default.createElement(SelectView, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    visible: visible,
    height: height !== null && height !== void 0 ? height : 150
  }, items.map(function (item) {
    var highlighted = selectedItem && item.key === selectedItem.key;
    return React__default.createElement(InViewSelectItem, {
      key: item.key || item.text,
      item: item,
      onSelect: onSelect,
      highlighted: highlighted,
      scrollIntoView: highlighted,
      style: styles === null || styles === void 0 ? void 0 : styles.content
    });
  }));
};

export { ScrollableSelect };
//# sourceMappingURL=scrollableSelect.js.map
