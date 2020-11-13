import { d as _objectWithoutProperties, b as _slicedToArray, _ as _objectSpread2, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, noOpObj } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './buildColorStyles-a1255086.js';
import '@keg-hub/re-theme/colors';
import './platformFlatten-50b3991b.js';
import './buildTheme.js';
import React__default, { useRef, useState, useCallback, useLayoutEffect } from 'react';
import { isValidComponent } from './isValidComponent.js';
import { Animated } from 'react-native';
import { u as useClassName } from './useClassName.native-32e8827d.js';
import { V as View } from './view.native-54e7e7ef.js';
import '@keg-hub/re-theme';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';

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
      config = _props$config === void 0 ? noOpObj : _props$config,
      _props$collapsedHeigh = props.collapsedHeight,
      collapsedHeight = _props$collapsedHeigh === void 0 ? 0 : _props$collapsedHeigh,
      childProps = _objectWithoutProperties(props, ["Element", "styles", "toggled", "className", "type", "config", "collapsedHeight"]);
  var contentMaxHeight = useRef(null);
  var _useState = useState(new Animated.Value(collapsedHeight)),
      _useState2 = _slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];
  var setMaxHeight = useCallback(function (event) {
    var maxHeight = event.nativeEvent.layout.height;
    if (contentMaxHeight.current === maxHeight) return;
    contentMaxHeight.current = maxHeight;
    toggled && setAnimation(new Animated.Value(maxHeight));
  }, [contentMaxHeight, toggled, setAnimation]);
  useLayoutEffect(function () {
    if (noAnimate(toggled, animation._value, collapsedHeight, contentMaxHeight.current)) return;
    var heightChanges = toggled ? {
      from: collapsedHeight,
      to: contentMaxHeight.current
    } : {
      from: contentMaxHeight.current,
      to: collapsedHeight
    };
    animation.setValue(heightChanges.from);
    var animationConfig = config ? _objectSpread2(_objectSpread2({}, config), {}, {
      toValue: heightChanges.to
    }) : {
      toValue: heightChanges.to
    };
    Animated[type](animation, animationConfig).start();
  }, [toggled, type, config, collapsedHeight]);
  var drawerStyles = useThemePath("drawer", styles);
  var classRef = useClassName();
  return React__default.createElement(Animated.View, {
    ref: classRef,
    style: [drawerStyles.main, get(styles, 'main'), {
      maxHeight: animation
    }]
  }, React__default.createElement(View, {
    className: "keg-drawer-content",
    onLayout: setMaxHeight,
    style: get(styles, 'content')
  }, isValidComponent(Element) ? React__default.createElement(Element, _extends({}, childProps, {
    styles: styles
  })) : props.children));
};

export { Drawer };
//# sourceMappingURL=drawer.js.map
