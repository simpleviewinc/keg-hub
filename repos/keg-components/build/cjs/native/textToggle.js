'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var text = require('./text.js');
var touchable = require('./touchable-548d2782.js');
var drawer = require('./drawer.js');
var view_native = require('./view.native-5d72f4dd.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var jsutils = require('@keg-hub/jsutils');
var isValidComponent = require('./isValidComponent.js');
require('@keg-hub/re-theme/colors');
var reTheme = require('@keg-hub/re-theme');
var expoLinearGradient = require('expo-linear-gradient');
require('./kegText-e1842e1b.js');
require('./kegText.js');
require('./useClassName.native-3d1a229b.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('./touchable.js');
require('./getPlatform-24228c6c.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var buildStyles = function buildStyles(theme, styleHelper) {
  var textToggleStyles = theme.get("textToggle", styleHelper === null || styleHelper === void 0 ? void 0 : styleHelper.styles);
  var align = 'flex-end';
  switch (styleHelper === null || styleHelper === void 0 ? void 0 : styleHelper.togglePosition) {
    case 'left':
      align = 'flex-start';
      break;
    case 'center':
      align = 'center';
      break;
  }
  return theme.get(textToggleStyles, {
    main: {
      alignItems: align
    }
  });
};
var TextToggle = function TextToggle(props) {
  var text$1 = props.text,
      styles = props.styles,
      _props$isExpandedInit = props.isExpandedInit,
      isExpandedInit = _props$isExpandedInit === void 0 ? false : _props$isExpandedInit;
      props.className;
      var CustomToggle = props.CustomToggle,
      onToggle = props.onToggle,
      _props$togglePosition = props.togglePosition,
      togglePosition = _props$togglePosition === void 0 ? 'right' : _props$togglePosition,
      _props$collapsedHeigh = props.collapsedHeight,
      collapsedHeight = _props$collapsedHeigh === void 0 ? 100 : _props$collapsedHeigh,
      _props$fadeColor = props.fadeColor,
      fadeColor = _props$fadeColor === void 0 ? 'white' : _props$fadeColor,
      _props$collapsedToggl = props.collapsedToggleText,
      collapsedToggleText = _props$collapsedToggl === void 0 ? 'show more' : _props$collapsedToggl,
      _props$expandedToggle = props.expandedToggleText,
      expandedToggleText = _props$expandedToggle === void 0 ? 'show less' : _props$expandedToggle;
  if (!text$1) return null;
  var _useState = React.useState(isExpandedInit),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];
  var styleHelper = React.useMemo(function () {
    return {
      styles: styles,
      togglePosition: togglePosition
    };
  }, [styles, togglePosition]);
  var mainStyle = reTheme.useStylesCallback(buildStyles, [togglePosition, styles], styleHelper);
  var _useState3 = React.useState(0),
      _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
      textMaxHeight = _useState4[0],
      setTextMaxHeight = _useState4[1];
  var showToggle = shouldDisplayToggler(collapsedHeight, textMaxHeight);
  var onToggleCb = React.useCallback(function () {
    setExpanded(!expanded);
    jsutils.isFunc(onToggle) && onToggle(!expanded);
  }, [expanded, onToggle]);
  var onTextLayout = React.useCallback(function (event) {
    var height = event.nativeEvent.layout.height;
    if (textMaxHeight === height) return;
    setTextMaxHeight(height);
  }, [textMaxHeight, setTextMaxHeight]);
  return React__default['default'].createElement(view_native.View, {
    style: [mainStyle.main],
    className: useClassList_native.useClassList()
  }, React__default['default'].createElement(drawer.Drawer, {
    collapsedHeight: collapsedHeight,
    toggled: expanded
  }, React__default['default'].createElement(text.Text, {
    style: mainStyle.text,
    onLayout: onTextLayout
  }, text$1)), showToggle && !expanded && React__default['default'].createElement(expoLinearGradient.LinearGradient, {
    colors: ['rgba(255,255,255,0)', fadeColor],
    style: mainStyle.linearGradient
  }), showToggle && React__default['default'].createElement(ToggleComponent, {
    onPress: onToggleCb,
    isExpanded: expanded,
    styles: mainStyle.toggleComponent,
    CustomComponent: CustomToggle,
    collapsedToggleText: collapsedToggleText,
    expandedToggleText: expandedToggleText
  }));
};
var shouldDisplayToggler = function shouldDisplayToggler(minHeight, textMaxHeight) {
  return !minHeight || textMaxHeight > minHeight;
};
var ToggleComponent = function ToggleComponent(_ref) {
  var onPress = _ref.onPress,
      styles = _ref.styles,
      CustomComponent = _ref.CustomComponent,
      isExpanded = _ref.isExpanded,
      expandedToggleText = _ref.expandedToggleText,
      collapsedToggleText = _ref.collapsedToggleText;
  var defaultText = isExpanded ? expandedToggleText : collapsedToggleText;
  return React__default['default'].createElement(touchable.Touchable, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onPress: onPress
  }, isValidComponent.isValidComponent(CustomComponent) ? React__default['default'].createElement(CustomComponent, {
    isExpanded: isExpanded
  }) : React__default['default'].createElement(text.Text, {
    style: styles === null || styles === void 0 ? void 0 : styles.text
  }, defaultText));
};

exports.TextToggle = TextToggle;
//# sourceMappingURL=textToggle.js.map
