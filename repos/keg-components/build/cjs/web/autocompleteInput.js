'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var input = require('./input-e65999e6.js');
require('./getInputValue.js');
require('./getReadOnly.js');
require('@keg-hub/re-theme/colors');
require('./useInputHandlers.js');
require('./validateFunctions.js');
require('./usePressHandlers.js');
require('./useThemePath.js');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native-web');
require('./input-9de20726.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["highlightedIndex", "highlightItem", "selectItem", "items"];
var useKeyPressHandler = function useKeyPressHandler(currentIndex, setSelectedItem, items) {
  var up = 'ArrowUp';
  var down = 'ArrowDown';
  return React.useCallback(function (_ref) {
    var key = _ref.key;
    if (key !== up && key !== down) return;
    var delta = key === down ? 1 : -1;
    var nextIndex = jsutils.mod(currentIndex + delta || 0, items.length);
    items[nextIndex] && setSelectedItem(items[nextIndex]);
  }, [currentIndex, setSelectedItem, items]);
};
var AutocompleteInput = function AutocompleteInput(_ref2) {
  var highlightedIndex = _ref2.highlightedIndex,
      highlightItem = _ref2.highlightItem,
      selectItem = _ref2.selectItem,
      items = _ref2.items,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref2, _excluded);
  var onKeyPress = useKeyPressHandler(highlightedIndex, highlightItem, items);
  var onEnterPress = React.useCallback(function () {
    return selectItem === null || selectItem === void 0 ? void 0 : selectItem(items[highlightedIndex]);
  }, [items, selectItem]);
  return React__default['default'].createElement(input.Input, _rollupPluginBabelHelpers._extends({
    onKeyPress: onKeyPress,
    onSubmitEditing: onEnterPress,
    useTouch: false
  }, props));
};

exports.AutocompleteInput = AutocompleteInput;
//# sourceMappingURL=autocompleteInput.js.map
