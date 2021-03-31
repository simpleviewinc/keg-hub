'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var getTextFromChangeEvent = require('./getTextFromChangeEvent.js');
require('@keg-hub/re-theme/colors');
var useAutocompleteItems = require('./useAutocompleteItems.js');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native');
var reStyle = require('@keg-hub/re-theme/reStyle');
var scrollableSelect = require('./scrollableSelect.js');
var view = require('./view-276572bd.js');
var autocompleteInput = require('./autocompleteInput.js');
require('./touchable.js');
var withOutsideDetect = require('./withOutsideDetect-7305c734.js');
require('./useThemePath.js');
require('./item.js');
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
require('./useThemeTypeAsClass-a9284938.js');
require('./colors-da502c66.js');
require('./useClassList-89a8dbd4.js');
require('./selectView.js');
require('./withScrollIntoView-91d98602.js');
require('./view.native-99366b4b.js');
require('./input-e99fee30.js');
require('./getInputValue.js');
require('./getReadOnly.js');
require('./useInputHandlers.js');
require('./validateFunctions.js');
require('./usePressHandlers.js');
require('./input-f586181b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var FloatingScrollableSelect = reStyle.reStyle(scrollableSelect.ScrollableSelect, 'styles')(function () {
  return {
    main: {
      position: 'absolute',
      zIndex: 9999
    }
  };
});
var AutocompleteView = withOutsideDetect.withOutsideDetect(view.View);
var Autocomplete = function Autocomplete(props) {
  var _styles$content, _styles$content2;
  var onChange = props.onChange,
      onSelect = props.onSelect,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
      _props$text = props.text,
      text = _props$text === void 0 ? null : _props$text,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? jsutils.noOpObj : _props$styles,
      _props$inputRef = props.inputRef,
      inputRef = _props$inputRef === void 0 ? null : _props$inputRef,
      _props$values = props.values,
      values = _props$values === void 0 ? jsutils.noPropArr : _props$values,
      menuHeight = props.menuHeight,
      inputProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["onChange", "onSelect", "placeholder", "text", "styles", "inputRef", "values", "menuHeight"]);
  var _useState = React.useState(text || ''),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      inputText = _useState2[0],
      updateText = _useState2[1];
  var _useAutocompleteItems = useAutocompleteItems.useAutocompleteItems(inputText, values),
      _useAutocompleteItems2 = _rollupPluginBabelHelpers._slicedToArray(_useAutocompleteItems, 3),
      autocompleteItems = _useAutocompleteItems2[0],
      setSelectedItem = _useAutocompleteItems2[1],
      selectedItem = _useAutocompleteItems2[2];
  var onSelectItem = React.useCallback(function (item) {
    updateText((item === null || item === void 0 ? void 0 : item.text) || '');
    setSelectedItem(item);
    item && (onSelect === null || onSelect === void 0 ? void 0 : onSelect(item));
  }, [setSelectedItem, updateText]);
  var handleInputChange = React.useCallback(function (event) {
    var text = getTextFromChangeEvent.getTextFromChangeEvent(event);
    updateText(text);
    onChange === null || onChange === void 0 ? void 0 : onChange(text);
  }, [onChange, updateText]);
  var onOutsideClick = React.useCallback(function () {
    autocompleteItems.length && updateText(selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text);
  }, [onSelectItem, autocompleteItems]);
  return React__default['default'].createElement(AutocompleteView, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onOutsideClick: onOutsideClick
  }, React__default['default'].createElement(autocompleteInput.AutocompleteInput, _rollupPluginBabelHelpers._extends({
    highlightedIndex: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.index,
    highlightItem: setSelectedItem,
    selectItem: onSelectItem,
    items: autocompleteItems,
    placeholder: placeholder,
    onChange: handleInputChange,
    value: inputText,
    ref: inputRef,
    style: styles === null || styles === void 0 ? void 0 : (_styles$content = styles.content) === null || _styles$content === void 0 ? void 0 : _styles$content.input
  }, inputProps)), React__default['default'].createElement(view.View, null, React__default['default'].createElement(FloatingScrollableSelect, {
    height: menuHeight,
    styles: styles === null || styles === void 0 ? void 0 : (_styles$content2 = styles.content) === null || _styles$content2 === void 0 ? void 0 : _styles$content2.menu,
    visible: autocompleteItems.length > 0,
    items: autocompleteItems,
    onSelect: onSelectItem,
    selectedItem: selectedItem,
    animationDuration: 100
  })));
};

exports.Autocomplete = Autocomplete;
//# sourceMappingURL=autocomplete.js.map
