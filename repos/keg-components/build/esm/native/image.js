import { b as _slicedToArray, d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b6f65682.js';
import { V as View } from './view.native-b0b1ddd4.js';
import { Loading } from './loading.js';
import { checkCall, isFunc } from '@keg-hub/jsutils';
import { I as Image$1 } from './image-d610d905.js';
import { useStyle, useThemeHover } from '@keg-hub/re-theme';
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { getPressHandler } from './getPressHandler.js';
import { getImgSrc } from './getImgSrc.js';
import '@keg-hub/re-theme/colors';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native';
import { u as useClassList } from './useClassList.native-70068878.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import './useClassName.native-32e8827d.js';
import './indicator.wrapper-83c062e4.js';
import './getPlatform-e625f46a.js';
import './text.js';
import './kegText-f9567f63.js';
import './kegText.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './isValidComponent.js';

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
  return React.createElement(View, {
    className: useClassList(),
    style: builtStyles.container
  }, loading && useLoading && React.createElement(Loading, {
    className: "keg-image-loading",
    styles: builtStyles.loadingComp
  }), React.createElement(KegImage, _extends({}, attrs, {
    style: loading ? loadingStyles : builtStyles.image
  }, getPressHandler(false, onClick, onPress), getImgSrc(false, src, source), {
    onLoadEnd: onLoad,
    alt: alt,
    ref: internalRef
  })));
});

export { Image };
//# sourceMappingURL=image.js.map
