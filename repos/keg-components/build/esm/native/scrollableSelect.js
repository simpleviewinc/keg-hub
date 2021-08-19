import React__default from 'react';
import { SelectItem } from './item.js';
import { SelectView } from './selectView.js';
import './touchable-ec804bf8.js';
import '@keg-hub/re-theme';
import '@keg-hub/jsutils';
import { withScrollIntoView } from './withScrollIntoView.js';
import '@keg-hub/re-theme/colors';
import './useThemeWithHeight.js';
import 'react-native';
import './_rollupPluginBabelHelpers-b49fe34a.js';
import './text.js';
import './kegText-97d3d571.js';
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
import './view.native-f7a27d15.js';
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
