'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var view = require('./view-3fcb25db.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var isValidComponent = require('./isValidComponent.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var reactNativeWeb = require('react-native-web');
var useClassName = require('./useClassName-eec4a5f1.js');
require('./view.native-895f9104.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["Element", "styles", "toggled", "className", "type", "config", "collapsedHeight"];
var isWeb = getPlatform.getPlatform() === 'web';
var noAnimate = function noAnimate(toggled, current, collapsedHeight, contentMaxHeight) {
  return !toggled && current === collapsedHeight || toggled && current === contentMaxHeight;
};
var Drawer = React__default['default'].forwardRef(function (props, ref) {
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
      childProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var contentMaxHeight = React.useRef(null);
  var _useState = React.useState(new reactNativeWeb.Animated.Value(collapsedHeight)),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];
  var setMaxHeight = React.useCallback(function (event) {
    var maxHeight = event.nativeEvent.layout.height;
    if (contentMaxHeight.current === maxHeight) return;
    contentMaxHeight.current = maxHeight;
    toggled && setAnimation(new reactNativeWeb.Animated.Value(maxHeight));
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
    animationConfig.useNativeDriver = !isWeb;
    reactNativeWeb.Animated[type](animation, animationConfig).start();
  }, [toggled, type, config, collapsedHeight]);
  var drawerStyles = useThemePath.useThemePath("drawer", styles);
  var classRef = useClassName.useClassName('keg-drawer', className, ref);
  return React__default['default'].createElement(reactNativeWeb.Animated.View, {
    ref: classRef,
    style: [drawerStyles.main, jsutils.get(styles, 'main'), {
      maxHeight: animation
    }]
  }, React__default['default'].createElement(view.View, {
    className: "keg-drawer-content",
    onLayout: setMaxHeight,
    style: jsutils.get(styles, 'content')
  }, isValidComponent.isValidComponent(Element) ? React__default['default'].createElement(Element, _rollupPluginBabelHelpers._extends({}, childProps, {
    styles: styles
  })) : props.children));
});

exports.Drawer = Drawer;
//# sourceMappingURL=drawer.js.map
