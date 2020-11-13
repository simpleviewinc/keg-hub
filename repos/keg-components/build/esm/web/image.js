import { b as _slicedToArray, d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { checkCall, isFunc } from '@keg-hub/jsutils';
import './defaults-0fca2f7d.js';
import './colors-3366b3e1.js';
import '@keg-hub/re-theme/colors';
import './buildColorStyles.js';
import './platformFlatten-4856c5dd.js';
import './buildTheme.js';
import React__default, { forwardRef, useState, useRef, useCallback } from 'react';
import './isValidComponent.js';
import { getPressHandler } from './getPressHandler.js';
import './ensureClassArray.js';
import { getImgSrc } from './getImgSrc.js';
import './handleRefUpdate.js';
import './updateClassNames.js';
import 'react-native';
import './useClassName-477fb4c5.js';
import './view.native-3802ec98.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-45334891.js';
import './useTextAccessibility.js';
import { useStyle, useThemeHover } from '@keg-hub/re-theme';
import './useTextStyles.js';
import './kegText.native-67183179.js';
import './kegText-a280e501.js';
import './text.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import { u as useClassList } from './useClassList-4be992cd.js';
import './indicator.wrapper-78896af6.js';
import { Loading } from './loading.js';
import { I as Image$1 } from './image-e324b55c.js';

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
      attrs = _objectWithoutProperties(props, ["alt", "className", "children", "onClick", "onPress", "src", "source", "styles", "type", "themePath", "useLoading"]);
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
    className: useClassList("keg-image-container", className),
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

export { Image };
//# sourceMappingURL=image.js.map
