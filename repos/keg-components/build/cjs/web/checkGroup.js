'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var view = require('./view-3fcb25db.js');
var text = require('./text.js');
var checkbox = require('./checkbox-8b89ae3f.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-89a8dbd4.js');
var useChildrenWithRefs = require('./useChildrenWithRefs.js');
var jsutils = require('@keg-hub/jsutils');
require('./view.native-895f9104.js');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');
require('./kegText-b0f1b442.js');
require('./kegText.native-100193df.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./checkbox.wrapper-f7b31de8.js');
require('./svgIcon-bb2d3711.js');
require('./svgIcon.native-d0de8203.js');
require('react-native-svg-web');
require('./caption.js');
require('./h1.js');
require('./h2.js');
require('./h3.js');
require('./h4.js');
require('./h5.js');
require('./h6.js');
require('./label.js');
require('./p.js');
require('./subtitle.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./getOnChangeHandler.js');
require('./getChecked.js');
require('@keg-hub/re-theme/colors');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('./useThemeTypeAsClass-9fb8a8ab.js');
require('./colors-da502c66.js');
require('./input.web-369be1b2.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["title", "className", "style"];
var SimpleHeader = React__default['default'].forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      rest = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  React.useImperativeHandle(ref, function () {
    return {
      isChecked: undefined,
      setChecked: jsutils.noOp
    };
  });
  var textStyle = reTheme.useStyle('form.checkGroup.simpleHeader.main', style);
  return React__default['default'].createElement(text.Text, _rollupPluginBabelHelpers._extends({
    className: className,
    style: textStyle
  }, rest), title);
});
var CheckboxHeader = React__default['default'].forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      onPress = props.onPress,
      checked = props.checked;
  var headerStyles = React.useMemo(function () {
    return {
      main: style,
      content: {
        right: {}
      }
    };
  }, [style]);
  var onChangeHandler = React.useCallback(function (_, val) {
    return onPress === null || onPress === void 0 ? void 0 : onPress(val);
  }, [onPress]);
  return React__default['default'].createElement(checkbox.Checkbox, {
    RightComponent: title,
    rightClassName: className,
    styles: headerStyles,
    checked: checked,
    onChange: onChangeHandler,
    ref: ref,
    close: true
  });
});
var CheckGroup = React__default['default'].forwardRef(function (props, ref) {
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
  var groupStyles = reTheme.useStyle('form.checkGroup', styles);
  var _useChildrenWithRefs = useChildrenWithRefs.useChildrenWithRefs(children, showHeaderCheckbox),
      _useChildrenWithRefs2 = _rollupPluginBabelHelpers._slicedToArray(_useChildrenWithRefs, 2),
      childrenWithProps = _useChildrenWithRefs2[0],
      childRefs = _useChildrenWithRefs2[1];
  var headerCheckHandler = React.useCallback(function (checked) {
    onGroupPress === null || onGroupPress === void 0 ? void 0 : onGroupPress(checked);
    jsutils.mapObj(childRefs.current, function (_, child) {
      var _child$setChecked;
      return child === null || child === void 0 ? void 0 : (_child$setChecked = child.setChecked) === null || _child$setChecked === void 0 ? void 0 : _child$setChecked.call(child, checked);
    });
  }, [childRefs]);
  var Header = function Header() {
    return showHeaderCheckbox ? React__default['default'].createElement(CheckboxHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      onPress: showHeaderCheckbox && headerCheckHandler,
      checked: showHeaderCheckbox ? initChecked : undefined,
      ref: ref
    }) : React__default['default'].createElement(SimpleHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      ref: ref
    });
  };
  return React__default['default'].createElement(view.View, {
    className: useClassList.useClassList('keg-check-group', className),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React__default['default'].createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = checkbox.Checkbox;

exports.CheckGroup = CheckGroup;
//# sourceMappingURL=checkGroup.js.map
