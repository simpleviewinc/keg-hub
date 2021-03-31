import { d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useCallback } from 'react';
import { mod } from '@keg-hub/jsutils';
import { I as Input } from './input-92fdaee4.js';
import './getInputValue.js';
import './getReadOnly.js';
import '@keg-hub/re-theme/colors';
import './useInputHandlers.js';
import './validateFunctions.js';
import './usePressHandlers.js';
import './useThemePath.js';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';
import './input-0746c9bb.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';

var useKeyPressHandler = function useKeyPressHandler(currentIndex, setSelectedItem, items) {
  var up = 'ArrowUp';
  var down = 'ArrowDown';
  return useCallback(function (_ref) {
    var key = _ref.key;
    if (key !== up && key !== down) return;
    var delta = key === down ? 1 : -1;
    var nextIndex = mod(currentIndex + delta || 0, items.length);
    items[nextIndex] && setSelectedItem(items[nextIndex]);
  }, [currentIndex, setSelectedItem, items]);
};
var AutocompleteInput = function AutocompleteInput(_ref2) {
  var highlightedIndex = _ref2.highlightedIndex,
      highlightItem = _ref2.highlightItem,
      selectItem = _ref2.selectItem,
      items = _ref2.items,
      props = _objectWithoutProperties(_ref2, ["highlightedIndex", "highlightItem", "selectItem", "items"]);
  var onKeyPress = useKeyPressHandler(highlightedIndex, highlightItem, items);
  var onEnterPress = useCallback(function () {
    return selectItem === null || selectItem === void 0 ? void 0 : selectItem(items[highlightedIndex]);
  }, [items, selectItem]);
  return React.createElement(Input, _extends({
    onKeyPress: onKeyPress,
    onSubmitEditing: onEnterPress,
    useTouch: false
  }, props));
};

export { AutocompleteInput };
//# sourceMappingURL=autocompleteInput.js.map
