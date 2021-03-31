import React from 'react';
import { SelectItem } from './item.js';
import { SelectView } from './selectView.js';
import './touchable.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import { w as withScrollIntoView } from './withScrollIntoView-5f891320.js';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native';
import './_rollupPluginBabelHelpers-b6f65682.js';
import './text.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useClassName-682bc33b.js';
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
import './useThemeTypeAsClass-fec5ff6f.js';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';
import '@keg-hub/re-theme/reStyle';
import './view-2274aefb.js';
import './view.native-a7f08b5b.js';

var InViewSelectItem = withScrollIntoView(SelectItem, false);
var ScrollableSelect = function ScrollableSelect(_ref) {
  var items = _ref.items,
      styles = _ref.styles,
      _ref$visible = _ref.visible,
      visible = _ref$visible === void 0 ? true : _ref$visible,
      onSelect = _ref.onSelect,
      selectedItem = _ref.selectedItem,
      height = _ref.height;
  return React.createElement(SelectView, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    visible: visible,
    height: height !== null && height !== void 0 ? height : 150
  }, items.map(function (item) {
    var highlighted = selectedItem && item.key === selectedItem.key;
    return React.createElement(InViewSelectItem, {
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
