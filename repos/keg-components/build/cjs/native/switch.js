'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var view_native = require('./view.native-5d72f4dd.js');
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
var reTheme = require('@keg-hub/re-theme');
var React = require('react');
var useThemeTypeAsClass_native = require('./useThemeTypeAsClass.native-90f04031.js');
var jsutils = require('@keg-hub/jsutils');
var renderFromType = require('./renderFromType.js');
var getOnChangeHandler = require('./getOnChangeHandler.js');
var getChecked = require('./getChecked.js');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
require('./useThemeWithHeight.js');
require('react-native');
var _switch = require('./switch-b6b2941a.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
require('./useClassName.native-3d1a229b.js');
require('./kegText-e1842e1b.js');
require('./kegText.js');
require('./useTextAccessibility.js');
require('./useTextStyles.js');
require('./isValidComponent.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "checked", "children", "elType", "disabled", "LeftComponent", "close", "onChange", "onValueChange", "RightComponent", "styles", "SwitchComponent", "setCheckedSetter", "type", "themePath", "thumbColor", "trackColor", "value"];
var KegSwitch = styleInjector.StyleInjector(_switch.Switch, {
  displayName: 'Switch',
  className: 'keg-switch'
});
var getSwitchColors = function getSwitchColors(thumbColor, trackColor, _ref) {
  var _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === void 0 ? {} : _ref$indicator,
      _ref$area = _ref.area,
      area = _ref$area === void 0 ? {} : _ref$area;
  var indicatorColor = thumbColor || indicator.color;
  var areaColor = trackColor || area.backgroundColor;
  var colors = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, indicatorColor && {
    thumbColor: thumbColor || color
  }), areaColor && {
    trackColor: areaColor,
    onTintColor: areaColor
  });
  return colors;
};
var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  var theme = reTheme.useTheme();
  return React.useMemo(function () {
    return theme.get(themeStyles, {
      content: {
        area: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, jsutils.get(themeStyles, 'content.area.off')), isChecked && jsutils.get(themeStyles, 'content.area.on')),
        indicator: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, jsutils.get(themeStyles, 'content.indicator.off')), isChecked && jsutils.get(themeStyles, 'content.indicator.on'))
      }
    });
  }, [isChecked]);
};
var setCheckedValue = function setCheckedValue(isChecked, setChecked, onChange) {
  return function (event) {
    setChecked(!isChecked);
    jsutils.checkCall(onChange, event, !isChecked);
  };
};
var SideComponent = function SideComponent(_ref2) {
  var Component = _ref2.Component,
      style = _ref2.style;
  return jsutils.isStr(Component) ? React__default['default'].createElement(text.Text, {
    style: style
  }, Component) : renderFromType.renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children;
  return React__default['default'].createElement(React__default['default'].Fragment, null, renderFromType.renderFromType(children, {}, null));
};
var useSwitchHandle = function useSwitchHandle(ref, isChecked, setChecked) {
  return React.useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: setChecked
    };
  }, [ref, isChecked, setChecked]);
};
var Switch = React.forwardRef(function (props, ref) {
  props.className;
      var checked = props.checked,
      children = props.children;
      props.elType;
      var disabled = props.disabled,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      styles = props.styles,
      SwitchComponent = props.SwitchComponent;
      props.setCheckedSetter;
      props.type;
      var themePath = props.themePath,
      thumbColor = props.thumbColor,
      trackColor = props.trackColor,
      value = props.value,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, _excluded);
  var _useState = React.useState(jsutils.toBool(checked || value)),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  useSwitchHandle(ref, isChecked, setChecked);
  var elThemePath = themePath || "form.switch.".concat(close && 'close' || 'default');
  var themeStyles = useThemePath.useThemePath(elThemePath, styles);
  var activeStyles = useCheckedState(isChecked, themeStyles);
  var typeClassName = useThemeTypeAsClass_native.useThemeTypeAsClass();
  return children && React__default['default'].createElement(view_native.View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default['default'].createElement(ChildrenComponent, {
    className: "keg-switch-container",
    children: children
  })) || React__default['default'].createElement(view_native.View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default['default'].createElement(SideComponent, {
    className: "keg-switch-left",
    Component: LeftComponent,
    style: activeStyles.content.left
  }), SwitchComponent ? renderFromType.renderFromType(SwitchComponent, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default['default'].createElement(KegSwitch, _rollupPluginBabelHelpers._extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getSwitchColors(thumbColor, trackColor, activeStyles.content), getChecked.getChecked(false, isChecked), getOnChangeHandler.getOnChangeHandler(false, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React__default['default'].createElement(SideComponent, {
    className: "keg-switch-right",
    Component: RightComponent,
    style: activeStyles.content.right
  }));
});

exports.Switch = Switch;
//# sourceMappingURL=switch.js.map
