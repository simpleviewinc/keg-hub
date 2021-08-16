'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var svgIcon = require('./svgIcon-bca364ff.js');
var view = require('./view-3fcb25db.js');
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
var text = require('./text.js');
var jsutils = require('@keg-hub/jsutils');
var renderFromType = require('./renderFromType.js');
var getOnChangeHandler = require('./getOnChangeHandler.js');
var getChecked = require('./getChecked.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native-web');
var useClassList = require('./useClassList-89a8dbd4.js');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-9fb8a8ab.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Check = function Check(props) {
  return React__namespace.createElement(svgIcon.SvgIcon, _rollupPluginBabelHelpers._extends({}, props, {
    viewBox: "0 0 512 512",
    delta: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
  }));
};

var _excluded = ["className", "initChecked", "checked", "children", "elType", "Element", "CheckIcon", "disabled", "disableCheck", "disableUncheck", "allowAdjacentPress", "isWeb", "LeftComponent", "leftClassName", "close", "onChange", "onValueChange", "RightComponent", "rightClassName", "styles", "CheckboxComponent", "type", "themePath", "value"];
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
  return jsutils.isStr(Component) ? React__default['default'].createElement(text.Text, _rollupPluginBabelHelpers._extends({
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
  return React__default['default'].createElement(React__default['default'].Fragment, null, renderFromType.renderFromType(children, {
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
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
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
  var typeClassName = useThemeTypeAsClass.useThemeTypeAsClass(elThemePath || type, 'keg-checkbox', className);
  var pressHandlerProp = getOnChangeHandler.getOnChangeHandler(isWeb, canUseHandler ? pressHandler : jsutils.noOp);
  var ChildrenView = children && React__default['default'].createElement(view.View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default['default'].createElement(ChildrenComponent, {
    className: "keg-checkbox-container",
    children: children
  }));
  return ChildrenView || React__default['default'].createElement(view.View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default['default'].createElement(SideComponent, {
    className: useClassList.useClassList('keg-checkbox-left', leftClassName),
    Component: LeftComponent,
    style: activeStyles.content.left,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }), CheckboxComponent ? renderFromType.renderFromType(CheckboxComponent, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default['default'].createElement(Element, _rollupPluginBabelHelpers._extends({
    className: "keg-checkbox-container",
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content,
    CheckIcon: CheckIcon
  }, getChecked.getChecked(isWeb, isChecked), pressHandlerProp)), RightComponent && React__default['default'].createElement(SideComponent, {
    className: useClassList.useClassList('keg-checkbox-right', rightClassName),
    Component: RightComponent,
    style: activeStyles.content.right,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }));
});

exports.Check = Check;
exports.CheckboxWrapper = CheckboxWrapper;
//# sourceMappingURL=checkbox.wrapper-17ad4895.js.map
