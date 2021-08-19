'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var view = require('./view-3fcb25db.js');
var text = require('./text.js');
var jsutils = require('@keg-hub/jsutils');
require('./icon-c7ba25ca.js');
var touchableIcon = require('./touchableIcon.js');
var svgIcon = require('./svgIcon-bca364ff.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var reactNativeWeb = require('react-native-web');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./view.native-895f9104.js');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('@keg-hub/re-theme');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./useClassList-89a8dbd4.js');
require('./withTouch.js');
require('./touchable.js');
require('./svgIcon.native-82b9d93c.js');
require('react-native-svg-web');
require('./colors-da502c66.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Copy = function Copy(props) {
  return React__namespace.createElement(svgIcon.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M433.941 65.941l-51.882-51.882A48 48 0 00348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 00-14.059-33.941zM266 464H54a6 6 0 01-6-6V150a6 6 0 016-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 01-6 6zm128-96H182a6 6 0 01-6-6V54a6 6 0 016-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 01-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 011.757 4.243V112z"
  }));
};

var TextBox = function TextBox(props) {
  var className = props.className,
      _props$maxLines = props.maxLines,
      maxLines = _props$maxLines === void 0 ? 100 : _props$maxLines,
      styles = props.styles,
      text$1 = props.text,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "textBox.outlined.".concat(type) : _props$themePath,
      _props$useClipboard = props.useClipboard,
      useClipboard = _props$useClipboard === void 0 ? false : _props$useClipboard;
  var style = useThemePath.useThemePath(themePath, styles);
  return React__default['default'].createElement(view.View, {
    className: useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-textbox', className),
    style: style.main
  }, React__default['default'].createElement(view.View, {
    className: "keg-textbox-container",
    style: jsutils.get(style, 'content.wrapper')
  }, React__default['default'].createElement(text.Text, {
    className: "keg-textbox-text",
    numberOfLines: maxLines,
    style: jsutils.get(style, 'content.text')
  }, text$1 || '')), React__default['default'].createElement(text.Text, null, useClipboard && text$1 && React__default['default'].createElement(touchableIcon.TouchableIcon, {
    Component: Copy,
    size: 15,
    className: "keg-textbox-clipboard",
    touchStyle: jsutils.get(style, 'content.clipboard'),
    onPress: function onPress(_) {
      return text$1 && reactNativeWeb.Clipboard.setString(text$1);
    }
  })));
};

exports.TextBox = TextBox;
//# sourceMappingURL=textBox.js.map
