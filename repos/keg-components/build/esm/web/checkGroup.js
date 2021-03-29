import { d as _objectWithoutProperties, e as _extends, b as _slicedToArray } from './_rollupPluginBabelHelpers-b6f65682.js';
import React, { useImperativeHandle, useMemo, useCallback } from 'react';
import { V as View } from './view-2274aefb.js';
import { Text } from './text.js';
import { C as Checkbox } from './checkbox-f5a5bba5.js';
import { useStyle } from '@keg-hub/re-theme';
import { u as useClassList } from './useClassList-1d418045.js';
import { useChildrenWithRefs } from './useChildrenWithRefs.js';
import { noOp, mapObj } from '@keg-hub/jsutils';
import './view.native-a7f08b5b.js';
import 'react-native';
import './useClassName-682bc33b.js';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import '@keg-hub/re-theme/styleInjector';
import './kegText-5c4aeb4b.js';
import './kegText.native-be460636.js';
import './useTextAccessibility.js';
import './useTextStyles.js';
import './checkbox.wrapper-7adc3d63.js';
import './svgIcon-51ab090d.js';
import 'react-native-svg';
import './caption.js';
import './h1.js';
import './h2.js';
import './h3.js';
import './h4.js';
import './h5.js';
import './h6.js';
import './label.js';
import './p.js';
import './subtitle.js';
import './renderFromType.js';
import './isValidComponent.js';
import './getOnChangeHandler.js';
import './getChecked.js';
import '@keg-hub/re-theme/colors';
import './useThemePath.js';
import './useThemeWithHeight.js';
import './useThemeTypeAsClass-fec5ff6f.js';
import './colors-6402d3b3.js';
import './input.web-14b4a9e4.js';

var SimpleHeader = React.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      rest = _objectWithoutProperties(props, ["title", "className", "style"]);
  useImperativeHandle(ref, function () {
    return {
      isChecked: undefined,
      setChecked: noOp
    };
  });
  var textStyle = useStyle('form.checkGroup.simpleHeader.main', style);
  return React.createElement(Text, _extends({
    className: className,
    style: textStyle
  }, rest), title);
});
var CheckboxHeader = React.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      onPress = props.onPress,
      checked = props.checked;
  var headerStyles = useMemo(function () {
    return {
      main: style,
      content: {
        right: {}
      }
    };
  }, [style]);
  var onChangeHandler = useCallback(function (_, val) {
    return onPress === null || onPress === void 0 ? void 0 : onPress(val);
  }, [onPress]);
  return React.createElement(Checkbox, {
    RightComponent: title,
    rightClassName: className,
    styles: headerStyles,
    checked: checked,
    onChange: onChangeHandler,
    ref: ref,
    close: true
  });
});
var CheckGroup = React.forwardRef(function (props, ref) {
  var className = props.className,
      headerClassName = props.headerClassName,
      title = props.title,
      children = props.children,
      styles = props.styles,
      _props$initChecked = props.initChecked,
      initChecked = _props$initChecked === void 0 ? false : _props$initChecked,
      onGroupPress = props.onGroupPress,
      _props$showHeaderChec = props.showHeaderCheckbox,
      showHeaderCheckbox = _props$showHeaderChec === void 0 ? false : _props$showHeaderChec,
      _props$showHeader = props.showHeader,
      showHeader = _props$showHeader === void 0 ? true : _props$showHeader;
  var groupStyles = useStyle('form.checkGroup', styles);
  var _useChildrenWithRefs = useChildrenWithRefs(children, showHeaderCheckbox),
      _useChildrenWithRefs2 = _slicedToArray(_useChildrenWithRefs, 2),
      childrenWithProps = _useChildrenWithRefs2[0],
      childRefs = _useChildrenWithRefs2[1];
  var headerCheckHandler = useCallback(function (checked) {
    onGroupPress === null || onGroupPress === void 0 ? void 0 : onGroupPress(checked);
    mapObj(childRefs.current, function (_, child) {
      var _child$setChecked;
      return child === null || child === void 0 ? void 0 : (_child$setChecked = child.setChecked) === null || _child$setChecked === void 0 ? void 0 : _child$setChecked.call(child, checked);
    });
  }, [childRefs]);
  var Header = function Header() {
    return showHeaderCheckbox ? React.createElement(CheckboxHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      onPress: showHeaderCheckbox && headerCheckHandler,
      checked: showHeaderCheckbox ? initChecked : undefined,
      ref: ref
    }) : React.createElement(SimpleHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      ref: ref
    });
  };
  return React.createElement(View, {
    className: useClassList('keg-check-group', className),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React.createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = Checkbox;

export { CheckGroup };
//# sourceMappingURL=checkGroup.js.map
