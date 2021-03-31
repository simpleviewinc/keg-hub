import React from 'react';
import { SelectItem } from './item.js';
import { SelectView } from './selectView.js';
import './touchable-9cc6e181.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import { withScrollIntoView } from './withScrollIntoView.js';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native';
import './_rollupPluginBabelHelpers-b6f65682.js';
import './text.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import './useThemePath.js';
import './useThemeTypeAsClass.native-a05b9a50.js';
import '@keg-hub/re-theme/reStyle';
import './view.native-b0b1ddd4.js';
import './touchable.js';

var InViewSelectItem = withScrollIntoView(SelectItem);
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
