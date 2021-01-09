'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-3f09043e.js');
var text = require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./touchable.js');
var touchable$1 = require('./touchable-d386e5c0.js');
var drawer = require('./drawer.js');
var LinearGradient = _interopDefault(require('react-native-linear-gradient'));

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
      isExpandedInit = _props$isExpandedInit === void 0 ? false : _props$isExpandedInit,
      className = props.className,
      CustomToggle = props.CustomToggle,
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
  return React__default.createElement(view_native.View, {
    style: [mainStyle.main],
    className: useClassList_native.useClassList()
  }, React__default.createElement(drawer.Drawer, {
    collapsedHeight: collapsedHeight,
    toggled: expanded
  }, React__default.createElement(text.Text, {
    style: mainStyle.text,
    onLayout: onTextLayout
  }, text$1)), showToggle && !expanded && React__default.createElement(LinearGradient, {
    colors: ['rgba(255,255,255,0)', fadeColor],
    style: mainStyle.linearGradient
  }), showToggle && React__default.createElement(ToggleComponent, {
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
  return React__default.createElement(touchable$1.Touchable, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onPress: onPress
  }, isValidComponent.isValidComponent(CustomComponent) ? React__default.createElement(CustomComponent, {
    isExpanded: isExpanded
  }) : React__default.createElement(text.Text, {
    style: styles === null || styles === void 0 ? void 0 : styles.text
  }, defaultText));
};

exports.TextToggle = TextToggle;
//# sourceMappingURL=textToggle.js.map
