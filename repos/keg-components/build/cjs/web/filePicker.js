'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native-web');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
var p = require('./p.js');
require('./subtitle.js');
require('./text.js');
var button = require('./button.js');
var view = require('./view-3fcb25db.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var input_web = require('./input.web-369be1b2.js');
require('@keg-hub/re-theme');
require('./colors-da502c66.js');
require('./useClassList-89a8dbd4.js');
require('./ensureClassArray.js');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./handleRefUpdate.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./touchable.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getPressHandler.js');
require('./getActiveOpacity.js');
require('./view.native-895f9104.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "onChange", "title", "children", "style", "showFile", "onFilePicked", "themePath", "buttonThemePath", "capture", "openOnMount"];
var Input = styleInjector.StyleInjector(input_web.Input, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React__default['default'].forwardRef(function (props, _ref) {
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
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var componentTheme = useThemePath.useThemePath(themePath);
  var _useState = React.useState({}),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];
  var handleInputChange = React.useCallback(function (event) {
    onChange && onChange(event);
    var file = event.target.files[0];
    file && onFilePicked && onFilePicked(file);
    file && setFile(file);
  }, [onChange, onFilePicked, setFile]);
  var refToInput = React.useRef();
  var clickInput = React.useCallback(function () {
    return refToInput.current && refToInput.current.click();
  }, [refToInput]);
  React.useEffect(function () {
    openOnMount && clickInput();
  }, []);
  return React__default['default'].createElement(view.View, {
    className: useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [jsutils.get(componentTheme, 'main'), style]
  }, React__default['default'].createElement(button.Button, {
    content: title,
    onClick: clickInput,
    style: jsutils.get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React__default['default'].createElement(p.P, {
    style: jsutils.get(componentTheme, 'content.file')
  }, file.name), React__default['default'].createElement(Input, _rollupPluginBabelHelpers._extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: jsutils.get(componentTheme, 'content.input'),
    type: "file",
    capture: capture
  })));
});

exports.FilePicker = FilePicker;
//# sourceMappingURL=filePicker.js.map
