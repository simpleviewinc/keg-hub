import { b as _slicedToArray, d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b49fe34a.js';
import React__default, { forwardRef, useState, useRef, useCallback } from 'react';
import { V as View } from './view.native-f7a27d15.js';
import { Loading } from './loading.js';
import { checkCall, isFunc, get } from '@keg-hub/jsutils';
import { I as Image$1 } from './image-eb160914.js';
import { useStyle, useThemeHover } from '@keg-hub/re-theme';
import { getPressHandler } from './getPressHandler.js';
import { getImgSrc } from './getImgSrc.js';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useClassList } from './useClassList.native-70068878.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';

var _excluded$1 = ["alt", "className", "children", "onClick", "onPress", "src", "source", "styles", "type", "themePath", "useLoading"];
var KegImage = StyleInjector(Image$1, {
  displayName: 'Image',
  className: 'keg-image'
});
var Image = forwardRef(function (props, ref) {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
  var internalRef = ref || useRef(null);
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
      attrs = _objectWithoutProperties(props, _excluded$1);
  var builtStyles = useThemePath(themePath, styles);
  var loadingStyles = useStyle(builtStyles.loading, builtStyles.image);
  var loadedStyles = useStyle(loadingStyles, builtStyles.loaded);
  var _useThemeHover = useThemeHover(loadedStyles, builtStyles.hover, {
    internalRef: internalRef
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 3),
      imgRef = _useThemeHover2[0],
      elementStyle = _useThemeHover2[1],
      setStyle = _useThemeHover2[2];
  var onLoad = useCallback(function () {
    checkCall(setLoading, false);
    checkCall(setStyle, elementStyle);
    checkCall(props.onLoad, props);
    isFunc(imgRef) ? imgRef(internalRef.current) : imgRef && (imgRef.current = internalRef.current);
  }, [src, source, internalRef.current]);
  return React__default.createElement(View, {
    className: useClassList(),
    style: builtStyles.container
  }, loading && useLoading && React__default.createElement(Loading, {
    className: "keg-image-loading",
    styles: builtStyles.loadingComp
  }), React__default.createElement(KegImage, _extends({}, attrs, {
    style: loading ? loadingStyles : builtStyles.image
  }, getPressHandler(false, onClick, onPress), getImgSrc(false, src, source), {
    onLoadEnd: onLoad,
    alt: alt,
    ref: internalRef
  })));
});

var _excluded = ["className", "type", "resizeMode", "resizeMethod"];
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
      props = _objectWithoutProperties(mediaProps, _excluded);
  var image = styles.image,
      video = styles.video,
      container = styles.container,
      loading = styles.loading,
      loadingComp = styles.loadingComp;
  var mediaStyles = useStyle(type === 'image' && image && {
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
        return React__default.createElement(Image, _extends({
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
  return Media || !mediaProps ? Media || null : React__default.createElement(View, {
    className: "keg-card-media",
    style: [get(styles, 'main'), hasHeader === false && noHeader]
  }, React__default.createElement(MediaFromType, {
    mediaProps: mediaProps,
    styles: styles
  }));
};

export { CardMedia as C, Image as I };
//# sourceMappingURL=cardMedia-df8e7497.js.map
