'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var textBox = require('./textBox.js');
var button = require('./button.js');
var card = require('./card.js');
var divider = require('./divider.js');
var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var useThemePath = require('./useThemePath.js');
var useThemeWithHeight = require('./useThemeWithHeight.js');
require('react-native');
var useThemeTypeAsClass = require('./useThemeTypeAsClass-a9284938.js');
var caption = require('./caption.js');
var h1 = require('./h1.js');
var h2 = require('./h2.js');
var h3 = require('./h3.js');
var h4 = require('./h4.js');
var h5 = require('./h5.js');
var h6 = require('./h6.js');
var label = require('./label.js');
var p = require('./p.js');
var subtitle = require('./subtitle.js');
var text = require('./text.js');
var view = require('./view-276572bd.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var input_web = require('./input.web-adf7ad46.js');
var checkbox = require('./checkbox-41f9f98a.js');
var reTheme = require('@keg-hub/re-theme');
var useClassList = require('./useClassList-89a8dbd4.js');
var useChildrenWithRefs = require('./useChildrenWithRefs.js');
var input = require('./input-c0e98e11.js');
var select = require('./select-32dba2a4.js');
var getInputValue = require('./getInputValue.js');
var useSelectHandlers = require('./useSelectHandlers.js');
var useClassName = require('./useClassName-51ea3221.js');
require('react-native-svg');
var icon = require('./icon-5bf6ad84.js');
var renderFromType = require('./renderFromType.js');
var getOnChangeHandler = require('./getOnChangeHandler.js');
var getChecked = require('./getChecked.js');
var _switch = require('./switch-4f0272b2.js');
var touchableIcon = require('./touchableIcon.js');
var cardMedia = require('./cardMedia-74c3dd87.js');
var grid = require('./grid.js');
var row = require('./row.js');
var column = require('./column.js');
var link_wrapper = require('./link.wrapper-17089db4.js');
var kegText = require('./kegText-f2cfdfd4.js');
var touchable = require('./touchable.js');
var getPlatform = require('./getPlatform-ec53cd5e.js');
var loading = require('./loading.js');
var section = require('./section.js');
var modal = require('./modal.js');
var itemHeader = require('./itemHeader.js');
var appHeader = require('./appHeader.js');
var scrollView = require('./scrollView.js');
var sectionList = require('./sectionList-e144fd2d.js');
var drawer = require('./drawer.js');
var textToggle = require('./textToggle.js');
var svgIcon = require('./svgIcon.js');
var withTouch = require('./withTouch.js');
var theme = require('./theme.js');
var useSpin = require('./useSpin-a05a1b73.js');
var useChildren = require('./useChildren.js');
var useInputHandlers = require('./useInputHandlers.js');
var useMediaProps = require('./useMediaProps.js');
var usePressHandlers = require('./usePressHandlers.js');
var useTextAccessibility = require('./useTextAccessibility.js');
var useFromToAnimation = require('./useFromToAnimation.js');
var useScrollClassName = require('./useScrollClassName-84521282.js');
var getOnLoad = require('./getOnLoad.js');
var getPressHandler = require('./getPressHandler.js');
var ensureClassArray = require('./ensureClassArray.js');
var getActiveOpacity = require('./getActiveOpacity.js');
var getImgSrc = require('./getImgSrc.js');
var getReadOnly = require('./getReadOnly.js');
var getTarget = require('./getTarget.js');
var handleRefUpdate = require('./handleRefUpdate.js');
var updateClassNames = require('./updateClassNames.js');
var buildColorStyles = require('./buildColorStyles.js');
var getStyles = require('./getStyles.js');
var inheritFrom = require('./inheritFrom.js');
var platformFlatten = require('./platformFlatten.js');
var buildTheme = require('./buildTheme.js');
var validateFunctions = require('./validateFunctions.js');
var isValidComponent = require('./isValidComponent.js');
require('./svgIcon-ce94c39f.js');
require('./cardContent.js');
require('./cardCallout.js');
require('./cardContainer.js');
require('./cardSection.js');
require('./colors-da502c66.js');
require('./view.native-99366b4b.js');
require('./checkbox.wrapper-b8cbc4f5.js');
require('./input-5bf3abae.js');
require('./image-e98c839c.js');
require('./container.js');
require('./kegText.native-1994a0b7.js');
require('./useTextStyles.js');
require('./indicator.wrapper-5ad2a9f5.js');
require('./getScrollValues-f3b1bfa7.js');
require('./themeDefaults-f48ffcaf.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Input = styleInjector.StyleInjector(input_web.Input, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input'
});
var FilePicker = React__default['default'].forwardRef(function (props, _ref) {
  var className = props.className,
      onChange = props.onChange,
      title = props.title,
      children = props.children,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$showFile = props.showFile,
      showFile = _props$showFile === void 0 ? true : _props$showFile,
      onFilePicked = props.onFilePicked,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? 'filePicker.default' : _props$themePath,
      _props$buttonThemePat = props.buttonThemePath,
      buttonThemePath = _props$buttonThemePat === void 0 ? 'button.contained.default' : _props$buttonThemePat,
      capture = props.capture,
      _props$openOnMount = props.openOnMount,
      openOnMount = _props$openOnMount === void 0 ? false : _props$openOnMount,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "onChange", "title", "children", "style", "showFile", "onFilePicked", "themePath", "buttonThemePath", "capture", "openOnMount"]);
  var componentTheme = useThemePath.useThemePath(themePath);
  var _useState = React.useState({}),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];
  var handleInputChange = React.useCallback(function (event) {
    onChange && onChange(event);
    var file = event.target.files[0];
    file && onFilePicked && onFilePicked(file);
    file && setFile(file);
  }, [onChange, onFilePicked, setFile]);
  var refToInput = React.useRef();
  var clickInput = React.useCallback(function () {
    return refToInput.current && refToInput.current.click();
  }, [refToInput]);
  React.useEffect(function () {
    openOnMount && clickInput();
  }, []);
  return React__default['default'].createElement(view.View, {
    className: useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-filepicker', className),
    style: [jsutils.get(componentTheme, 'main'), style]
  }, React__default['default'].createElement(button.Button, {
    content: title,
    onClick: clickInput,
    style: jsutils.get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React__default['default'].createElement(p.P, {
    style: jsutils.get(componentTheme, 'content.file')
  }, file.name), React__default['default'].createElement(Input, _rollupPluginBabelHelpers._extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: jsutils.get(componentTheme, 'content.input'),
    type: "file",
    capture: capture
  })));
});

