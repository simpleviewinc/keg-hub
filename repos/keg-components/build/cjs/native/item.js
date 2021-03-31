'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var touchable = require('./touchable-3f00e0ff.js');
var text = require('./text.js');
var renderFromType = require('./renderFromType.js');
var getPressHandler = require('./getPressHandler.js');
var getActiveOpacity = require('./getActiveOpacity.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useThemeTypeAsClass_native = require('./useThemeTypeAsClass.native-90f04031.js');
var reTheme = require('@keg-hub/re-theme');
var reStyle = require('@keg-hub/re-theme/reStyle');
require('./touchable.js');
require('./useClassName.native-3d1a229b.js');
require('@keg-hub/re-theme/styleInjector');
require('./kegText-965ef4d3.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
var Button = React__default['default'].forwardRef(function (props, ref) {
  props.className;
      var children = props.children,
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
  return React__default['default'].createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass_native.useThemeTypeAsClass()
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

var SelectButton = reStyle.reStyle(Button, 'styles')(function (theme, props) {
  var palette = theme.colors.palette;
  var content = {
    color: palette.black01,
    fontWeight: 'normal',
    alignSelf: 'start'
  };
  var main = {
    borderRadius: 0,
    backgroundColor: palette.white01
  };
  var highlighted = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, main), {}, {
    backgroundColor: palette.gray01
  });
  return {
    default: {
      content: content,
      main: props.highlighted ? highlighted : main
    },
    active: {
      content: content,
      main: main
    },
    hover: {
      content: content,
      main: highlighted
    }
  };
});
var SelectItem = React__default['default'].forwardRef(function (props, ref) {
  var item = props.item,
      _props$onSelect = props.onSelect,
      onSelect = _props$onSelect === void 0 ? jsutils.noOp : _props$onSelect,
      _props$highlighted = props.highlighted,
      highlighted = _props$highlighted === void 0 ? false : _props$highlighted,
      styles = props.styles;
  var handlePress = React.useCallback(function () {
    return onSelect(item);
  }, [item, onSelect]);
  return React__default['default'].createElement(SelectButton, {
    ref: ref,
    content: item.text,
    onPress: handlePress,
    styles: styles,
    highlighted: highlighted
  });
});

exports.SelectItem = SelectItem;
//# sourceMappingURL=item.js.map
