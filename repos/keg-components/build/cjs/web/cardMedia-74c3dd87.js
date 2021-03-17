'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var view = require('./view-276572bd.js');
var loading = require('./loading.js');
var jsutils = require('@keg-hub/jsutils');
var image = require('./image-e98c839c.js');
var reTheme = require('@keg-hub/re-theme');
var getPressHandler = require('./getPressHandler.js');
var getImgSrc = require('./getImgSrc.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var useClassList = require('./useClassList-89a8dbd4.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');

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
  var alt = props.alt,
      className = props.className;
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
  return React__default['default'].createElement(view.View, {
    className: useClassList.useClassList("keg-image-container", className),
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

var noHeader = {
  marginTop: 0
};
var MediaFromType = function MediaFromType(_ref) {
  var mediaProps = _ref.mediaProps,
      styles = _ref.styles;
  mediaProps.className;
      var type = mediaProps.type,
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
        return React__default['default'].createElement(Image, _rollupPluginBabelHelpers._extends({
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
      Media = _ref2.Media;
      _ref2.subtitle;
      var styles = _ref2.styles;
      _ref2.title;
  return Media || !mediaProps ? Media || null : React__default['default'].createElement(view.View, {
    className: "keg-card-media",
    style: [jsutils.get(styles, 'main'), hasHeader === false && noHeader]
  }, React__default['default'].createElement(MediaFromType, {
    mediaProps: mediaProps,
    styles: styles
  }));
};

exports.CardMedia = CardMedia;
exports.Image = Image;
//# sourceMappingURL=cardMedia-74c3dd87.js.map
