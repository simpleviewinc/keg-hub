'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('./colors-3022218c.js');
var React = require('react');
var React__default = _interopDefault(React);
require('./isValidComponent.js');
require('./renderFromType.js');
require('./getOnChangeHandler.js');
require('./ensureClassArray.js');
require('./getChecked.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-afee43f7.js');
require('./view.native-b2081485.js');
require('@keg-hub/re-theme/styleInjector');
var view = require('./view-bc6e3186.js');
require('./useTextAccessibility.js');
var reTheme = require('@keg-hub/re-theme');
require('./useTextStyles.js');
require('./kegText.native-cdb9059e.js');
require('./kegText-90bd3366.js');
var text = require('./text.js');
var useChildrenWithRefs = require('./useChildrenWithRefs.js');
require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList = require('./useClassList-2f47489f.js');
require('./useThemeTypeAsClass-58120adc.js');
require('react-native-svg');
require('./svgIcon-21afc6ae.js');
require('./checkbox.wrapper-c42d7023.js');
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
require('./input.web-72fd5fb0.js');
var checkbox = require('./checkbox-bf5cda27.js');

var SimpleHeader = React__default.forwardRef(function (props, ref) {
  var title = props.title,
      className = props.className,
      style = props.style,
      rest = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["title", "className", "style"]);
  React.useImperativeHandle(ref, function () {
    return {
      isChecked: undefined,
      setChecked: jsutils.noOp
    };
  });
  var textStyle = reTheme.useStyle('form.checkGroup.simpleHeader.main', style);
  return React__default.createElement(text.Text, _rollupPluginBabelHelpers._extends({
    className: className,
    style: textStyle
  }, rest), title);
});
var CheckboxHeader = React__default.forwardRef(function (props, ref) {
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
  return React__default.createElement(checkbox.Checkbox, {
    RightComponent: title,
    rightClassName: className,
    styles: headerStyles,
    checked: checked,
    onChange: onChangeHandler,
    ref: ref,
    close: true
  });
});
var CheckGroup = React__default.forwardRef(function (props, ref) {
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
    return showHeaderCheckbox ? React__default.createElement(CheckboxHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      onPress: showHeaderCheckbox && headerCheckHandler,
      checked: showHeaderCheckbox ? initChecked : undefined,
      ref: ref
    }) : React__default.createElement(SimpleHeader, {
      className: headerClassName,
      style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.header,
      title: title,
      ref: ref
    });
  };
  return React__default.createElement(view.View, {
    className: useClassList.useClassList('keg-check-group', className),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React__default.createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = checkbox.Checkbox;

exports.CheckGroup = CheckGroup;
//# sourceMappingURL=checkGroup.js.map
