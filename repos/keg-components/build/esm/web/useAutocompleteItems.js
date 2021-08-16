import { b as _slicedToArray } from './_rollupPluginBabelHelpers-b49fe34a.js';
import { isStr, isEmpty, isObj, pipeline } from '@keg-hub/jsutils';
import { useState, useMemo } from 'react';

var ignoreCase = function ignoreCase(str) {
  return str.toLowerCase();
};
var ignoreAccents = function ignoreAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
var formatItem = function formatItem(item, index) {
  if (isObj(item) && isStr(item.text)) return {
    text: item.text,
    key: item.key || item.text,
    index: index
  };else if (isStr(item)) return {
    text: item,
    key: item,
    index: index
  };else return null;
};
var trimStr = function trimStr(str) {
  return str === null || str === void 0 ? void 0 : str.trim();
};
var textMatches = function textMatches(text, item) {
  var itemComparisonStr = pipeline(item.text, ignoreCase, ignoreAccents);
  var textComparisonStr = pipeline(text, trimStr, ignoreCase, ignoreAccents);
  return itemComparisonStr.includes(textComparisonStr);
};
var getItemsMatchingText = function getItemsMatchingText(text, possibleValues) {
  if (!isStr(text)) return [];
  var result = possibleValues.reduce(function (state, nextItem) {
    var formattedItem = formatItem(nextItem, state.counter);
    if (!formattedItem) return state;
    if (textMatches(text, formattedItem) && !state.keys.has(formattedItem.key)) {
      state.keys.add(formattedItem.key);
      state.arr.push(formattedItem);
      state.counter++;
    }
    return state;
  }, {
    arr: [],
    keys: new Set(),
    counter: 0
  });
  return result.arr;
};
var useAutocompleteItems = function useAutocompleteItems(text, menuItems) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selectedItem = _useState2[0],
      setSelectedItem = _useState2[1];
  var items = useMemo(function () {
    return isEmpty(text) || (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text) === text ? [] : getItemsMatchingText(text, menuItems);
  }, [text, menuItems, selectedItem]);
  return [items, setSelectedItem, selectedItem];
};

export { getItemsMatchingText, useAutocompleteItems };
//# sourceMappingURL=useAutocompleteItems.js.map
