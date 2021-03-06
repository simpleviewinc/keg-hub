import { b as _slicedToArray, _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, Animated } from 'react-native';
import { Touchable } from './touchable.js';
import { isFunc, noOp } from '@keg-hub/jsutils';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { useFromToAnimation } from './useFromToAnimation.js';
import { u as useClassName } from './useClassName-682bc33b.js';
import { u as useClassList } from './useClassList-1d418045.js';
import { V as View } from './view-2274aefb.js';
import '@keg-hub/re-theme/styleInjector';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme';
import './view.native-a7f08b5b.js';

var SlideAnimatedView = function SlideAnimatedView(_ref) {
  var className = _ref.className,
      defaultStyle = _ref.defaultStyle,
      visible = _ref.visible,
      children = _ref.children,
      onAnimationFinish = _ref.onAnimationFinish;
  var windowHeight = Dimensions.get('window').height;
  var bottomOfScreen = windowHeight;
  var origin = 0;
  var _useFromToAnimation = useFromToAnimation({
    from: visible ? bottomOfScreen : origin,
    to: visible ? origin : bottomOfScreen,
    onFinish: onAnimationFinish
  }),
      _useFromToAnimation2 = _slicedToArray(_useFromToAnimation, 1),
      slide = _useFromToAnimation2[0];
  var classRef = useClassName('keg-modal-content', className);
  return React.createElement(Animated.View, {
    ref: classRef,
    style: _objectSpread2(_objectSpread2({}, defaultStyle), {}, {
      transform: [{
        translateY: slide
      }]
    })
  }, children);
};
var hideModalStyle = {
  height: 0,
  width: 0,
  overflow: 'hidden'
};
var Modal = function Modal(props) {
  var _props$AnimatedCompon = props.AnimatedComponent,
      AnimatedComponent = _props$AnimatedCompon === void 0 ? SlideAnimatedView : _props$AnimatedCompon,
      _props$activeOpacity = props.activeOpacity,
      activeOpacity = _props$activeOpacity === void 0 ? 1 : _props$activeOpacity,
      children = props.children,
      className = props.className,
      onAnimateIn = props.onAnimateIn,
      onAnimateOut = props.onAnimateOut,
      _props$onBackdropTouc = props.onBackdropTouch,
      onBackdropTouch = _props$onBackdropTouc === void 0 ? noOp : _props$onBackdropTouc,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      visible = props.visible;
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      renderModal = _useState2[0],
      setRenderModal = _useState2[1];
  if (props.visible && !renderModal) setRenderModal(true);
  var modalStyles = useThemePath(themePath || "modal.".concat(type), styles);
  useEffect(function () {
    if (global.document && visible) {
      global.document.body.style.overflow = 'hidden';
      return function () {
        global.document.body.style.overflow = '';
      };
    }
  }, [visible]);
  var cb = useCallback(function () {
    if (!visible) {
      setRenderModal(false);
      if (isFunc(onAnimateOut)) onAnimateOut();
    } else if (isFunc(onAnimateIn)) onAnimateIn();
  }, [onAnimateOut, onAnimateIn, visible]);
  return (
    React.createElement(View, {
      className: useClassList('keg-modal', className),
      style: renderModal ? modalStyles.main : hideModalStyle
    }, React.createElement(Touchable, {
      className: 'keg-modal-backdrop',
      style: modalStyles.backdrop,
      onPress: onBackdropTouch,
      activeOpacity: activeOpacity
    }), React.createElement(AnimatedComponent, {
      onAnimationFinish: cb,
      visible: visible,
      defaultStyle: modalStyles.content
    }, children))
  );
};

export { Modal };
//# sourceMappingURL=modal.js.map
