'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var isValidComponent = require('./isValidComponent.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-6b6da47b.js');
require('./view.native-e2bb0f89.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-ea13da55.js');
require('./useTextAccessibility.js');
require('./kegText.native-dfad83ae.js');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText-b42d09ba.js');
var text = require('./text.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList = require('./useClassList-9eaefcd6.js');
var touchable = require('./touchable.js');
var drawer = require('./drawer.js');

var LinearGradient = function LinearGradient(props) {
  var _props$start = props.start,
      start = _props$start === void 0 ? {
    x: 0.5,
    y: 0
  } : _props$start,
      _props$end = props.end,
      end = _props$end === void 0 ? {
    x: 0.5,
    y: 1
  } : _props$end,
      _props$colors = props.colors,
      colors = _props$colors === void 0 ? jsutils.noPropArr : _props$colors,
      _props$locations = props.locations,
      locations = _props$locations === void 0 ? jsutils.noPropArr : _props$locations,
      _props$useAngle = props.useAngle,
      useAngle = _props$useAngle === void 0 ? false : _props$useAngle,
      angleCenter = props.angleCenter,
      _props$angle = props.angle,
      angle = _props$angle === void 0 ? 0 : _props$angle,
      style = props.style,
      children = props.children,
      className = props.className,
      otherProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["start", "end", "colors", "locations", "useAngle", "angleCenter", "angle", "style", "children", "className"]);
  var _useState = React.useState(1),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      width = _useState2[0],
      setWidth = _useState2[1];
  var _useState3 = React.useState(1),
      _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
      height = _useState4[0],
      setHeight = _useState4[1];
  var measure = React.useCallback(function (_ref) {
    var nativeEvent = _ref.nativeEvent;
    setWidth(nativeEvent.layout.width);
    setHeight(nativeEvent.layout.height);
  }, [setWidth, setHeight]);
  var newAngle = useAngle && angle ? "".concat(angle, "deg") : calculateAngle(width, height, start, end);
  return React__default.createElement(view.View, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList("keg-linear-gradient", className)
  }, otherProps, {
    style: [style, {
      backgroundImage: "linear-gradient(".concat(newAngle, ",").concat(getColors(colors, locations), ")")
    }],
    onLayout: measure
  }), children);
};
var calculateAngle = function calculateAngle(width, height, start, end) {
  var newAngle = Math.atan2(width * (end.y - start.y), height * (end.x - start.x)) + Math.PI / 2;
  return newAngle + 'rad';
};
var getColors = function getColors() {
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noPropArr;
  var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noPropArr;
  return colors.map(function (color, index) {
    var location = locations[index];
    var locationStyle = '';
    if (location) {
      locationStyle = ' ' + location * 100 + '%';
    }
    return color + locationStyle;
  }).join(',');
};

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
  return React__default.createElement(view.View, {
    style: [mainStyle.main],
    className: useClassList.useClassList('keg-text-toggle', className)
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
  return React__default.createElement(touchable.Touchable, {
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
