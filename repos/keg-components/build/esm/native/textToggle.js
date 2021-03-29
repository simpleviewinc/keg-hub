import { b as _slicedToArray } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useState, useMemo, useCallback } from 'react';
import { Text } from './text.js';
import { T as Touchable } from './touchable-9cc6e181.js';
import { Drawer } from './drawer.js';
import { V as View } from './view.native-b0b1ddd4.js';
import { u as useClassList } from './useClassList.native-70068878.js';
import { isFunc } from '@keg-hub/jsutils';
import { isValidComponent } from './isValidComponent.js';
import '@keg-hub/re-theme/colors';
import { useStylesCallback } from '@keg-hub/re-theme';
import LinearGradient from 'react-native-linear-gradient';
import './kegText-f9567f63.js';
import './kegText.js';
import './useClassName.native-32e8827d.js';
import 'react-native';
import './useTextAccessibility.js';
import '@keg-hub/re-theme/styleInjector';
import './useTextStyles.js';
import './touchable.js';
import './useThemePath.js';
import './useThemeWithHeight.js';

var buildStyles = function buildStyles(theme, styleHelper) {
  var textToggleStyles = theme.get("textToggle", styleHelper === null || styleHelper === void 0 ? void 0 : styleHelper.styles);
  var align = 'flex-end';
  switch (styleHelper === null || styleHelper === void 0 ? void 0 : styleHelper.togglePosition) {
    case 'left':
      align = 'flex-start';
      break;
    case 'center':
      align = 'center';
      break;
  }
  return theme.get(textToggleStyles, {
    main: {
      alignItems: align
    }
  });
};
var TextToggle = function TextToggle(props) {
  var text = props.text,
      styles = props.styles,
      _props$isExpandedInit = props.isExpandedInit,
      isExpandedInit = _props$isExpandedInit === void 0 ? false : _props$isExpandedInit;
      props.className;
      var CustomToggle = props.CustomToggle,
      onToggle = props.onToggle,
      _props$togglePosition = props.togglePosition,
      togglePosition = _props$togglePosition === void 0 ? 'right' : _props$togglePosition,
      _props$collapsedHeigh = props.collapsedHeight,
      collapsedHeight = _props$collapsedHeigh === void 0 ? 100 : _props$collapsedHeigh,
      _props$fadeColor = props.fadeColor,
      fadeColor = _props$fadeColor === void 0 ? 'white' : _props$fadeColor,
      _props$collapsedToggl = props.collapsedToggleText,
      collapsedToggleText = _props$collapsedToggl === void 0 ? 'show more' : _props$collapsedToggl,
      _props$expandedToggle = props.expandedToggleText,
      expandedToggleText = _props$expandedToggle === void 0 ? 'show less' : _props$expandedToggle;
  if (!text) return null;
  var _useState = useState(isExpandedInit),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];
  var styleHelper = useMemo(function () {
    return {
      styles: styles,
      togglePosition: togglePosition
    };
  }, [styles, togglePosition]);
  var mainStyle = useStylesCallback(buildStyles, [togglePosition, styles], styleHelper);
  var _useState3 = useState(0),
      _useState4 = _slicedToArray(_useState3, 2),
      textMaxHeight = _useState4[0],
      setTextMaxHeight = _useState4[1];
  var showToggle = shouldDisplayToggler(collapsedHeight, textMaxHeight);
  var onToggleCb = useCallback(function () {
    setExpanded(!expanded);
    isFunc(onToggle) && onToggle(!expanded);
  }, [expanded, onToggle]);
  var onTextLayout = useCallback(function (event) {
    var height = event.nativeEvent.layout.height;
    if (textMaxHeight === height) return;
    setTextMaxHeight(height);
  }, [textMaxHeight, setTextMaxHeight]);
  return React.createElement(View, {
    style: [mainStyle.main],
    className: useClassList()
  }, React.createElement(Drawer, {
    collapsedHeight: collapsedHeight,
    toggled: expanded
  }, React.createElement(Text, {
    style: mainStyle.text,
    onLayout: onTextLayout
  }, text)), showToggle && !expanded && React.createElement(LinearGradient, {
    colors: ['rgba(255,255,255,0)', fadeColor],
    style: mainStyle.linearGradient
  }), showToggle && React.createElement(ToggleComponent, {
    onPress: onToggleCb,
    isExpanded: expanded,
    styles: mainStyle.toggleComponent,
    CustomComponent: CustomToggle,
    collapsedToggleText: collapsedToggleText,
    expandedToggleText: expandedToggleText
  }));
};
var shouldDisplayToggler = function shouldDisplayToggler(minHeight, textMaxHeight) {
  return !minHeight || textMaxHeight > minHeight;
};
var ToggleComponent = function ToggleComponent(_ref) {
  var onPress = _ref.onPress,
      styles = _ref.styles,
      CustomComponent = _ref.CustomComponent,
      isExpanded = _ref.isExpanded,
      expandedToggleText = _ref.expandedToggleText,
      collapsedToggleText = _ref.collapsedToggleText;
  var defaultText = isExpanded ? expandedToggleText : collapsedToggleText;
  return React.createElement(Touchable, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onPress: onPress
  }, isValidComponent(CustomComponent) ? React.createElement(CustomComponent, {
    isExpanded: isExpanded
  }) : React.createElement(Text, {
    style: styles === null || styles === void 0 ? void 0 : styles.text
  }, defaultText));
};

export { TextToggle };
//# sourceMappingURL=textToggle.js.map
