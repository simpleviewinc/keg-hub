import { d as _objectWithoutProperties, b as _slicedToArray, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { get } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-fec5ff6f.js';
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
import './text.js';
import { Button } from './button.js';
import { V as View } from './view-2274aefb.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { I as Input$1 } from './input.web-14b4a9e4.js';
import '@keg-hub/re-theme';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';
import './ensureClassArray.js';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './handleRefUpdate.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './touchable.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getPressHandler.js';
import './getActiveOpacity.js';
import './view.native-a7f08b5b.js';

var Input = StyleInjector(Input$1, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React.forwardRef(function (props, _ref) {
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
  return React.createElement(View, {
    className: useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [get(componentTheme, 'main'), style]
  }, React.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React.createElement(P, {
    style: get(componentTheme, 'content.file')
  }, file.name), React.createElement(Input, _extends({}, args, {
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