var SimpleHeader = React__default['default'].forwardRef(function (props, ref) {
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

var Form = React__default['default'].forwardRef(function (props, ref) {
  var theme = reTheme.useTheme();
  var children = props.children,
      className = props.className;
      props.elType;
      var style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath.useThemePath(themePath);
  return React__default['default'].createElement(view.View, _rollupPluginBabelHelpers._extends({
    accessibilityRole: "form",
    className: useClassList.useClassList('keg-form', className)
  }, elProps, {
    style: [jsutils.get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});

var Option = function Option(props) {
  var children = props.children,
      label = props.label;
      props.style;
      var text = props.text,
      value = props.value,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React__default['default'].createElement("option", _rollupPluginBabelHelpers._extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};

var Radio = function Radio(props) {
  return React__default['default'].createElement(input.Input, _rollupPluginBabelHelpers._extends({}, props, {
    type: "radio"
  }));
};

var KegSelect = styleInjector.StyleInjector(select.Select, {
  displayName: 'Select',
  className: 'keg-select'
});
var getValue = function getValue(props) {
  var children = props.children,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      readOnly = props.readOnly,
      value = props.value;
  var setValue = getInputValue.getValueFromChildren(value, children);
  var valKey = getInputValue.getInputValueKey(false, onChange, onValueChange, readOnly);
  return _rollupPluginBabelHelpers._defineProperty({}, valKey, setValue);
};
var Select = React__default['default'].forwardRef(function (props, ref) {
  var _selectStyles$icon, _selectStyles$icon$di;
  var className = props.className,
      children = props.children,
      disabled = props.disabled;
      props.readOnly;
      var onChange = props.onChange,
      onValueChange = props.onValueChange,
      style = props.style,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath;
      props.value;
      var elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"]);
  var selectStyles = useThemePath.useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass.useThemeTypeAsClass(themePath || type, 'keg-select', className);
  var classRef = useClassName.useClassName('keg-select', selectClasses, ref);
  return React__default['default'].createElement(view.View, {
    style: [selectStyles.main, style]
  }, React__default['default'].createElement(KegSelect, _rollupPluginBabelHelpers._extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers.useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default['default'].createElement(icon.Icon, {
    styles: selectStyles.icon,
    Component: select.ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});

var Slider = function Slider() {
  return null;
};

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
  var className = props.className,
      checked = props.checked,
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
      var type = props.type,
      themePath = props.themePath,
      thumbColor = props.thumbColor,
      trackColor = props.trackColor,
      value = props.value,
      elProps = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["className", "checked", "children", "elType", "disabled", "LeftComponent", "close", "onChange", "onValueChange", "RightComponent", "styles", "SwitchComponent", "setCheckedSetter", "type", "themePath", "thumbColor", "trackColor", "value"]);
  var _useState = React.useState(jsutils.toBool(checked || value)),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  useSwitchHandle(ref, isChecked, setChecked);
  var elThemePath = themePath || "form.switch.".concat(close && 'close' || 'default');
  var themeStyles = useThemePath.useThemePath(elThemePath, styles);
  var activeStyles = useCheckedState(isChecked, themeStyles);
  var typeClassName = useThemeTypeAsClass.useThemeTypeAsClass(elThemePath || type, 'keg-switch', className);
  return children && React__default['default'].createElement(view.View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default['default'].createElement(ChildrenComponent, {
    className: "keg-switch-container",
    children: children
  })) || React__default['default'].createElement(view.View, {
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

var isWeb = getPlatform.getPlatform() === 'web';
var Text = kegText.KegText('link');
var Element = React__default['default'].forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href;
      props.onPress;
      var style = props.style,
      target = props.target,
      attrs = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default['default'].createElement(touchable.Touchable, _rollupPluginBabelHelpers._extends({
    className: useClassList.useClassList('keg-link', className)
  }, elProps, attrs, {
    touchRef: ref
  }), React__default['default'].createElement(Text, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React__default['default'].createElement(link_wrapper.LinkWrapper, _rollupPluginBabelHelpers._extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};

exports.TextBox = textBox.TextBox;
exports.Button = button.Button;
exports.Card = card.Card;
exports.Divider = divider.Divider;
exports.useThemePath = useThemePath.useThemePath;
exports.useThemeWithHeight = useThemeWithHeight.useThemeWithHeight;
exports.useThemeTypeAsClass = useThemeTypeAsClass.useThemeTypeAsClass;
exports.Caption = caption.Caption;
exports.H1 = h1.H1;
exports.H2 = h2.H2;
exports.H3 = h3.H3;
exports.H4 = h4.H4;
exports.H5 = h5.H5;
exports.H6 = h6.H6;
exports.Label = label.Label;
exports.P = p.P;
exports.Subtitle = subtitle.Subtitle;
exports.Text = text.Text;
exports.View = view.View;
exports.Checkbox = checkbox.Checkbox;
exports.useClassList = useClassList.useClassList;
exports.useChildrenWithRefs = useChildrenWithRefs.useChildrenWithRefs;
exports.Input = input.Input;
exports.getInputValueKey = getInputValue.getInputValueKey;
exports.getValueFromChildren = getInputValue.getValueFromChildren;
exports.useSelectHandlers = useSelectHandlers.useSelectHandlers;
exports.useClassName = useClassName.useClassName;
exports.Icon = icon.Icon;
exports.renderFromType = renderFromType.renderFromType;
exports.getOnChangeHandler = getOnChangeHandler.getOnChangeHandler;
exports.getChecked = getChecked.getChecked;
exports.TouchableIcon = touchableIcon.TouchableIcon;
exports.Image = cardMedia.Image;
exports.Grid = grid.Grid;
exports.Row = row.Row;
exports.Column = column.Column;
exports.Touchable = touchable.Touchable;
exports.getPlatform = getPlatform.getPlatform;
exports.Loading = loading.Loading;
exports.Section = section.Section;
exports.Modal = modal.Modal;
exports.ItemHeader = itemHeader.ItemHeader;
exports.AppHeader = appHeader.AppHeader;
exports.ScrollView = scrollView.ScrollView;
exports.SectionList = sectionList.SectionList;
exports.getElementLayout = sectionList.getElementLayout;
exports.scrollList = sectionList.scrollList;
exports.useScroll = sectionList.useScroll;
exports.Drawer = drawer.Drawer;
exports.TextToggle = textToggle.TextToggle;
exports.SvgIcon = svgIcon.SvgIcon;
exports.withTouch = withTouch.withTouch;
exports.theme = theme.theme;
exports.useAnimate = useSpin.useAnimate;
exports.useSpin = useSpin.useSpin;
exports.useChildren = useChildren.useChildren;
exports.useInputHandlers = useInputHandlers.useInputHandlers;
exports.useMediaProps = useMediaProps.useMediaProps;
exports.usePressHandlers = usePressHandlers.usePressHandlers;
exports.useTextAccessibility = useTextAccessibility.useTextAccessibility;
exports.useFromToAnimation = useFromToAnimation.useFromToAnimation;
exports.useScrollClassName = useScrollClassName.useScrollClassName;
exports.getOnLoad = getOnLoad.getOnLoad;
exports.getPressHandler = getPressHandler.getPressHandler;
exports.ensureClassArray = ensureClassArray.ensureClassArray;
exports.getActiveOpacity = getActiveOpacity.getActiveOpacity;
exports.getImgSrc = getImgSrc.getImgSrc;
exports.getReadOnly = getReadOnly.getReadOnly;
exports.getTarget = getTarget.getTarget;
exports.handleRefUpdate = handleRefUpdate.handleRefUpdate;
exports.updateClassNames = updateClassNames.updateClassNames;
exports.buildColorStyles = buildColorStyles.buildColorStyles;
exports.buildSurfaceStyles = buildColorStyles.buildSurfaceStyles;
exports.getStyles = getStyles.getStyles;
exports.inheritFrom = inheritFrom.inheritFrom;
exports.platformFlatten = platformFlatten.platformFlatten;
exports.buildTheme = buildTheme.buildTheme;
exports.validateFunctions = validateFunctions.validateFunctions;
exports.isValidComponent = isValidComponent.isValidComponent;
exports.A = Link;
exports.CheckGroup = CheckGroup;
exports.FilePicker = FilePicker;
exports.Form = Form;
exports.Link = Link;
exports.Option = Option;
exports.Radio = Radio;
exports.Select = Select;
exports.Slider = Slider;
exports.Switch = Switch;
//# sourceMappingURL=index.js.map
