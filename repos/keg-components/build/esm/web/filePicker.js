import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import React__default, { useState, useCallback, useRef, useEffect } from 'react';
import './isValidComponent.js';
import './renderFromType.js';
import './getPressHandler.js';
import './ensureClassArray.js';
import './getActiveOpacity.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import './useTextAccessibility.js';
import '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.native-67183179.js';
import './kegText-a280e501.js';
import './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import './useClassList-4be992cd.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-56c26a32.js';
import './touchable.js';
import { Button } from './button.js';
import './caption.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import './h5.js';
import './h6.js';
import './label.js';
import { P } from './p.js';
import './subtitle.js';
import { I as Input$1 } from './input.web-00da1b52.js';

var Input = StyleInjector(Input$1, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React__default.forwardRef(function (props, _ref) {
  var className = props.className,
      onChange = props.onChange,
      title = props.title,
      children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$showFile = props.showFile,
      showFile = _props$showFile === void 0 ? true : _props$showFile,
      onFilePicked = props.onFilePicked,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? 'filePicker.default' : _props$themePath,
      _props$buttonThemePat = props.buttonThemePath,
      buttonThemePath = _props$buttonThemePat === void 0 ? 'button.contained.default' : _props$buttonThemePat,
      capture = props.capture,
      _props$openOnMount = props.openOnMount,
      openOnMount = _props$openOnMount === void 0 ? false : _props$openOnMount,
      args = _objectWithoutProperties(props, ["className", "onChange", "title", "children", "style", "showFile", "onFilePicked", "themePath", "buttonThemePath", "capture", "openOnMount"]);
  var componentTheme = useThemePath(themePath);
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];
  var handleInputChange = useCallback(function (event) {
    onChange && onChange(event);
    var file = event.target.files[0];
    file && onFilePicked && onFilePicked(file);
    file && setFile(file);
  }, [onChange, onFilePicked, setFile]);
  var refToInput = useRef();
  var clickInput = useCallback(function () {
    return refToInput.current && refToInput.current.click();
  }, [refToInput]);
  useEffect(function () {
    openOnMount && clickInput();
  }, []);
  return React__default.createElement(View, {
    className: useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [get(componentTheme, 'main'), style]
  }, React__default.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React__default.createElement(P, {
    style: get(componentTheme, 'content.file')
  }, file.name), React__default.createElement(Input, _extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: get(componentTheme, 'content.input'),
    type: "file",
    capture: capture
  })));
});

export { FilePicker };
//# sourceMappingURL=filePicker.js.map
