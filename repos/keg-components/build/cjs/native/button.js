'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('./defaults-75e5d8bf.js');
require('./buildColorStyles-ca288c4b.js');
require('@keg-hub/re-theme/colors');
require('./platformFlatten-3e8e9019.js');
require('./buildTheme.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
var renderFromType = require('./renderFromType.js');
var getPressHandler = require('./getPressHandler.js');
var getActiveOpacity = require('./getActiveOpacity.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./useTextAccessibility.js');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('./kegText-12bc89e1.js');
var text = require('./text.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useThemeTypeAsClass_native = require('./useThemeTypeAsClass.native-90f04031.js');
require('./touchable.js');
var touchable$1 = require('./touchable-54fbb23a.js');

var getChildren = function getChildren(Children) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return renderFromType.renderFromType(Children, {
    style: styles.content
  }, text.Text);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, mainStyles), jsutils.get(btnStyles, 'disabled.main')) : mainStyles;
};
var Button = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      content = props.content,
      onClick = props.onClick,
      onPress = props.onPress,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "children", "content", "onClick", "onPress", "styles", "type", "themePath"]);
  var btnStyles = useThemePath.useThemePath(themePath || "button.contained.".concat(type), styles);
  var _useThemeHover = reTheme.useThemeHover(jsutils.get(btnStyles, 'default', {}), jsutils.get(btnStyles, 'hover'), {
    ref: ref
  }),
      _useThemeHover2 = _rollupPluginBabelHelpers._slicedToArray(_useThemeHover, 2),
      hoverRef = _useThemeHover2[0],
      hoverStyles = _useThemeHover2[1];
  var _useThemeActive = reTheme.useThemeActive(hoverStyles, jsutils.get(btnStyles, 'active'), {
    ref: hoverRef
  }),
      _useThemeActive2 = _rollupPluginBabelHelpers._slicedToArray(_useThemeActive, 2),
      themeRef = _useThemeActive2[0],
      themeStyles = _useThemeActive2[1];
  return React__default.createElement(touchable$1.Touchable, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass_native.useThemeTypeAsClass()
  }, elProps, {
    touchRef: themeRef,
    style: checkDisabled(themeStyles.main, btnStyles, props.disabled),
    children: getChildren(children || content, themeStyles)
  }, getPressHandler.getPressHandler(false, onClick, onPress), getActiveOpacity.getActiveOpacity(false, props, btnStyles)));
});

exports.Button = Button;
//# sourceMappingURL=button.js.map
