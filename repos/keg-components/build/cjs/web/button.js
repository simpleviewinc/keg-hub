'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./colors-3022218c.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
var renderFromType = require('./renderFromType.js');
var getPressHandler = require('./getPressHandler.js');
require('./ensureClassArray.js');
var getActiveOpacity = require('./getActiveOpacity.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextAccessibility.js');
require('./kegText.native-dfad83ae.js');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-b42d09ba.js');
var text = require('./text.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useClassList-9eaefcd6.js');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-103ed294.js');
var touchable = require('./touchable.js');

var getChildren = function getChildren(Children, _ref) {
  var styles = _ref.styles,
      selectable = _ref.selectable;
  return renderFromType.renderFromType(Children, {
    style: styles === null || styles === void 0 ? void 0 : styles.content,
    selectable: selectable
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
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? false : _props$showFeedback,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      activeOpacity = props.activeOpacity,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$selectable = props.selectable,
      selectable = _props$selectable === void 0 ? false : _props$selectable,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "children", "content", "onClick", "onPress", "styles", "showFeedback", "type", "themePath", "activeOpacity", "disabled", "selectable"]);
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
  return React__default.createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-button', className)
  }, elProps, {
    disabled: disabled,
    touchRef: themeRef,
    showFeedback: jsutils.isNum(activeOpacity) || showFeedback,
    style: checkDisabled(themeStyles.main, btnStyles, disabled),
    children: getChildren(children || content, {
      styles: themeStyles,
      selectable: selectable
    })
  }, getPressHandler.getPressHandler(false, onClick, onPress), getActiveOpacity.getActiveOpacity(false, props, btnStyles)));
});

exports.Button = Button;
//# sourceMappingURL=button.js.map
