'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var getPressHandler = require('./getPressHandler.js');
var getImgSrc = require('./getImgSrc.js');
require('react-native');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var view = require('./view-ea13da55.js');
var reTheme = require('@keg-hub/re-theme');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList = require('./useClassList-9eaefcd6.js');
var loading = require('./loading.js');
var image = require('./image-2d56671d.js');

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
  var alt = props.alt,
      className = props.className,
      children = props.children,
      onClick = props.onClick,
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
  return React__default.createElement(view.View, {
    className: useClassList.useClassList("keg-image-container", className),
    style: builtStyles.container
  }, loading$1 && useLoading && React__default.createElement(loading.Loading, {
    className: "keg-image-loading",
    styles: builtStyles.loadingComp
  }), React__default.createElement(KegImage, _rollupPluginBabelHelpers._extends({}, attrs, {
    style: loading$1 ? loadingStyles : builtStyles.image
  }, getPressHandler.getPressHandler(false, onClick, onPress), getImgSrc.getImgSrc(false, src, source), {
    onLoadEnd: onLoad,
    alt: alt,
    ref: internalRef
  })));
});

var noHeader = {
  marginTop: 0
};
var MediaFromType = function MediaFromType(_ref) {
  var mediaProps = _ref.mediaProps,
      styles = _ref.styles;
  var className = mediaProps.className,
      type = mediaProps.type,
      _mediaProps$resizeMod = mediaProps.resizeMode,
      resizeMode = _mediaProps$resizeMod === void 0 ? 'cover' : _mediaProps$resizeMod,
      _mediaProps$resizeMet = mediaProps.resizeMethod,
      resizeMethod = _mediaProps$resizeMet === void 0 ? 'scale' : _mediaProps$resizeMet,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(mediaProps, ["className", "type", "resizeMode", "resizeMethod"]);
  var image = styles.image,
      video = styles.video,
      container = styles.container,
      loading = styles.loading,
      loadingComp = styles.loadingComp;
  var mediaStyles = reTheme.useStyle(type === 'image' && image && {
    image: image
  }, type === 'video' && video && {
    video: video
  }, container && {
    container: container
  }, loading && {
    loading: loading
  }, loadingComp && {
    loadingComp: loadingComp
  });
  switch (type) {
    case 'image':
      {
        return React__default.createElement(Image, _rollupPluginBabelHelpers._extends({
          resizeMode: resizeMode,
          resizeMethod: resizeMethod
        }, props, {
          className: "keg-card-media",
          styles: mediaStyles
        }));
      }
    default:
      {
        return null;
      }
  }
};
var CardMedia = function CardMedia(_ref2) {
  var hasHeader = _ref2.hasHeader,
      mediaProps = _ref2.mediaProps,
      Media = _ref2.Media,
      subtitle = _ref2.subtitle,
      styles = _ref2.styles,
      title = _ref2.title;
  return Media || !mediaProps ? Media || null : React__default.createElement(view.View, {
    className: "keg-card-media",
    style: [jsutils.get(styles, 'main'), hasHeader === false && noHeader]
  }, React__default.createElement(MediaFromType, {
    mediaProps: mediaProps,
    styles: styles
  }));
};

exports.CardMedia = CardMedia;
exports.Image = Image;
//# sourceMappingURL=cardMedia-7145f480.js.map
