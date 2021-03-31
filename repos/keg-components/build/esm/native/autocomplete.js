import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useCallback } from 'react';
import { noOpObj, noPropArr } from '@keg-hub/jsutils';
import { getTextFromChangeEvent } from './getTextFromChangeEvent.js';
import '@keg-hub/re-theme/colors';
import { useAutocompleteItems } from './useAutocompleteItems.js';
import '@keg-hub/re-theme';
import './useThemeWithHeight.js';
import 'react-native';
import { reStyle } from '@keg-hub/re-theme/reStyle';
import { ScrollableSelect } from './scrollableSelect.js';
import { V as View } from './view.native-b0b1ddd4.js';
import { AutocompleteInput } from './autocompleteInput.js';
import './touchable-9cc6e181.js';
import { w as withOutsideDetect } from './withOutsideDetect-8bf57fab.js';
import './useThemePath.js';
import './item.js';
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
import './useThemeTypeAsClass.native-a05b9a50.js';
import './selectView.js';
import './withScrollIntoView.js';
import './input-db203f81.js';
import './getInputValue.js';
import './getReadOnly.js';
import './useInputHandlers.js';
import './validateFunctions.js';
import './usePressHandlers.js';
import './input-b54ba952.js';
import './touchable.js';

var FloatingScrollableSelect = reStyle(ScrollableSelect, 'styles')(function () {
  return {
    main: {
      position: 'absolute',
      zIndex: 9999
    }
  };
});
var AutocompleteView = withOutsideDetect(View);
var Autocomplete = function Autocomplete(props) {
  var _styles$content, _styles$content2;
  var onChange = props.onChange,
      onSelect = props.onSelect,
      _props$placeholder = props.placeholder,
      placeholder = _props$placeholder === void 0 ? '' : _props$placeholder,
      _props$text = props.text,
      text = _props$text === void 0 ? null : _props$text,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? noOpObj : _props$styles,
      _props$inputRef = props.inputRef,
      inputRef = _props$inputRef === void 0 ? null : _props$inputRef,
      _props$values = props.values,
      values = _props$values === void 0 ? noPropArr : _props$values,
      menuHeight = props.menuHeight,
      inputProps = _objectWithoutProperties(props, ["onChange", "onSelect", "placeholder", "text", "styles", "inputRef", "values", "menuHeight"]);
  var _useState = useState(text || ''),
      _useState2 = _slicedToArray(_useState, 2),
      inputText = _useState2[0],
      updateText = _useState2[1];
  var _useAutocompleteItems = useAutocompleteItems(inputText, values),
      _useAutocompleteItems2 = _slicedToArray(_useAutocompleteItems, 3),
      autocompleteItems = _useAutocompleteItems2[0],
      setSelectedItem = _useAutocompleteItems2[1],
      selectedItem = _useAutocompleteItems2[2];
  var onSelectItem = useCallback(function (item) {
    updateText((item === null || item === void 0 ? void 0 : item.text) || '');
    setSelectedItem(item);
    item && (onSelect === null || onSelect === void 0 ? void 0 : onSelect(item));
  }, [setSelectedItem, updateText]);
  var handleInputChange = useCallback(function (event) {
    var text = getTextFromChangeEvent(event);
    updateText(text);
    onChange === null || onChange === void 0 ? void 0 : onChange(text);
  }, [onChange, updateText]);
  var onOutsideClick = useCallback(function () {
    autocompleteItems.length && updateText(selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.text);
  }, [onSelectItem, autocompleteItems]);
  return React.createElement(AutocompleteView, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onOutsideClick: onOutsideClick
  }, React.createElement(AutocompleteInput, _extends({
    highlightedIndex: selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.index,
    highlightItem: setSelectedItem,
    selectItem: onSelectItem,
    items: autocompleteItems,
    placeholder: placeholder,
    onChange: handleInputChange,
    value: inputText,
    ref: inputRef,
    style: styles === null || styles === void 0 ? void 0 : (_styles$content = styles.content) === null || _styles$content === void 0 ? void 0 : _styles$content.input
  }, inputProps)), React.createElement(View, null, React.createElement(FloatingScrollableSelect, {
    height: menuHeight,
    styles: styles === null || styles === void 0 ? void 0 : (_styles$content2 = styles.content) === null || _styles$content2 === void 0 ? void 0 : _styles$content2.menu,
    visible: autocompleteItems.length > 0,
    items: autocompleteItems,
    onSelect: onSelectItem,
    selectedItem: selectedItem,
    animationDuration: 100
  })));
};

export { Autocomplete };
//# sourceMappingURL=autocomplete.js.map
