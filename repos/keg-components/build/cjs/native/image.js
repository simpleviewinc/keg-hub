'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var view_native = require('./view.native-b34604af.js');
var loading = require('./loading.js');
var jsutils = require('@keg-hub/jsutils');
var image = require('./image-53cac4f2.js');
var reTheme = require('@keg-hub/re-theme');
var React = require('react');
var getPressHandler = require('./getPressHandler.js');
var getImgSrc = require('./getImgSrc.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./useClassName.native-3d1a229b.js');
require('./indicator.wrapper-6a5623e9.js');
require('./getPlatform-24228c6c.js');
require('./text.js');
require('./kegText-965ef4d3.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var KegImage = styleInjector.StyleInjector(image.Image, {
  displayName: 'Image',
  className: 'keg-image'
});
var Image = React.forwardRef(function (props, ref) {
  var _useState = React.useState(true),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      loading$1 = _useState2[0],
      setLoading = _useState2[1];
  var internalRef = ref || React.useRef(null);
  var alt = props.alt;
      props.className;
      props.children;
      var onClick = props.onClick,
      onPress = props.onPress,
      src = props.src,
      source = props.source,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "image.".concat(type) : _props$themePath,
      _props$useLoading = props.useLoading,
      useLoading = _props$useLoading === void 0 ? true : _props$useLoading,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["alt", "className", "children", "onClick", "onPress", "src", "source", "styles", "type", "themePath", "useLoading"]);
  var builtStyles = useThemePath.useThemePath(themePath, styles);
  var loadingStyles = reTheme.useStyle(builtStyles.loading, builtStyles.image);
  var loadedStyles = reTheme.useStyle(loadingStyles, builtStyles.loaded);
  var _useThemeHover = reTheme.useThemeHover(loadedStyles, builtStyles.hover, {
    internalRef: internalRef
  }),
      _useThemeHover2 = _rollupPluginBabelHelpers._slicedToArray(_useThemeHover, 3),
      imgRef = _useThemeHover2[0],
      elementStyle = _useThemeHover2[1],
      setStyle = _useThemeHover2[2];
  var onLoad = React.useCallback(function () {
    jsutils.checkCall(setLoading, false);
    jsutils.checkCall(setStyle, elementStyle);
    jsutils.checkCall(props.onLoad, props);
    jsutils.isFunc(imgRef) ? imgRef(internalRef.current) : imgRef && (imgRef.current = internalRef.current);
  }, [src, source, internalRef.current]);
  return React__default['default'].createElement(view_native.View, {
    className: useClassList_native.useClassList(),
    style: builtStyles.container
  }, loading$1 && useLoading && React__default['default'].createElement(loading.Loading, {
    className: "keg-image-loading",
    styles: builtStyles.loadingComp
  }), React__default['default'].createElement(KegImage, _rollupPluginBabelHelpers._extends({}, attrs, {
    style: loading$1 ? loadingStyles : builtStyles.image
  }, getPressHandler.getPressHandler(false, onClick, onPress), getImgSrc.getImgSrc(false, src, source), {
    onLoadEnd: onLoad,
    alt: alt,
    ref: internalRef
  })));
});

exports.Image = Image;
//# sourceMappingURL=image.js.map
