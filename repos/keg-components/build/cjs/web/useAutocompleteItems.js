'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');

var ignoreCase = function ignoreCase(str) {
  return str.toLowerCase();
};
var ignoreAccents = function ignoreAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
var formatItem = function formatItem(item, index) {
  if (jsutils.isObj(item) && jsutils.isStr(item.text)) return {
    text: item.text,
    key: item.key || item.text,
    index: index
  };else if (jsutils.isStr(item)) return {
    text: item,
    key: item,
    index: index
  };else return null;
};
var trimStr = function trimStr(str) {
  return str === null || str === void 0 ? void 0 : str.trim();
};
var textMatches = function textMatches(text, item) {
  var itemComparisonStr = jsutils.pipeline(item.text, ignoreCase, ignoreAccents);
  var textComparisonStr = jsutils.pipeline(text, trimStr, ignoreCase, ignoreAccents);
  return itemComparisonStr.includes(textComparisonStr);
};
var getItemsMatchingText = function getItemsMatchingText(text, possibleValues) {
  if (!jsutils.isStr(text)) return [];
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
  var _useState = React.useState(null),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      selectedItem = _useState2[0],
      setSelectedItem = _useState2[1];
  var items = React.useMemo(function () {
    return jsutils.isEmpty(text) || (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text) === text ? [] : getItemsMatchingText(text, menuItems);
  }, [text, menuItems, selectedItem]);
  return [items, setSelectedItem, selectedItem];
};

exports.getItemsMatchingText = getItemsMatchingText;
exports.useAutocompleteItems = useAutocompleteItems;
//# sourceMappingURL=useAutocompleteItems.js.map
