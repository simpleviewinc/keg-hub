'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var React = require('react');
var React__default = _interopDefault(React);
var renderFromType = require('./renderFromType.js');
var getOnChangeHandler = require('./getOnChangeHandler.js');
var getChecked = require('./getChecked.js');
require('react-native');
var view_native = require('./view.native-20f555a1.js');
var text = require('./text.js');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var useThemeTypeAsClass_native = require('./useThemeTypeAsClass.native-90f04031.js');
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

var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  return React.useMemo(function () {
    return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, themeStyles), {}, {
      content: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, themeStyles.content), {}, {
        area: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, jsutils.get(themeStyles, 'content.area.off')), isChecked && jsutils.get(themeStyles, 'content.area.on')),
        indicator: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, jsutils.get(themeStyles, 'content.indicator.off')), isChecked && jsutils.get(themeStyles, 'content.indicator.on'))
      })
    });
  }, [isChecked, themeStyles]);
};
var useCheckboxPressHandler = function useCheckboxPressHandler(isChecked, setChecked, onChange, _ref) {
  var _ref$disableCheck = _ref.disableCheck,
      disableCheck = _ref$disableCheck === void 0 ? false : _ref$disableCheck,
      _ref$disableUncheck = _ref.disableUncheck,
      disableUncheck = _ref$disableUncheck === void 0 ? true : _ref$disableUncheck;
  return React.useCallback(function (event) {
    if (isChecked) !disableUncheck && setChecked(false);else !disableCheck && setChecked(true);
    jsutils.checkCall(onChange, event, !isChecked);
  }, [isChecked, setChecked, onChange, disableCheck, disableUncheck]);
};
var SideComponent = function SideComponent(_ref2) {
  var className = _ref2.className,
      Component = _ref2.Component,
      styles = _ref2.styles,
      style = _ref2.style,
      onPress = _ref2.onPress;
  var sideProps = onPress ? {
    onPress: onPress
  } : undefined;
  return jsutils.isStr(Component) ? React__default.createElement(text.Text, _rollupPluginBabelHelpers._extends({
    className: className,
    style: style
  }, sideProps), Component) : renderFromType.renderFromType(Component, _rollupPluginBabelHelpers._objectSpread2({
    className: className,
    style: style,
    styles: styles
  }, sideProps));
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return React__default.createElement(React__default.Fragment, null, renderFromType.renderFromType(children, {
    className: className
  }, null));
};
var useCheckboxHandle = function useCheckboxHandle(ref, isChecked, _setChecked, pressHandler) {
  return React.useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: function setChecked(checked) {
        _setChecked(checked);
        pressHandler({}, checked);
      }
    };
  }, [ref, isChecked, _setChecked, pressHandler]);
};
var CheckboxWrapper = React.forwardRef(function (props, ref) {
  var className = props.className,
      initChecked = props.initChecked,
      checked = props.checked,
      children = props.children,
      elType = props.elType,
      Element = props.Element,
      CheckIcon = props.CheckIcon,
      disabled = props.disabled,
      _props$disableCheck = props.disableCheck,
      disableCheck = _props$disableCheck === void 0 ? false : _props$disableCheck,
      _props$disableUncheck = props.disableUncheck,
      disableUncheck = _props$disableUncheck === void 0 ? false : _props$disableUncheck,
      _props$allowAdjacentP = props.allowAdjacentPress,
      allowAdjacentPress = _props$allowAdjacentP === void 0 ? true : _props$allowAdjacentP,
      isWeb = props.isWeb,
      LeftComponent = props.LeftComponent,
      leftClassName = props.leftClassName,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      rightClassName = props.rightClassName,
      styles = props.styles,
      CheckboxComponent = props.CheckboxComponent,
      type = props.type,
      themePath = props.themePath,
      value = props.value,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "initChecked", "checked", "children", "elType", "Element", "CheckIcon", "disabled", "disableCheck", "disableUncheck", "allowAdjacentPress", "isWeb", "LeftComponent", "leftClassName", "close", "onChange", "onValueChange", "RightComponent", "rightClassName", "styles", "CheckboxComponent", "type", "themePath", "value"]);
  var initCheckedValue = jsutils.toBool(checked || initChecked || value);
  var _useState = React.useState(initCheckedValue),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  var pressHandler = useCheckboxPressHandler(isChecked, setChecked, onChange || onValueChange,
  {
    disableCheck: disableCheck,
    disableUncheck: disableUncheck
  });
  useCheckboxHandle(ref, isChecked, setChecked, onChange || onValueChange);
  var canUseHandler = !disabled && (isChecked && !disableUncheck || !isChecked && !disableCheck);
  var elThemePath = themePath || "form.".concat(elType, ".").concat(close && 'close' || 'default');
  var themeStyles = useThemePath.useThemePath(elThemePath, styles);
  var disabledStyles = useThemePath.useThemePath("form.".concat(elType, ".disabled"), themeStyles);
  var activeStyles = useCheckedState(isChecked, canUseHandler ? themeStyles : disabledStyles);
  var typeClassName = useThemeTypeAsClass_native.useThemeTypeAsClass();
  var pressHandlerProp = canUseHandler ? getOnChangeHandler.getOnChangeHandler(isWeb, pressHandler) : undefined;
  var ChildrenView = children && React__default.createElement(view_native.View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default.createElement(ChildrenComponent, {
    className: "keg-checkbox-container",
    children: children
  }));
  return ChildrenView || React__default.createElement(view_native.View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default.createElement(SideComponent, {
    className: useClassList_native.useClassList(),
    Component: LeftComponent,
    style: activeStyles.content.left,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }), CheckboxComponent ? renderFromType.renderFromType(CheckboxComponent, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default.createElement(Element, _rollupPluginBabelHelpers._extends({
    className: "keg-checkbox-container",
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content,
    CheckIcon: CheckIcon
  }, getChecked.getChecked(isWeb, isChecked), pressHandlerProp)), RightComponent && React__default.createElement(SideComponent, {
    className: useClassList_native.useClassList(),
    Component: RightComponent,
    style: activeStyles.content.right,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }));
});

exports.CheckboxWrapper = CheckboxWrapper;
//# sourceMappingURL=checkbox.wrapper-d0165ea9.js.map
