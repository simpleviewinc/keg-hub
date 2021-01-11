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
var reactNative = require('react-native');
var useClassName = require('./useClassName-6b6da47b.js');
require('./view.native-e2bb0f89.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-ea13da55.js');
require('@keg-hub/re-theme');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');

var noAnimate = function noAnimate(toggled, current, collapsedHeight, contentMaxHeight) {
  return !toggled && current === collapsedHeight || toggled && current === contentMaxHeight;
};
var Drawer = function Drawer(props) {
  var Element = props.Element,
      styles = props.styles,
      toggled = props.toggled,
      className = props.className,
      _props$type = props.type,
      type = _props$type === void 0 ? 'timing' : _props$type,
      _props$config = props.config,
      config = _props$config === void 0 ? jsutils.noOpObj : _props$config,
      _props$collapsedHeigh = props.collapsedHeight,
      collapsedHeight = _props$collapsedHeigh === void 0 ? 0 : _props$collapsedHeigh,
      childProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["Element", "styles", "toggled", "className", "type", "config", "collapsedHeight"]);
  var contentMaxHeight = React.useRef(null);
  var _useState = React.useState(new reactNative.Animated.Value(collapsedHeight)),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];
  var setMaxHeight = React.useCallback(function (event) {
    var maxHeight = event.nativeEvent.layout.height;
    if (contentMaxHeight.current === maxHeight) return;
    contentMaxHeight.current = maxHeight;
    toggled && setAnimation(new reactNative.Animated.Value(maxHeight));
  }, [contentMaxHeight, toggled, setAnimation]);
  React.useLayoutEffect(function () {
    if (noAnimate(toggled, animation._value, collapsedHeight, contentMaxHeight.current)) return;
    var heightChanges = toggled ? {
      from: collapsedHeight,
      to: contentMaxHeight.current
    } : {
      from: contentMaxHeight.current,
      to: collapsedHeight
    };
    animation.setValue(heightChanges.from);
    var animationConfig = config ? _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, config), {}, {
      toValue: heightChanges.to
    }) : {
      toValue: heightChanges.to
    };
    reactNative.Animated[type](animation, animationConfig).start();
  }, [toggled, type, config, collapsedHeight]);
  var drawerStyles = useThemePath.useThemePath("drawer", styles);
  var classRef = useClassName.useClassName('keg-drawer', className);
  return React__default.createElement(reactNative.Animated.View, {
    ref: classRef,
    style: [drawerStyles.main, jsutils.get(styles, 'main'), {
      maxHeight: animation
    }]
  }, React__default.createElement(view.View, {
    className: "keg-drawer-content",
    onLayout: setMaxHeight,
    style: jsutils.get(styles, 'content')
  }, isValidComponent.isValidComponent(Element) ? React__default.createElement(Element, _rollupPluginBabelHelpers._extends({}, childProps, {
    styles: styles
  })) : props.children));
};

exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map
