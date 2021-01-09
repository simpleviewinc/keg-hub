'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var reactNative = require('react-native');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var view_native = require('./view.native-20f555a1.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useFromToAnimation = require('./useFromToAnimation.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
require('./touchable.js');
var touchable$1 = require('./touchable-d386e5c0.js');

var SlideAnimatedView = function SlideAnimatedView(_ref) {
  var className = _ref.className,
      defaultStyle = _ref.defaultStyle,
      visible = _ref.visible,
      children = _ref.children,
      onAnimationFinish = _ref.onAnimationFinish;
  var windowHeight = reactNative.Dimensions.get('window').height;
  var bottomOfScreen = windowHeight;
  var origin = 0;
  var _useFromToAnimation = useFromToAnimation.useFromToAnimation({
    from: visible ? bottomOfScreen : origin,
    to: visible ? origin : bottomOfScreen,
    onFinish: onAnimationFinish
  }),
      _useFromToAnimation2 = _rollupPluginBabelHelpers._slicedToArray(_useFromToAnimation, 1),
      slide = _useFromToAnimation2[0];
  var classRef = useClassName_native.useClassName();
  return React__default.createElement(reactNative.Animated.View, {
    ref: classRef,
    style: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultStyle), {}, {
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
      onBackdropTouch = _props$onBackdropTouc === void 0 ? jsutils.noOp : _props$onBackdropTouc,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      visible = props.visible;
  var _useState = React.useState(false),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      renderModal = _useState2[0],
      setRenderModal = _useState2[1];
  if (props.visible && !renderModal) setRenderModal(true);
  var modalStyles = useThemePath.useThemePath(themePath || "modal.".concat(type), styles);
  React.useEffect(function () {
    if (global.document && visible) {
      global.document.body.style.overflow = 'hidden';
      return function () {
        global.document.body.style.overflow = '';
      };
    }
  }, [visible]);
  var cb = React.useCallback(function () {
    if (!visible) {
      setRenderModal(false);
      if (jsutils.isFunc(onAnimateOut)) onAnimateOut();
    } else if (jsutils.isFunc(onAnimateIn)) onAnimateIn();
  }, [onAnimateOut, onAnimateIn, visible]);
  return (
    React__default.createElement(view_native.View, {
      className: useClassList_native.useClassList(),
      style: renderModal ? modalStyles.main : hideModalStyle
    }, React__default.createElement(touchable$1.Touchable, {
      className: 'keg-modal-backdrop',
      style: modalStyles.backdrop,
      onPress: onBackdropTouch,
      activeOpacity: activeOpacity
    }), React__default.createElement(AnimatedComponent, {
      onAnimationFinish: cb,
      visible: visible,
      defaultStyle: modalStyles.content
    }, children))
  );
};

exports.Modal = Modal;
//# sourceMappingURL=modal.js.map
