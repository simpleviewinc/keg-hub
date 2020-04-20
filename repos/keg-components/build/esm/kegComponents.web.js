import React, { useState, useMemo, useLayoutEffect, isValidElement, forwardRef, useRef, useCallback, useEffect } from 'react';
import { useTheme, helpers as helpers$1, useThemeHover, useThemeActive, withTheme } from 're-theme';
import { get, logData, deepMerge, reduceObj, jsonEqual, isFunc, isArr, isObj, isStr, validate, flatMap, mapEntries, checkCall, toBool, pickKeys, trainCase, isNum, capitalize } from 'jsutils';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, View as View$1, Text as Text$2, Clipboard } from 'react-native';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var checkEqual = function checkEqual(obj1, obj2) {
  return obj1 === obj2 || jsonEqual(obj1, obj2);
};
var getStylesFromPath = function getStylesFromPath(theme, path) {
  return get(theme, path) || function () {
    logData("Could not find ".concat(path, " on theme"), theme, "warn");
    var split = path.split('.');
    split[split.length] = 'default';
    return get(theme, split, {});
  }();
};
var getStyles = function getStyles(pathStyles, userStyles) {
  return useMemo(function () {
    if (!userStyles) return pathStyles;
    var pathKeys = Object.keys(pathStyles);
    var userKeys = Object.keys(userStyles);
    return pathKeys.indexOf(userKeys[0]) !== -1
    ? deepMerge(pathStyles, userStyles)
    : reduceObj(pathStyles, function (key, value, updated) {
      updated[key] = deepMerge(value, userStyles);
      return updated;
    }, {});
  }, [pathStyles, userStyles]);
};
var useThemePath = function useThemePath(path, styles) {
  var theme = useTheme();
  var foundStyles = getStylesFromPath(theme, path);
  var _useState = useState(foundStyles),
      _useState2 = _slicedToArray(_useState, 2),
      pathStyles = _useState2[0],
      setPathStyles = _useState2[1];
  var _useState3 = useState(styles),
      _useState4 = _slicedToArray(_useState3, 2),
      userStyles = _useState4[0],
      setUserStyles = _useState4[1];
  var _useState5 = useState(getStyles(pathStyles, userStyles)),
      _useState6 = _slicedToArray(_useState5, 2),
      themeStyles = _useState6[0],
      setThemeStyles = _useState6[1];
  useLayoutEffect(function () {
    var userEqual = checkEqual(styles, userStyles);
    var pathEqual = checkEqual(foundStyles, pathStyles);
    if (userEqual && pathEqual) return;
    !userEqual && setUserStyles(styles);
    !pathEqual && setPathStyles(foundStyles)
    ;
    (!userEqual || !pathEqual) && setThemeStyles(getStyles(pathStyles, userStyles));
  }, [foundStyles, styles]);
  return [themeStyles, setThemeStyles];
};

var isValidComponent = function isValidComponent(Component) {
  return isValidElement(Component) || isFunc(Component);
};

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent(Element) ? isFunc(Element) ? React.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React.createElement(Wrapper, props, Element) : Element;
};

var getActiveOpacity = function getActiveOpacity(isWeb, props, style) {
  return !isWeb ? {
    activeOpacity: props.activeOpacity || props.opacity || style && style.opacity || 0.3,
    accessibilityRole: "button"
  } : {};
};

var getChecked = function getChecked(isWeb, isChecked) {
  return _defineProperty({}, isWeb ? 'checked' : 'value', isChecked);
};

var getImgSrc = function getImgSrc(isWeb, src, source, uri) {
  var imgSrc = src || source || uri;
  var key = isWeb ? 'src' : 'source';
  return _defineProperty({}, key, isWeb ? isObj(imgSrc) ? imgSrc.uri : imgSrc : isStr(imgSrc) ? {
    uri: imgSrc
  } : imgSrc);
};

var getInputValueKey = function getInputValueKey(isWeb, onChange, onValueChange, readOnly) {
  return !isWeb ? 'selectedValue' : isFunc(onChange) || isFunc(onValueChange) || readOnly ? 'value' : 'defaultValue';
};
var getValueFromChildren = function getValueFromChildren(value, children) {
  return value ? value : children ? isArr(children) ? get(children, ['0', 'props', 'children']) : get(children, ['props', 'children']) : '';
};

var getOnLoad = function getOnLoad(isWeb, callback) {
  return _defineProperty({}, isWeb ? 'onLoad' : 'onLoadEnd', callback);
};

var getOnChangeHandler = function getOnChangeHandler(isWeb, onChange, onValueChange) {
  return _defineProperty({}, isWeb ? 'onChange' : 'onValueChange', onChange || onValueChange);
};

var getReadOnly = function getReadOnly(isWeb, readOnly, disabled) {
  var editable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var key = isWeb ? 'disabled' : 'editable';
  var value = isWeb ? readOnly || disabled || !editable : !(readOnly || disabled || !editable);
  return _defineProperty({}, key, value);
};

var getPressHandler = function getPressHandler(isWeb, onClick, onPress) {
  var action = onClick || onPress;
  return isFunc(action) && _defineProperty({}, isWeb ? 'onClick' : 'onPress', onClick || onPress) || {};
};

var getStyles$1 = function getStyles(isWeb, styles) {
  return isWeb ? isObj(styles) && {
    styles: styles
  } || {
    styles: {}
  } : {};
};

var getTarget = function getTarget(isWeb, target) {
  return isWeb && target ? {
    target: target
  } : {};
};

var getPlatform = function getPlatform() {
  return 'web';
};

var states = {
	defaultType: "default",
	types: {
		active: {
			shade: "light",
			opacity: 1
		},
		"default": {
			shade: "main",
			opacity: 1
		},
		disabled: {
			shade: "main",
			opacity: 0.4
		},
		hover: {
			shade: "dark",
			opacity: 1
		}
	}
};
var colors = {
	defaultType: "default",
	types: {
		"default": {
			palette: "gray"
		},
		primary: {
			palette: "green"
		},
		secondary: {
			palette: "blue"
		},
		warn: {
			palette: "orange"
		},
		danger: {
			palette: "red"
		}
	},
	palette: {
		transparent: "rgba(255,255,255,0)",
		white01: "#ffffff",
		white02: "#fafafa",
		white03: "#f5f5f5",
		black: [
			20,
			"#333333",
			-20
		],
		gray: [
			45,
			"#999999",
			-20
		],
		blue: [
			20,
			"#2196F3",
			-20
		],
		green: [
			20,
			"#02b4a3",
			-20
		],
		orange: [
			20,
			"#ff5f01",
			-20
		],
		red: [
			20,
			"#f51f10",
			-20
		],
		purple: [
			20,
			"#782dad",
			-20
		]
	}
};
var layout = {
	sides: [
		"left",
		"right",
		"top",
		"bottom"
	],
	margin: 15,
	padding: 15
};
var font = {
	size: 16,
	spacing: 0.15,
	bold: "700",
	units: "px",
	family: "Verdana, Geneva, sans-serif"
};
var form = {
	border: {
		radius: 5
	},
	input: {
		height: 35
	},
	"switch": {
		space: 15,
		height: 20,
		width: 20
	},
	checkbox: {
		space: 15,
		height: 20,
		width: 20
	},
	select: {
		height: 35
	}
};
var defaults = {
	states: states,
	colors: colors,
	layout: layout,
	font: font,
	form: form
};

var defPalette = get(defaults, 'colors.palette', {});
var defTypes = get(defaults, 'colors.types', {});
var colors$1 = {
  opacity: helpers$1.colors.opacity,
  palette: reduceObj(defPalette, function (key, value, updated) {
    !isArr(value) ? updated[key] = value : value.map(function (val, i) {
      var name = "".concat(key, "0").concat(i + 1);
      updated[name] = isStr(val) ? val : helpers$1.colors.shadeHex(value[1], value[i]);
    });
    return updated;
  }, {})
};
colors$1.surface = reduceObj(defTypes, function (key, value, updated) {
  updated[key] = {
    colors: {
      light: colors$1.palette["".concat(value.palette, "01")],
      main: colors$1.palette["".concat(value.palette, "02")],
      dark: colors$1.palette["".concat(value.palette, "03")]
    }
  };
  return updated;
}, {});

var colorSurface = get(colors$1, 'surface', {});

var allPlatforms = "$all";
var platform = "$" + getPlatform();
var nonPlatform =  "$native";
var platforms = [allPlatforms, platform, nonPlatform];
var mergePlatforms = function mergePlatforms(toMerge) {
  var $all = toMerge.$all,
      $web = toMerge.$web,
      $native = toMerge.$native,
      otherKeys = _objectWithoutProperties(toMerge, ["$all", "$web", "$native"]);
  return platforms.reduce(function (merged, plat) {
    var platStyles = plat !== nonPlatform && get(toMerge, [plat]);
    return platStyles ? deepMerge(merged, platStyles) : merged;
  }, otherKeys);
};
var platformFlatten = function platformFlatten(initial) {
  var hasPlatforms = Object.keys(initial).some(function (key) {
    return platforms.indexOf(key) !== -1;
  });
  var noPlatforms = hasPlatforms && mergePlatforms(initial) || _objectSpread2({}, initial);
  return reduceObj(noPlatforms, function (key, value, merged) {
    merged[key] = isObj(value) ? platformFlatten(value) : value;
    return merged;
  }, noPlatforms);
};

var inheritFrom = function inheritFrom() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  return deepMerge.apply(void 0, _toConsumableArray(styles.map(function (style) {
    return isObj(style) ? platformFlatten(style) : undefined;
  })));
};

var defaultColorTypes = Object.keys(defaults.colors.types);
var defaultStateTypes = Object.keys(defaults.states.types);
var buildTheme = function buildTheme(themeFn) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _validate = validate({
    themeFn: themeFn,
    options: options
  }, {
    themeFn: isFunc,
    options: isObj
  }, {
    prefix: '[buildTheme] Invalid theme setup.'
  }),
      _validate2 = _slicedToArray(_validate, 1),
      valid = _validate2[0];
  if (!valid) return;
  var _options$states = options.states,
      states = _options$states === void 0 ? defaultStateTypes : _options$states,
      _options$colorTypes = options.colorTypes,
      colorTypes = _options$colorTypes === void 0 ? defaultColorTypes : _options$colorTypes,
      _options$inheritFrom = options.inheritFrom,
      inheritFrom = _options$inheritFrom === void 0 ? [] : _options$inheritFrom;
  var combinations = pairsOf(states, colorTypes);
  var themeWithTypes = combinations.reduce(themeReducer(themeFn), {});
  return platformFlatten(deepMerge.apply(void 0, _toConsumableArray(inheritFrom).concat([themeWithTypes])));
};
var pairsOf = function pairsOf(states, colorTypes) {
  return flatMap(states, function (state) {
    return colorTypes.map(function (type) {
      return [state, type];
    });
  });
};
var themeReducer = function themeReducer(themeFn) {
  return function (totalTheme, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        state = _ref2[0],
        colorType = _ref2[1];
    return deepMerge(totalTheme, themeForType(themeFn, state, colorType));
  };
};
var themeForType = function themeForType(themeFn, state, colorType) {
  return _defineProperty({}, colorType, _defineProperty({}, state, themeFn(state, colorType)));
};

var validateFunctions = function validateFunctions(functionObj) {
  return mapEntries(functionObj, function (name, func) {
    return [name, isFunc(func)];
  });
};

var makeHandlerObject = function makeHandlerObject(handler, _ref) {
  var onChange = _ref.onChange,
      onValueChange = _ref.onValueChange,
      onChangeText = _ref.onChangeText;
  return Boolean(onChange || onValueChange || onChangeText) ? {
    onChange: handler
  } : {};
};
var useInputHandlers = function useInputHandlers() {
  var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = handlers.onChange,
      onValueChange = handlers.onValueChange,
      onChangeText = handlers.onChangeText;
  return useMemo(function () {
    var areValidFuncs = validateFunctions(handlers);
    var handleChange = function handleChange(event) {
      var value = get(event, 'target.value');
      areValidFuncs.onChange && onChange(event);
      areValidFuncs.onValueChange && onValueChange(value);
      areValidFuncs.onChangeText && onChangeText(value);
    };
    return makeHandlerObject(handleChange, areValidFuncs);
  }, [onChange, onValueChange, onChangeText]);
};

var makeHandlerObject$1 = function makeHandlerObject(handler, _ref) {
  var onChange = _ref.onChange,
      onValueChange = _ref.onValueChange;
  return Boolean(onChange || onValueChange) ? {
    onChange: handler
  } : {};
};
var useSelectHandlers = function useSelectHandlers() {
  var handlers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = handlers.onChange,
      onValueChange = handlers.onValueChange;
  return useMemo(function () {
    var validFuncMap = validateFunctions(handlers);
    var onChangeHandler = function onChangeHandler(event) {
      var value = get(event, 'target.value');
      validFuncMap.onChange && onChange(event);
      validFuncMap.onValueChange && onValueChange(value);
    };
    return makeHandlerObject$1(onChangeHandler, validFuncMap);
  }, [onChange, onValueChange]);
};

var makeHandlerObject$2 = function makeHandlerObject(isWeb, handler, _ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick;
  var handlerName = isWeb ? 'onClick' : 'onPress';
  return Boolean(onPress || onClick) ? _defineProperty({}, handlerName, handler) : {};
};
var usePressHandlers = function usePressHandlers(isWeb) {
  var handlers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onPress = handlers.onPress,
      onClick = handlers.onClick;
  return useMemo(function () {
    var validFuncsMap = validateFunctions(handlers);
    var handler = function handler(event) {
      validFuncsMap.onPress && onPress(event);
      validFuncsMap.onClick && onClick(event);
    };
    return makeHandlerObject$2(isWeb, handler, validFuncsMap);
  }, [onPress, onClick]);
};

var elMap = {
	web: {
		link: "a",
		paragraph: "p",
		subtitle: "span",
		caption: "pre",
		text: "span"
	}
};
var attrKeyMap = {
	web: {
		testID: "id",
		numberOfLines: false
	}
};
var domMap = {
	elMap: elMap,
	attrKeyMap: attrKeyMap
};

var domAttrKeys = Object.keys(domMap.attrKeyMap.web);
var filterAttrs = function filterAttrs(attrs) {
  return reduceObj(attrs, function (key, value, updated) {
    domAttrKeys.indexOf(key) === -1 ? updated[key] = value : domMap.attrKeyMap.web[key] !== false && (updated[domMap.attrKeyMap.web[key] || key] = value);
    return updated;
  }, {});
};
var getNode = function getNode(element) {
  var node = element && element.toLowerCase();
  return domMap.elMap.web[node] || element || 'span';
};
var ellipsisStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'block'
};
var Text = forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      element = props.element,
      style = props.style,
      onPress = props.onPress,
      onClick = props.onClick,
      ellipsis = props.ellipsis,
      attrs = _objectWithoutProperties(props, ["children", "element", "style", "onPress", "onClick", "ellipsis"]);
  var textStyles = theme.get('typography.font.family', 'typography.default', ellipsis && ellipsisStyle, element && "typography.".concat(element));
  var Node = getNode(element);
  return React.createElement(Node, _extends({}, filterAttrs(attrs), {
    style: theme.join(textStyles, style),
    onClick: onClick || onPress,
    ref: ref
  }), children);
});
var KegText = function KegText(element) {
  return forwardRef(function (props, ref) {
    return React.createElement(Text, _extends({}, props, {
      element: element,
      ref: ref
    }));
  });
};

var Text$1 = KegText('text');

var getChildren = function getChildren(Children) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return renderFromType(Children, {
    style: styles.content
  }, Text$1);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _objectSpread2({}, mainStyles, {}, get(btnStyles, 'disabled.main')) : mainStyles;
};
var ButtonWrapper = function ButtonWrapper(props) {
  var Element = props.Element,
      children = props.children,
      content = props.content,
      isWeb = props.isWeb,
      onClick = props.onClick,
      onPress = props.onPress,
      themePath = props.themePath,
      ref = props.ref,
      styles = props.styles,
      elProps = _objectWithoutProperties(props, ["Element", "children", "content", "isWeb", "onClick", "onPress", "themePath", "ref", "styles"]);
  var _useThemePath = useThemePath(themePath || 'button.contained.default', styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      btnStyles = _useThemePath2[0];
  var _useThemeHover = useThemeHover(get(btnStyles, 'default', {}), get(btnStyles, 'hover'), {
    ref: ref,
    noMerge: true
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      hoverRef = _useThemeHover2[0],
      hoverStyles = _useThemeHover2[1];
  var _useThemeActive = useThemeActive(hoverStyles, get(btnStyles, 'active'), {
    ref: hoverRef,
    noMerge: true
  }),
      _useThemeActive2 = _slicedToArray(_useThemeActive, 2),
      themeRef = _useThemeActive2[0],
      themeStyles = _useThemeActive2[1];
  return React.createElement(Element, _extends({}, elProps, {
    ref: themeRef,
    style: checkDisabled(themeStyles.main, btnStyles, props.disabled),
    children: getChildren(children || content, themeStyles)
  }, getPressHandler(isWeb, onClick, onPress), getActiveOpacity(isWeb, props, btnStyles)));
};
ButtonWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  Element: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  themePath: PropTypes.string
};

var Element = React.forwardRef(function (props, ref) {
  return React.createElement("button", _extends({}, props, {
    ref: ref
  }));
});
var Button = function Button(props) {
  return React.createElement(ButtonWrapper, _extends({}, props, {
    Element: Element,
    isWeb: true
  }));
};
Button.propTypes = _objectSpread2({}, ButtonWrapper.propTypes);

var View = React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);
  return React.createElement("div", _extends({}, props, {
    ref: ref
  }), children);
});

var indicatorUri = "data:image/webp;base64,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";

var buildStyles = function buildStyles(theme, style, styles, isWeb) {
  var built = {};
  built.img = theme.get('components.indicator.image', styles.image, style);
  built.wrapper = theme.get('components.indicator.wrapper', styles.wrapper);
  return built;
};
var IndicatorWrapper = function IndicatorWrapper(props) {
  var alt = props.alt,
      Element = props.Element,
      isWeb = props.isWeb,
      resizeMode = props.resizeMode,
      src = props.src,
      source = props.source,
      style = props.style,
      styles = props.styles;
  var theme = useTheme();
  var builtStyles = buildStyles(theme, style, styles || {});
  return React.createElement(View, {
    style: builtStyles.wrapper
  }, React.createElement(Element, _extends({
    alt: alt || 'Loading',
    style: builtStyles.img,
    resizeMode: resizeMode || 'contain'
  }, getImgSrc(isWeb, src, source, indicatorUri))));
};

var Element$1 = function Element(_ref) {
  var resizeMode = _ref.resizeMode,
      attrs = _objectWithoutProperties(_ref, ["resizeMode"]);
  return React.createElement("img", _extends({
    alt: attrs.alt || 'Loading'
  }, attrs));
};
var Indicator = function Indicator(_ref2) {
  var alt = _ref2.alt,
      src = _ref2.src,
      source = _ref2.source,
      style = _ref2.style;
  return React.createElement(IndicatorWrapper, {
    alt: alt || 'Loading',
    Element: Element$1,
    isWeb: true,
    src: src || source,
    style: style
  });
};

var Progress = function Progress(props) {
  var styles = props.styles,
      text = props.text,
      theme = props.theme,
      loadIndicator = props.loadIndicator;
  var LoadingIndicator = loadIndicator || Indicator;
  return React.createElement(View, {
    style: theme.get('components.loading.progress', styles.progress)
  }, isValidComponent(LoadingIndicator) ? React.createElement(LoadingIndicator, null) : text && React.createElement(Text$1, {
    style: theme.get('components.loading.text', styles.text)
  }, text));
};
var Loading = function Loading(props) {
  var theme = useTheme();
  var children = props.children,
      text = props.text,
      indicator = props.indicator;
  var styles = props.styles || {};
  return React.createElement(View, {
    style: theme.get('components.loading.wrapper', styles.wrapper)
  }, children || React.createElement(Progress, {
    styles: styles,
    theme: theme,
    text: text,
    loadIndicator: indicator
  }));
};
Loading.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  wrapStyle: PropTypes.object,
  children: PropTypes.object
};

var onLoadEvent = function onLoadEvent(setLoading, props, setStyle, loadedStyle) {
  return function (event) {
    checkCall(setLoading, false);
    checkCall(setStyle, loadedStyle);
    checkCall(props.onLoad, event, props);
  };
};
var buildStyles$1 = function buildStyles(style, styles, theme, type) {
  var defStyle = theme.get(checkCall(get(theme, 'transition.opacity')), "components.image.".concat(type));
  var imgStyle = theme.get(styles.image, style);
  var loading = theme.get(defStyle, 'components.image.loading', imgStyle, {
    width: 0,
    height: 0
  });
  var loaded = theme.get(defStyle, 'components.image.loaded', imgStyle);
  var loadingComp = theme.get({
    width: loaded.width,
    height: loaded.height
  }, styles.loading);
  var hover = theme.get('components.image.hover', styles.hover);
  var wrapper = theme.get('components.image.wrapper', styles.wrapper);
  return {
    hover: hover,
    loading: loading,
    loadingComp: loadingComp,
    loaded: loaded,
    wrapper: wrapper
  };
};
var ImageWrapper = forwardRef(function (props, ref) {
  var theme = useTheme();
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
  var alt = props.alt,
      children = props.children,
      Element = props.Element,
      isWeb = props.isWeb,
      onClick = props.onClick,
      onPress = props.onPress,
      src = props.src,
      source = props.source,
      style = props.style,
      styles = props.styles,
      type = props.type,
      _props$useLoading = props.useLoading,
      useLoading = _props$useLoading === void 0 ? true : _props$useLoading,
      attrs = _objectWithoutProperties(props, ["alt", "children", "Element", "isWeb", "onClick", "onPress", "src", "source", "style", "styles", "type", "useLoading"]);
  var builtStyles = buildStyles$1(style, styles || {}, theme, type || 'default');
  var _useThemeHover = useThemeHover(builtStyles.loaded, builtStyles.hover, {
    ref: ref
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 3),
      useRef = _useThemeHover2[0],
      useStyle = _useThemeHover2[1],
      setStyle = _useThemeHover2[2];
  return React.createElement(View, {
    style: builtStyles.wrapper
  }, loading && useLoading && React.createElement(Loading, {
    type: 'image',
    style: builtStyles.loadingComp
  }), React.createElement(Element, _extends({
    ref: useRef,
    attrs: attrs,
    alt: alt,
    style: loading ? builtStyles.loading : useStyle
  }, getPressHandler(isWeb, onClick, onPress), getImgSrc(isWeb, src, source), getOnLoad(isWeb, onLoadEvent(setLoading, props, setStyle, builtStyles.loaded)))));
});
ImageWrapper.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

var Element$2 = forwardRef(function (_ref, ref) {
  var attrs = _ref.attrs,
      alt = _ref.alt,
      onPress = _ref.onPress,
      props = _objectWithoutProperties(_ref, ["attrs", "alt", "onPress"]);
  return React.createElement("img", _extends({
    alt: alt
  }, attrs, props, {
    ref: ref
  }));
});
var Image = forwardRef(function (props, ref) {
  return React.createElement(ImageWrapper, _extends({}, props, {
    ref: ref,
    Element: Element$2,
    isWeb: true
  }));
});
Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

var CardImageTitle = function CardImageTitle(_ref) {
  var subtitle = _ref.subtitle,
      title = _ref.title,
      styles = _ref.styles,
      theme = _ref.theme;
  return React.createElement(View, {
    style: theme.join(get(theme, ['components', 'card', 'overlay']), styles.overlay)
  }, title && React.createElement(Text$1, {
    style: theme.join(get(theme, ['components', 'card', 'featured', 'title']), styles.title)
  }, title), subtitle && React.createElement(Text$1, {
    style: theme.join(get(theme, ['components', 'card', 'featured', 'subtitle']), styles.subtitle)
  }, subtitle));
};
var CardImage = function CardImage(_ref2) {
  var image = _ref2.image,
      subtitle = _ref2.subtitle,
      styles = _ref2.styles,
      title = _ref2.title;
  var theme = useTheme();
  return React.createElement(Image, _extends({}, image, {
    styles: {
      loading: styles.loading,
      wrapper: styles.wrapper
    },
    style: theme.join(get(theme, ['components', 'card', 'image', 'image']), styles.image)
  }), (title || subtitle) && React.createElement(CardImageTitle, {
    subtitle: subtitle,
    title: title,
    styles: styles,
    theme: theme
  }));
};
CardImage.propTypes = {
  image: PropTypes.object,
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

var Divider = function Divider(_ref) {
  var style = _ref.style,
      props = _objectWithoutProperties(_ref, ["style"]);
  var theme = useTheme();
  return React.createElement(View, _extends({}, props, {
    style: theme.join(get(theme, ['divider']), style)
  }));
};
Divider.propTypes = {
  style: PropTypes.object
};

var CardHeader = function CardHeader(_ref) {
  var header = _ref.header,
      theme = _ref.theme,
      numberOfLines = _ref.numberOfLines,
      styles = _ref.styles;
  if (!header || React.isValidElement(header)) return header || null;
  return React.createElement(View, null, React.createElement(Text$1, {
    numberOfLines: numberOfLines,
    style: styles.header
  }, header), React.createElement(Divider, {
    style: styles.divider
  }));
};
CardHeader.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  theme: PropTypes.object
};
var CardContainer = function CardContainer(_ref2) {
  var attributes = _ref2.attributes,
      children = _ref2.children,
      styles = _ref2.styles,
      theme = _ref2.theme;
  return React.createElement(View, _extends({}, attributes, {
    style: styles.container
  }), React.createElement(View, {
    style: styles.wrapper
  }, children));
};
CardContainer.propTypes = {
  attributes: PropTypes.object,
  styles: PropTypes.object,
  theme: PropTypes.object
};
var CardFooter = function CardFooter(_ref3) {
  var footer = _ref3.footer,
      theme = _ref3.theme,
      numberOfLines = _ref3.numberOfLines,
      styles = _ref3.styles;
  if (!footer || React.isValidElement(footer)) return footer || null;
  return React.createElement(View, null, React.createElement(Divider, {
    style: styles.divider
  }), React.createElement(Text$1, {
    numberOfLines: numberOfLines,
    style: styles.footer
  }, footer));
};
CardFooter.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  theme: PropTypes.object
};

var buildStyles$2 = function buildStyles(styles, theme) {
  var cardStyles = {};
  cardStyles.container = theme.join(get(theme, ['card', 'container']), styles.container);
  cardStyles.wrapper = theme.join(get(theme, ['card', 'wrapper']), styles.wrapper);
  cardStyles.header = theme.join(theme.get('typography.h5', 'card.header'), styles.header);
  cardStyles.footer = theme.join(get(theme, ['card', 'footer']), styles.footer);
  cardStyles.divider = theme.join(get(theme, ['card', 'divider']), styles.divider);
  cardStyles.children = theme.join(get(theme, ['card', 'children']), cardStyles.children);
  return cardStyles;
};
var getImgProps = function getImgProps(image, styles) {
  return isStr(image) ? {
    src: image,
    style: styles.image
  } : _objectSpread2({}, image, {
    style: _objectSpread2({}, deepMerge(image.style, styles.image))
  });
};
var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);
  var theme = useTheme();
  styles = styles || {};
  var children = props.children,
      footer = props.footer,
      footerLines = props.footerLines,
      header = props.header,
      headerLines = props.headerLines,
      image = props.image,
      subtitle = props.subtitle,
      title = props.title,
      attributes = _objectWithoutProperties(props, ["children", "footer", "footerLines", "header", "headerLines", "image", "subtitle", "title"]);
  var hasImage = Boolean(image);
  var imgProps = hasImage && getImgProps(image, styles);
  var cardStyles = buildStyles$2(styles, theme);
  return React.createElement(CardContainer, {
    theme: theme,
    attributes: attributes,
    styles: cardStyles
  }, React.createElement(CardHeader, {
    header: header,
    theme: theme,
    numberOfLines: headerLines,
    styles: cardStyles
  }), hasImage && React.createElement(CardImage, {
    title: title,
    subtitle: subtitle,
    image: imgProps,
    children: children,
    styles: {
      children: cardStyles.children,
      image: imgProps.style,
      loading: styles.loading,
      overlay: styles.overlay,
      subtitle: styles.subtitle,
      title: styles.title,
      wrapper: styles.imageWrapper
    }
  }), React.createElement(View, {
    style: cardStyles.children
  }, children), footer && React.createElement(CardFooter, {
    footer: footer,
    theme: theme,
    numberOfLines: footerLines,
    styles: cardStyles
  }));
};
Card.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerNumberOfLines: PropTypes.number,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  styles: PropTypes.object
};

var getHeight = function getHeight(height, toggled) {
  return toggled ? height : height && !toggled ? 0 : null;
};
var Drawer = function Drawer(props) {
  var theme = useTheme();
  var style = props.style,
      children = props.children,
      toggled = props.toggled;
  var slideRef = useRef(null);
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      height = _useState2[0],
      setHeight = _useState2[1];
  useLayoutEffect(function () {
    var curHeight = get(slideRef, 'current.offsetHeight');
    if (curHeight === 0) return;
    height !== curHeight && setHeight(curHeight);
  }, [height]);
  var sliderStyle = theme.join({
    overflow: 'hidden',
    transition: 'max-height 1s ease'
  }, get(theme, 'components.drawer'), style, {
    maxHeight: getHeight(height, toggled)
  });
  return React.createElement(View, {
    ref: slideRef,
    style: sliderStyle
  }, children);
};
Drawer.propTypes = {
  toggled: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.object
};

var Caption = KegText('caption');

var H1 = KegText('h1');

var H2 = KegText('h2');

var H3 = KegText('h3');

var H4 = KegText('h4');

var H5 = KegText('h5');

var H6 = KegText('h6');

var Label = KegText('label');

var P = KegText('paragraph');

var Subtitle = KegText('subtitle');

var FilePicker = React.forwardRef(function (props, _ref) {
  var onChange = props.onChange,
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
      args = _objectWithoutProperties(props, ["onChange", "title", "children", "style", "showFile", "onFilePicked", "themePath", "buttonThemePath", "capture", "openOnMount"]);
  var theme = useTheme();
  var _useThemePath = useThemePath(themePath),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      componentTheme = _useThemePath2[0];
  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      file = _useState2[0],
      setFile = _useState2[1];
  var handleInputChange = useCallback(function (event) {
    onChange && onChange(event);
    var file = event.target.files[0];
    file && onFilePicked && onFilePicked(file);
    file && setFile(file);
  }, [onChange, onFilePicked, setFile]);
  var refToInput = useRef();
  var clickInput = useCallback(function () {
    return refToInput.current && refToInput.current.click();
  }, [refToInput]);
  useEffect(function () {
    openOnMount && clickInput();
  }, []);
  return React.createElement(View, {
    style: theme.join(get(componentTheme, 'main'), style)
  }, React.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React.createElement(P, {
    style: get(componentTheme, 'content.file')
  }, file.name), React.createElement("input", _extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: get(componentTheme, 'content.input'),
    type: "file",
    capture: capture
  })));
});
FilePicker.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  fileStyle: PropTypes.object,
  themePath: PropTypes.string,
  buttonThemePath: PropTypes.string,
  onChange: PropTypes.func,
  onFilePicked: PropTypes.func,
  showFile: PropTypes.bool
};

var buildStyles$3 = function buildStyles(styles, theme, checked, type) {
  var status = checked && 'on' || 'off';
  var container = theme.get("form.".concat(type, ".container"), styles && styles.container);
  var wrapper = theme.get("form.".concat(type, ".wrapper"), styles && styles.wrapper);
  var area = theme.get("form.".concat(type, ".area"), styles && styles.bounds);
  var indicator = theme.get("form.".concat(type, ".indicator"), "form.".concat(type, ".").concat(status), styles && styles.indicator);
  var leftText = theme.get("form.".concat(type, ".text"), "form.".concat(type, ".leftText"), styles && styles.text, styles && styles.leftText);
  var rightText = theme.get("form.".concat(type, ".text"), "form.".concat(type, ".rightText"), styles && styles.text, styles && styles.rightText);
  return {
    container: container,
    wrapper: wrapper,
    area: area,
    indicator: indicator,
    leftText: leftText,
    rightText: rightText
  };
};
var setCheckedValue = function setCheckedValue(isChecked, setChecked, onChange) {
  return function (event) {
    setChecked(!isChecked);
    checkCall(onChange, event, !isChecked);
  };
};
var SideText = function SideText(_ref) {
  var text = _ref.text,
      style = _ref.style;
  return isValidComponent(text) ? text : isStr(text) && React.createElement(Text$1, {
    style: style
  }, text);
};
var SwitchWrapper = function SwitchWrapper(props) {
  var theme = useTheme();
  var checked = props.checked,
      Element = props.Element,
      disabled = props.disabled,
      isWeb = props.isWeb,
      leftText = props.leftText,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      ref = props.ref,
      rightText = props.rightText,
      style = props.style,
      styles = props.styles,
      type = props.type,
      value = props.value,
      children = props.children,
      elProps = _objectWithoutProperties(props, ["checked", "Element", "disabled", "isWeb", "leftText", "onChange", "onValueChange", "ref", "rightText", "style", "styles", "type", "value", "children"]);
  var _useState = useState(toBool(checked || value)),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  var builtStyles = buildStyles$3(styles, theme, isChecked, type || 'switch');
  return React.createElement(View, {
    style: builtStyles.container
  }, React.createElement(SideText, {
    text: leftText,
    style: builtStyles.leftText
  }), React.createElement(Element, _extends({
    elProps: elProps,
    disabled: disabled,
    style: style
  }, getChecked(isWeb, isChecked), getStyles$1(isWeb, builtStyles), getOnChangeHandler(isWeb, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), React.createElement(SideText, {
    text: rightText,
    style: builtStyles.rightText
  }));
};
SwitchWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string
};

var Element$3 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["elProps", "styles"]);
  return React.createElement(View, {
    style: styles.wrapper
  }, React.createElement(View, {
    style: styles.area
  }), React.createElement(View, {
    style: styles.indicator
  }), React.createElement("input", _extends({}, elProps, props, {
    type: "checkbox",
    ref: ref,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'pointer'
    }
  })));
});
var Checkbox = function Checkbox(props) {
  return React.createElement(SwitchWrapper, _extends({}, props, {
    type: 'checkbox',
    Element: Element$3,
    isWeb: true
  }));
};

var buildStyles$4 = function buildStyles(theme, type, elType) {
  var form = theme.get('form.form.default', type && "form.form.".concat(type));
  return {
    form: form
  };
};
var FormWrapper = React.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      Element = props.Element,
      elType = props.elType,
      isWeb = props.isWeb,
      style = props.style,
      type = props.type,
      elProps = _objectWithoutProperties(props, ["children", "Element", "elType", "isWeb", "style", "type"]);
  var builtStyles = buildStyles$4(theme, type);
  return React.createElement(Element, {
    elProps: elProps,
    ref: ref,
    style: theme.join(builtStyles.form, style),
    children: children
  });
});
FormWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string
};

var Element$4 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["elProps", "children"]);
  return React.createElement("form", _extends({}, elProps, props, {
    ref: ref
  }), children);
});
var Form = function Form(props) {
  return React.createElement(FormWrapper, _extends({}, props, {
    Element: Element$4,
    elType: "web",
    isWeb: true
  }));
};
Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  onSubmit: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string
};

var getValue = function getValue(_ref) {
  var children = _ref.children,
      value = _ref.value;
  var setValue = getValueFromChildren(value, children);
  return value !== undefined ? {
    value: setValue
  } : {};
};
var InputWrapper = forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$editable = props.editable,
      editable = _props$editable === void 0 ? true : _props$editable,
      Element = props.Element,
      elType = props.elType,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      onChangeText = props.onChangeText,
      onClick = props.onClick,
      onPress = props.onPress,
      _props$readOnly = props.readOnly,
      readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.input.".concat(type) : _props$themePath,
      style = props.style,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["children", "disabled", "editable", "Element", "elType", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"]);
  var isWeb = elType === 'web';
  var _useThemePath = useThemePath(themePath),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      inputStyles = _useThemePath2[0];
  return React.createElement(Element, _extends({
    elProps: elProps,
    style: theme.join(inputStyles, style),
    ref: ref
  }, getReadOnly(isWeb, readOnly, disabled, editable), getValue(props), useInputHandlers({
    onChange: onChange,
    onValueChange: onValueChange,
    onChangeText: onChangeText
  }), usePressHandlers(isWeb, {
    onClick: onClick,
    onPress: onPress
  })), children);
});
InputWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  elType: PropTypes.string,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onChangeText: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

var WebInput = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      args = _objectWithoutProperties(_ref, ["elProps"]);
  return React.createElement("input", _extends({}, args, elProps, {
    ref: ref
  }));
});
var Input = function Input(props) {
  return React.createElement(InputWrapper, _extends({
    Element: WebInput,
    elType: 'web'
  }, props));
};
Input.propTypes = _objectSpread2({}, InputWrapper.propTypes, {
  theme: PropTypes.object,
  style: PropTypes.object,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onPress: PropTypes.func
});

var Option = function Option(props) {
  var children = props.children,
      label = props.label,
      style = props.style,
      text = props.text,
      value = props.value,
      args = _objectWithoutProperties(props, ["children", "label", "style", "text", "value"]);
  return React.createElement("option", _extends({}, args, {
    value: value || label || text
  }), label || value || text || children);
};
Option.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

var Radio = function Radio(props) {
  return React.createElement(Input, _extends({}, props, {
    type: "radio"
  }));
};

var getValue$1 = function getValue(_ref, isWeb) {
  var children = _ref.children,
      onChange = _ref.onChange,
      onValueChange = _ref.onValueChange,
      readOnly = _ref.readOnly,
      value = _ref.value;
  var setValue = getValueFromChildren(value, children);
  var valKey = getInputValueKey(isWeb, onChange, onValueChange, readOnly);
  return _defineProperty({}, valKey, setValue);
};
var SelectWrapper = function SelectWrapper(props) {
  var theme = useTheme();
  var children = props.children,
      editable = props.editable,
      disabled = props.disabled,
      Element = props.Element,
      isWeb = props.isWeb,
      readOnly = props.readOnly,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath,
      style = props.style,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["children", "editable", "disabled", "Element", "isWeb", "readOnly", "onChange", "onValueChange", "type", "themePath", "style", "value"]);
  var _useThemePath = useThemePath(themePath),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      selectStyles = _useThemePath2[0];
  return React.createElement(Element, _extends({
    elProps: elProps,
    style: theme.join(selectStyles, style)
  }, getReadOnly(isWeb, readOnly, disabled, editable), getValue$1(props, isWeb), useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children);
};
SelectWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

var Slt = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      children = _ref.children,
      readOnly = _ref.readOnly,
      props = _objectWithoutProperties(_ref, ["elProps", "children", "readOnly"]);
  return React.createElement("select", _extends({}, elProps, props, {
    ref: ref
  }), children);
});
var Select = function Select(props) {
  return React.createElement(SelectWrapper, _extends({}, props, {
    Element: Slt,
    isWeb: true
  }));
};
Select.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  style: PropTypes.object
};

var Element$5 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["elProps", "styles"]);
  return React.createElement(View, {
    style: styles.wrapper
  }, React.createElement(View, {
    style: styles.area
  }), React.createElement(View, {
    style: styles.indicator
  }), React.createElement("input", _extends({}, elProps, props, {
    type: "checkbox",
    ref: ref,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      margin: 0,
      opacity: 0,
      cursor: 'pointer'
    }
  })));
});
var Switch = function Switch(props) {
  return React.createElement(SwitchWrapper, _extends({}, props, {
    Element: Element$5,
    isWeb: true
  }));
};
Switch.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string
};

var IconWrapper = React.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      color = props.color,
      Element = props.Element,
      isWeb = props.isWeb,
      name = props.name,
      size = props.size,
      style = props.style,
      styles = props.styles,
      type = props.type,
      attrs = _objectWithoutProperties(props, ["children", "color", "Element", "isWeb", "name", "size", "style", "styles", "type"]);
  var containerStyle = theme.get('components.icon.container', get(styles, 'container'), styles);
  var iconProps = {
    ref: ref,
    name: name
  };
  iconProps.style = theme.get('components.icon.icon', get(styles, 'icon'), styles);
  iconProps.color = color || get(iconProps.style, 'color', get(theme, 'typography.default.color'));
  iconProps.size = size || get(iconProps.style, 'fontSize', get(theme, 'typography.default.fontSize', 15) * 2);
  var Icon = isValidComponent(Element) ? Element : false;
  return React.createElement(View, {
    style: containerStyle
  }, Icon && React.createElement(Icon, iconProps));
});
IconWrapper.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string
};

var Icon = function Icon(props) {
  return React.createElement(IconWrapper, _extends({}, props, {
    Element: props.Element || FontAwesome,
    isWeb: true
  }));
};
Icon.propTypes = _objectSpread2({}, IconWrapper.propTypes);

var TouchableWithFeedback = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
var withTouch = function withTouch(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$showFeedback = options.showFeedback,
      showFeedback = _options$showFeedback === void 0 ? true : _options$showFeedback;
  var wrapped = React.forwardRef(function (props, ref) {
    var _props$touchThemePath = props.touchThemePath,
        touchThemePath = _props$touchThemePath === void 0 ? '' : _props$touchThemePath,
        _props$touchStyle = props.touchStyle,
        touchStyle = _props$touchStyle === void 0 ? {} : _props$touchStyle,
        onPress = props.onPress,
        otherProps = _objectWithoutProperties(props, ["touchThemePath", "touchStyle", "onPress"]);
    var theme = useTheme();
    var _useThemePath = useThemePath(touchThemePath),
        _useThemePath2 = _slicedToArray(_useThemePath, 1),
        style = _useThemePath2[0];
    var TouchWrapper = showFeedback ? TouchableWithFeedback : TouchableWithoutFeedback;
    return React.createElement(TouchWrapper, {
      style: theme.join(style, touchStyle),
      onPress: onPress
    }, React.createElement(Component, _extends({
      ref: ref
    }, otherProps)));
  });
  wrapped.propTypes = {
    touchThemePath: PropTypes.string,
    touchStyle: PropTypes.object,
    onPress: PropTypes.func
  };
  return wrapped;
};

var TouchableIcon = withTouch(Icon);
TouchableIcon.propTypes = _objectSpread2({}, TouchableIcon.propTypes, {}, Icon.propTypes);

var hasWidth = function hasWidth(style) {
  return useMemo(function () {
    return Object.keys(pickKeys(style, ['width', 'minWidth', 'maxWidth'])).length;
  }, [style]);
};
var Container = function Container(_ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick,
      children = _ref.children,
      flexDir = _ref.flexDir,
      size = _ref.size,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["onPress", "onClick", "children", "flexDir", "size", "style"]);
  var flex = size ? 0 : hasWidth(style) ? 0 : 1;
  return React.createElement(View, _extends({}, props, {
    style: _objectSpread2({
      flex: flex,
      flexDirection: flex && flexDir
    }, style)
  }, getPressHandler(getPlatform(), onClick || onPress)), children);
};
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  flexDir: PropTypes.string,
  onPress: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object
};

var Row = withTheme(function (_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);
  var theme = props.theme || {
    layout: {}
  };
  return React.createElement(Container, _extends({}, props, {
    style: _objectSpread2({}, theme.layout.grid.row, {}, props.style),
    flexDir: "row"
  }), children);
});
Row.propTypes = {
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object
};

var buildCenterStyles = function buildCenterStyles(isCenter) {
  return isCenter === 'x' || isCenter === 'xaxis' || isCenter === 'x-axis' ? {
    justifyContent: 'center'
  } : isCenter === 'y' || isCenter === 'yaxis' || isCenter === 'y-axis' ? {
    alignItems: 'center'
  } : isCenter && {
    alignItems: 'center',
    justifyContent: 'center'
  } || {};
};
var getChildAttrs = function getChildAttrs(children) {
  children = isArr(children) && children || [children];
  return children.reduce(function (attrs, child) {
    if (attrs.isRow && attrs.isCenter) return attrs;
    if (!attrs.isRow && child && child.type === Row) attrs.isRow = true;
    if (!attrs.isCenter && child && child.props && child.props.center) attrs.isCenter = child.props.center.toString().toLowerCase();
    return attrs;
  }, {
    isRow: false,
    isCenter: false
  });
};
var Grid = function Grid(_ref) {
  var children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["children", "style"]);
  var theme = useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React.createElement(Container, _extends({}, props, {
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: theme.join(get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter))
  }), children);
};
Grid.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object
};

var Column = withTheme(function (_ref) {
  var children = _ref.children,
      size = _ref.size,
      center = _ref.center,
      theme = _ref.theme,
      props = _objectWithoutProperties(_ref, ["children", "size", "center", "theme"]);
  var total = get(theme, ['layout', 'columns'], 12);
  size = size > total ? total : size;
  var colWidth = parseFloat(size * (100 / total)).toFixed(4);
  return React.createElement(Container, _extends({}, props, {
    size: size,
    flexDir: "column",
    style: theme.join(get(theme, ['layout', 'grid', 'column']), props.style, {
      minWidth: "".concat(colWidth, "%"),
      maxWidth: "".concat(colWidth, "%")
    })
  }), children);
});
Column.propTypes = {
  size: PropTypes.number,
  center: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object
};

var getSpacer = function getSpacer(isWeb) {
  return isWeb ? ' ' : '\n';
};
var LinkWrapper = function LinkWrapper(props) {
  var theme = useTheme();
  var children = props.children,
      Element = props.Element,
      isWeb = props.isWeb,
      href = props.href,
      onPress = props.onPress,
      onClick = props.onClick,
      space = props.space,
      style = props.style,
      target = props.target,
      type = props.type;
  var linkStyle = theme.get('typography.font.family', 'components.link.default', type && "components.link.".concat(type));
  var _useThemeHover = useThemeHover(theme.join(linkStyle, style), get(theme, "components.link.hover")),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      ref = _useThemeHover2[0],
      themeStyle = _useThemeHover2[1];
  var spacer = space && getSpacer(space);
  return React.createElement(React.Fragment, null, spacer, React.createElement(Element, _extends({
    ref: ref,
    href: href,
    style: themeStyle
  }, getPressHandler(isWeb, onClick, onPress), getTarget(isWeb, target)), children), spacer);
};
LinkWrapper.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  type: PropTypes.string
};

var KegLink = KegText('link');
var Element$6 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["elProps", "children"]);
  return React.createElement(KegLink, _extends({}, elProps, props, {
    ref: ref
  }), children);
});
var Link = function Link(props) {
  return React.createElement(LinkWrapper, _extends({}, props, {
    isWeb: true,
    Element: Element$6
  }));
};
Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  type: PropTypes.string
};

var Section = withTheme(function (props) {
  var theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, ["theme", "children", "style", "type"]);
  return React.createElement(View, _extends({}, args, {
    style: theme.get("keg-section-".concat(type || 'default'), "section.default", type && "section.".concat(type), style)
  }), children);
});
Section.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string
};

var AppHeader = function AppHeader(props) {
  var theme = useTheme();
  var title = props.title,
      styles = props.styles,
      RightComponent = props.RightComponent,
      CenterComponent = props.CenterComponent,
      LeftComponent = props.LeftComponent,
      onLeftClick = props.onLeftClick,
      leftIcon = props.leftIcon,
      onRightClick = props.onRightClick,
      rightIcon = props.rightIcon,
      shadow = props.shadow,
      ellipsis = props.ellipsis,
      themePath = props.themePath,
      children = props.children;
  var _useThemePath = useThemePath(themePath || 'appHeader.default', styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      headerStyles = _useThemePath2[0];
  return React.createElement(View, {
    style: theme.join(get(headerStyles, ['container']), shadow && get(headerStyles, ['container', 'shadow']), styles)
  }, children || React.createElement(React.Fragment, null, React.createElement(Side, {
    defaultStyle: headerStyles,
    iconName: leftIcon,
    action: onLeftClick
  }, LeftComponent), React.createElement(Center, {
    ellipsis: ellipsis,
    theme: theme,
    defaultStyle: headerStyles,
    title: title,
    textStyle: get(headerStyles, ['center', 'content', 'title'])
  }, CenterComponent), React.createElement(Side, {
    right: true,
    defaultStyle: headerStyles,
    iconName: rightIcon,
    action: onRightClick
  }, RightComponent)));
};
AppHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  shadow: PropTypes.bool,
  ellipsis: PropTypes.bool,
  themePath: PropTypes.string
};
var Center = function Center(props) {
  var theme = props.theme,
      defaultStyle = props.defaultStyle,
      title = props.title,
      textStyle = props.textStyle,
      _props$ellipsis = props.ellipsis,
      ellipsis = _props$ellipsis === void 0 ? true : _props$ellipsis,
      children = props.children;
  return React.createElement(View, {
    style: get(defaultStyle, ['center', 'main'])
  }, children && renderFromType(children, {}, null) || React.createElement(H6, {
    ellipsis: ellipsis,
    style: theme.join(get(defaultStyle, ['center', 'content', 'title']), textStyle)
  }, title));
};
var Side = function Side(props) {
  var defaultStyle = props.defaultStyle,
      iconName = props.iconName,
      action = props.action,
      children = props.children,
      right = props.right;
  var position = right ? 'right' : 'left';
  var iconProps = {
    defaultStyle: defaultStyle,
    iconName: iconName,
    position: position
  };
  return React.createElement(View, {
    style: get(defaultStyle, ['side', position, 'main'])
  }, children && renderFromType(children, {}, null) || (action ? React.createElement(Button, {
    styles: {
      main: get(defaultStyle, ['side', position, 'content', 'container'])
    },
    onClick: action
  }, iconName && React.createElement(CustomIcon, iconProps)) : iconName && React.createElement(CustomIcon, _extends({
    styled: true
  }, iconProps))));
};
var CustomIcon = function CustomIcon(props) {
  var styled = props.styled,
      defaultStyle = props.defaultStyle,
      iconName = props.iconName,
      position = props.position;
  return React.createElement(Icon, {
    styles: styled && get(defaultStyle, ['side', position, 'content', 'icon', 'style']),
    name: iconName,
    color: get(defaultStyle, ['side', position, 'content', 'icon', 'color']),
    size: get(defaultStyle, ['side', position, 'content', 'icon', 'size'])
  });
};

var TextBox = function TextBox(_ref) {
  var text = _ref.text,
      _ref$themePath = _ref.themePath,
      themePath = _ref$themePath === void 0 ? 'textBox.outlined.default' : _ref$themePath,
      styles = _ref.styles,
      _ref$useClipboard = _ref.useClipboard,
      useClipboard = _ref$useClipboard === void 0 ? false : _ref$useClipboard,
      _ref$maxLines = _ref.maxLines,
      maxLines = _ref$maxLines === void 0 ? 100 : _ref$maxLines;
  var theme = useTheme();
  var _useThemePath = useThemePath(themePath, styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      style = _useThemePath2[0];
  return React.createElement(View$1, {
    style: theme.join(style.main, styles)
  }, React.createElement(View$1, {
    style: get(style, 'content.wrapper')
  }, React.createElement(Text$2, {
    numberOfLines: maxLines,
    style: get(style, 'content.text')
  }, text || '')), React.createElement(Text$2, null, useClipboard && text && React.createElement(TouchableIcon, {
    name: 'copy',
    size: 15,
    wrapStyle: get(style, 'content.clipboard'),
    onPress: function onPress(_) {
      return text && Clipboard.setString(text);
    }
  })));
};
TextBox.propTypes = {
  text: PropTypes.string,
  themePath: PropTypes.string,
  styles: PropTypes.object
};

var flex = {
  align: function align(dir) {
    return {
      alignItems: dir
    };
  },
  direction: function direction(dir) {
    return {
      flexDirection: dir
    };
  },
  justify: function justify(dir) {
    return {
      justifyContent: dir
    };
  },
  display: {
    display: 'flex'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  center: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  left: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  right: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
};
flex.direction.row = {
  flexDirection: 'row'
};
flex.direction.column = {
  flexDirection: 'column'
};
flex.row = flex.direction.row;
flex.column = flex.direction.column;
flex.justify.start = {
  justifyContent: 'flex-start'
};
flex.justify.end = {
  justifyContent: 'flex-end'
};
flex.justify.center = {
  justifyContent: 'center'
};
flex.justify.between = {
  justifyContent: 'space-between'
};
flex.justify.around = {
  justifyContent: 'space-around'
};
flex.justify.even = {
  justifyContent: 'space-evenly'
};
flex.align.start = {
  alignItems: 'flex-start'
};
flex.align.end = {
  alignItems: 'flex-end'
};
flex.align.center = {
  alignItems: 'center'
};
flex.align.stretch = {
  alignItems: 'stretch'
};
flex.align.base = {
  alignItems: 'baseline'
};

var defaultSectionStyle = {
  height: '100%',
  backgroundColor: 'transparent'
};
var defaultSideSectionStyle = {
  main: _objectSpread2({}, defaultSectionStyle, {
    flexDirection: 'row',
    maxWidth: '20%'
  }),
  content: {
    container: _objectSpread2({}, defaultSectionStyle),
    icon: {
      style: {
        alignSelf: 'center',
        padding: 5
      },
      color: '#111111',
      size: 30
    }
  },
  native: {
    content: {
      container: _objectSpread2({}, flex.center, {
        flex: 0
      })
    }
  }
};
var appHeader = {
  default: {
    container: {
      $native: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 0,
        shadow: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.5,
          shadowRadius: 1
        },
        title: {}
      },
      $web: {
        shadow: {
          boxShadow: '0px 4px 7px 0px #9E9E9E'
        }
      },
      $all: _objectSpread2({
        backgroundColor: get(colors$1, 'surface.primary.colors.dark'),
        height: 70,
        width: '100%'
      }, flex.left, {
        flexDirection: 'row'
      })
    },
    side: {
      left: {
        $all: {
          main: _objectSpread2({}, flex.left, {}, defaultSideSectionStyle.main),
          content: _objectSpread2({}, defaultSideSectionStyle.content)
        },
        $web: {
          content: {
            container: _objectSpread2({}, flex.left)
          }
        },
        $native: _objectSpread2({}, defaultSideSectionStyle.native)
      },
      right: {
        $all: {
          main: _objectSpread2({}, flex.right, {}, defaultSideSectionStyle.main),
          content: _objectSpread2({}, defaultSideSectionStyle.content)
        },
        $web: {
          content: {
            container: _objectSpread2({}, flex.right)
          }
        },
        $native: _objectSpread2({}, defaultSideSectionStyle.native)
      }
    },
    center: {
      $native: {
        main: {},
        content: {
          title: {}
        }
      },
      $web: {
        main: {},
        content: {}
      },
      $all: {
        main: _objectSpread2({}, flex.center, {}, defaultSectionStyle, {
          width: '60%'
        }),
        content: {}
      }
    }
  }
};

var transition = function transition() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
  prop = isArr(prop) && prop.join(', ') || prop;
  amount = isNum(amount) && "".concat(amount, "s") || amount;
  return {
    transitionProperty: trainCase(prop),
    transitionDuration: amount,
    transitionTimingFunction: type
  };
};
transition.move = function () {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
  return {
    transition: "transform ".concat(amount, "s ").concat(type)
  };
};
transition.opacity = function () {
  var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
  return {
    transition: "opacity ".concat(amount, "s ").concat(type)
  };
};
transition.maxHeight = {
  overflow: 'hidden',
  transition: 'max-height 1s ease'
};

var containedStyles = function containedStyles(state, colorType) {
  var opacity = get(defaults, "states.types.".concat(state, ".opacity"));
  var shade = get(defaults, "states.types.".concat(state, ".shade"));
  var activeColor = get(colors$1, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: activeColor,
        padding: 9,
        minHeight: 35,
        outline: 'none',
        textAlign: 'center',
        opacity: opacity
      },
      $web: _objectSpread2({
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
        pointerEvents: state === 'disabled' && 'not-allowed',
        boxShadow: 'none'
      }, transition(['backgroundColor', 'borderColor'], 0.3)),
      $native: {}
    },
    content: {
      color: state === 'disabled' ? get(colors$1, 'opacity._50') : get(colors$1, 'palette.white01'),
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
      textAlign: 'center',
      $web: _objectSpread2({}, transition(['color'], 0.15))
    }
  };
};
var contained = buildTheme(containedStyles);

var textStyle = function textStyle(state, colorType) {
  var shade = get(defaults, "states.types.".concat(state, ".shade"));
  var activeColor = get(colors$1, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        backgroundColor: state === 'hover' ? colors$1.opacity(10, activeColor) : get(colors$1, 'palette.transparent')
      }
    },
    content: {
      $all: {
        color: activeColor
      }
    }
  };
};
var text = buildTheme(textStyle, {
  inheritFrom: [contained]
});

var outlineStyles = function outlineStyles(state, colorType) {
  var stateShade = defaults.states.types[state].shade;
  var activeColor = get(colors$1, "surface.".concat(colorType, ".colors.").concat(stateShade));
  return {
    main: {
      $all: {
        padding: 8,
        outline: 'none',
        borderWidth: 1,
        borderColor: activeColor,
        backgroundColor: state === 'hover' ? colors$1.opacity(10, activeColor) : get(colors$1, 'palette.white01')
      }
    },
    content: {
      $all: {
        color: activeColor
      }
    }
  };
};
var outline = buildTheme(outlineStyles, {
  inheritFrom: [contained]
});

var button = {
  contained: contained,
  text: text,
  outline: outline
};

var spaceHelper = function spaceHelper(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var type = arguments.length > 2 ? arguments[2] : undefined;
  sides = sides.length && sides || defaults.layout.sides;
  if (sides === 'all' || isArr(sides) && sides[0] === 'all') sides = defaults.layout.sides;
  return sides.reduce(function (styles, side) {
    styles["".concat(type).concat(capitalize(side))] = unitsHelper(amount);
    return styles;
  }, {});
};
var unitsHelper = function unitsHelper(value) {
  if (!isStr(value) && !isNum(value)) return value;
  if (isStr(value)) {
    var amount = parseInt(value);
    if ((amount || amount === 0) && amount.toString() === value) value += defaults.font.units;
  } else value += defaults.font.units;
  return value;
};
var align = function align(dir) {
  return isStr(dir) && {
    textAlign: dir
  } || {};
};
var background = function background(color) {
  return {
    backgroundColor: colors$1[color] || color || ''
  };
};
var bold = function bold() {
  return {
    fontWeight: defaults.font.bold
  };
};
var color = function color(_color) {
  return colors$1[_color] ? {
    color: colors$1[_color]
  } : {
    color: _color
  };
};
var size = function size(num) {
  return {
    fontSize: unitsHelper(num)
  };
};
var weight = function weight(num) {
  return {
    fontWeight: num
  };
};
var initial = function initial(prop) {
  return prop && _defineProperty({}, prop, 'initial');
};
var abs = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var helpers = {
  abs: abs,
  align: align,
  background: background,
  bold: bold,
  color: color,
  initial: initial,
  size: size,
  weight: weight
};

var size$1 = defaults.layout.margin;
var margin = function margin(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return spaceHelper(amount, sides, 'margin');
};
margin.size = size$1;
margin.full = {
  margin: size$1
};
margin.all = margin.full;
margin.vert = {
  marginLeft: size$1,
  marginRight: size$1
};
margin.left = {
  marginLeft: size$1
};
margin.right = {
  marginRight: size$1
};
margin.hor = {
  marginTop: size$1,
  marginBottom: size$1
};
margin.top = {
  marginTop: size$1
};
margin.bottom = {
  marginBottom: size$1
};

var card = {
  container: {
    $native: {
      shadowColor: colors$1.opacity._05,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1
    },
    $web: {
      boxShadow: "1px 1px 5px ".concat(colors$1.opacity._05)
    },
    $all: {
      backgroundColor: colors$1.palette.white01,
      borderWidth: 1,
      padding: 15,
      margin: 15,
      marginBottom: 0,
      borderColor: colors$1.palette.gray01,
      borderStyle: 'solid'
    }
  },
  wrapper: {
    backgroundColor: colors$1.palette.transparent
  },
  title: {
    fontSize: 14,
    color: colors$1.palette.black02,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: margin.size
  },
  divider: {
    marginBottom: margin.size,
    hairlineWidth: 1
  },
  image: {
    wrapper: {
      display: 'inline-flex',
      marginBottom: margin.size,
      width: '100%'
    },
    image: {
      width: '100%'
    }
  },
  featured: {
    title: {
      fontSize: 18,
      marginBottom: 8,
      color: colors$1.palette.white01,
      fontWeight: '800'
    },
    subtitle: {
      fontSize: 13,
      marginBottom: 8,
      color: colors$1.palette.white01,
      fontWeight: '400'
    }
  },
  overlay: _objectSpread2({
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors$1.opacity._05,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }, helpers.abs),
  children: {
    marginTop: margin.size
  }
};

var divider = {
  $all: {
    width: "100%",
    backgroundColor: colors$1.opacity._15,
    marginBottom: margin.size,
    marginTop: margin.size / 3,
    height: 1
  },
  $native: {
    hairlineWidth: 1
  }
};

var drawer = {};

var filePicker = {
  default: {
    $all: {
      main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      },
      content: {
        input: {
          opacity: 0,
          position: 'absolute',
          display: 'none'
        },
        view: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        },
        file: {
          marginLeft: 5,
          fontSize: 11
        },
        button: {
          margin: 0
        }
      }
    }
  },
  disabled: {},
  hover: {},
  active: {}
};

var image = {
  default: {
    $web: _objectSpread2({}, transition('opacity', 0.8))
  },
  wrapper: {
    display: 'inline-flex'
  },
  loading: {
    opacity: 0
  },
  loaded: {
    opacity: 1
  }
};

var indicator = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
    width: 230
  },
  image: {
    $all: {
      width: '50%',
      margin: 'auto',
      maxWidth: '300px',
      maxHeight: '300px'
    },
    $web: {
      position: 'relative'
    },
    $native: {
      height: '100%',
      position: 'relative'
    }
  }
};

var link = {
  default: {
    $all: {
      color: colors$1.palette.blue01
    },
    $native: {
      textDecorationLine: 'underline',
      textDecorationColor: colors$1.palette.blue02
    },
    $web: {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  hover: {
    $web: {
      color: colors$1.palette.blue02
    }
  }
};

var loading = {
  default: {},
  wrapper: {},
  progress: {}
};

var size$2 = defaults.layout.padding;
var padding = function padding(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return spaceHelper(amount, sides, 'padding');
};
padding.size = size$2;
padding.full = {
  padding: size$2
};
padding.all = padding.full;
padding.vert = {
  paddingLeft: size$2,
  paddingRight: size$2
};
padding.left = {
  paddingLeft: size$2
};
padding.right = {
  paddingRight: size$2
};
padding.hor = {
  paddingTop: size$2,
  paddingBottom: size$2
};
padding.top = {
  paddingTop: size$2
};
padding.bottom = {
  paddingBottom: size$2
};

var section = {
  default: {
    $native: {
      shadowColor: colors$1.opacity._05,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1
    },
    $web: {
      boxShadow: "1px 1px 5px ".concat(colors$1.opacity._05)
    },
    $all: {
      backgroundColor: colors$1.palette.white01,
      borderColor: colors$1.palette.gray01,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: padding.size,
      margin: margin.size,
      marginBottom: 0,
      minHeight: 200
    }
  }
};

var wrapper = {
	width: 250,
	padding: 5
};

var surface = colors$1.surface,
    palette = colors$1.palette;
var contained$1 = {
  default: {
    $all: {
      main: {
        minHeight: 100,
        width: wrapper.width,
        padding: wrapper.padding,
        backgroundColor: get(surface, 'default.colors.light'),
        display: 'flex',
        flexDirection: 'column'
      },
      content: {
        wrapper: {
          display: 'flex',
          marginRight: wrapper.padding + 5,
          flex: 1,
          flexWrap: 'wrap'
        },
        text: {
          color: get(palette, 'black03'),
          fontWeight: 'bold',
          fontSize: 10
        },
        clipboard: {
          opacity: 0.7,
          right: 0,
          top: 0,
          margin: wrapper.padding - 2,
          position: 'absolute'
        }
      }
    },
    $native: {
      main: {
        flexDirection: 'row',
        flex: 1
      },
      content: {
        clipboard: {}
      }
    }
  },
  disabled: {},
  hover: {},
  active: {}
};

var surface$1 = colors$1.surface;
var outlined = {
  default: {
    $all: {
      main: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: get(surface$1, 'default.colors.main')
      }
    }
  }
};
outlined.default = inheritFrom(contained$1.default, outlined.default);

var textBox = {
  outlined: outlined,
  contained: contained$1
};

var components = {
  appHeader: appHeader,
  button: button,
  card: card,
  divider: divider,
  drawer: drawer,
  filePicker: filePicker,
  image: image,
  indicator: indicator,
  link: link,
  loading: loading,
  section: section,
  textBox: textBox
};

var display = {
  none: {
    display: 'none'
  },
  inline: {
    display: 'inline'
  },
  inlineBlock: {
    display: 'inline-block'
  },
  block: {
    display: 'block'
  },
  flex: {
    display: 'flex'
  },
  float: {
    left: {
      float: 'left'
    },
    right: {
      float: 'right'
    },
    none: {
      float: 'none'
    }
  },
  click: {
    cursor: 'pointer'
  },
  noRadius: {
    borderRadius: 0
  }
};

var form$1 = {
  default: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
};

var space = get(defaults, 'form.checkbox.space', 15);
var height = get(defaults, 'form.switch.height', 20);
var width = get(defaults, 'form.switch.width', 20);
var sharedToggle = {
  container: {
    width: '100%',
    display: 'flex'
  },
  text: {
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: height + space
  },
  leftText: {
    marginRight: margin.size
  },
  rightText: {
    marginLeft: margin.size
  }
};

var space$1 = get(defaults, 'form.checkbox.space', 15);
var height$1 = get(defaults, 'form.checkbox.height', 20);
var width$1 = get(defaults, 'form.checkbox.width', 20);
var checkbox = _objectSpread2({
  container: {
    width: '100%',
    display: 'flex'
  },
  wrapper: {
    $all: {
      marginBottom: margin.size
    },
    $web: {
      outline: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      cursor: 'pointer',
      height: height$1 + space$1,
      width: width$1 + space$1
    }
  },
  area: {},
  indicator: {
    $all: {
      outline: 'none'
    },
    $web: {
      top: 0,
      left: 0,
      height: height$1,
      width: width$1,
      boxShadow: "inset 0px 0px 5px ".concat(get(colors$1, 'opacity._15')),
      backgroundColor: get(colors$1, 'palette.gray02'),
      borderRadius: get(defaults, 'form.border.radius', 5)
    }
  },
  on: {
    $web: {
      backgroundColor: get(colors$1, 'palette.green02')
    }
  },
  disabled: {
    $all: {
      opacity: 0.4
    }
  }
}, sharedToggle);

var fontDefs = get(defaults, 'font', {});
var typography = {
  font: {
    family: {
      $native: {},
      $web: {
        fontFamily: fontDefs.family || "Verdana, Geneva, sans-serif"
      }
    }
  },
  default: {
    color: colors$1.opacity._85,
    fontSize: fontDefs.size || 16,
    letterSpacing: fontDefs.spacing || 0.15,
    margin: 0
  },
  caption: {
    color: colors$1.opacity._60,
    fontSize: 12,
    letterSpacing: 0.4
  },
  h1: {
    fontWeight: '300',
    fontSize: 96,
    letterSpacing: -1.5
  },
  h2: {
    fontWeight: '300',
    fontSize: 60,
    letterSpacing: -0.5
  },
  h3: {
    color: colors$1.opacity._60,
    fontSize: 48
  },
  h4: {
    fontSize: 34,
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 24
  },
  h6: {
    color: colors$1.opacity._60,
    fontSize: 20,
    letterSpacing: 0.15,
    fontWeight: '500'
  },
  label: {
    flexBasis: '100%',
    fontSize: 11,
    letterSpacing: 0.15,
    fontWeight: '700',
    marginBottom: margin.size / 4
  },
  paragraph: {
    fontSize: fontDefs.size || 16,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: fontDefs.spacing || 0.15
  }
};

var input = {
  default: {
    $all: {
      backgroundColor: get(colors$1, 'palette.white01'),
      outline: 'none',
      minWidth: 100,
      borderRadius: 5
    },
    $web: _objectSpread2({
      border: "1px solid ".concat(get(colors$1, 'palette.white03')),
      borderBottom: "1px solid ".concat(get(colors$1, 'palette.gray03')),
      height: get(defaults, 'form.input.height', 35),
      boxSizing: 'border-box',
      padding: padding.size / 2
    }, typography.font.family, {
      fontSize: 14
    }),
    $native: {
      borderBottomColor: get(colors$1, 'palette.gray02'),
      borderStyle: 'solid',
      borderWidth: 2
    }
  }
};

var option = {};

var radio = {};

var select = {
  default: {
    $all: {
      backgroundColor: colors$1.palette.white01,
      outline: 'none',
      minWidth: 100
    },
    $web: _objectSpread2({}, typography.font.family, {
      border: "1px solid ".concat(colors$1.palette.gray01),
      borderBottom: "1px solid ".concat(colors$1.palette.gray03),
      boxSizing: 'border-box',
      height: get(defaults, 'form.input.height', 35),
      fontSize: 14,
      padding: padding.size / 2
    }),
    $native: {
      borderBottomColor: colors$1.palette.gray02,
      borderStyle: 'solid',
      borderWidth: 2
    }
  }
};

var space$2 = get(defaults, 'form.checkbox.space', 15);
var height$2 = get(defaults, 'form.switch.height', 20);
var width$2 = get(defaults, 'form.switch.width', 20);
var switchStyles = _objectSpread2({
  wrapper: {
    $all: {
      marginBottom: margin.size
    },
    $web: {
      outline: 'none',
      height: height$2,
      width: width$2 * 2,
      display: 'flex',
      alignItems: 'stretch',
      position: 'relative',
      marginTop: margin.size / 2,
      marginBottom: margin.size + margin.size / 2
    }
  },
  area: {
    $web: {
      outline: 'none',
      backgroundColor: get(colors$1, 'palette.gray02'),
      boxShadow: "inset 0px 0px 5px ".concat(get(colors$1, 'opacity._15')),
      borderRadius: get(defaults, 'form.border.radius', 5) * 2,
      height: '70%',
      width: '100%',
      position: 'absolute',
      top: 3
    }
  },
  indicator: {
    $web: _objectSpread2({
      outline: 'none',
      backgroundColor: get(colors$1, 'palette.white02'),
      borderRadius: get(defaults, 'form.border.radius', 5) * 2,
      boxShadow: "0px 1px 3px ".concat(get(colors$1, 'opacity._50')),
      marginLeft: 0,
      cursor: 'pointer',
      height: height$2,
      width: width$2,
      position: 'absolute',
      top: 0,
      left: 0
    }, transition('left', 0.2))
  },
  on: {
    $web: {
      left: width$2,
      backgroundColor: get(colors$1, 'surface.primary.dark'),
      boxShadow: "1px 1px 3px ".concat(get(colors$1, 'opacity._50'))
    }
  },
  disabled: {
    $all: {
      opacity: 0.4
    }
  }
}, sharedToggle);

var form$2 = {
  checkbox: checkbox,
  form: form$1,
  input: input,
  option: option,
  radio: radio,
  select: select,
  switch: switchStyles
};

var layout$1 = {
  full: {
    width: {
      width: '100%'
    },
    height: {
      height: '100vh',
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  },
  grid: {
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: '100%'
    },
    row: {
      minWidth: '100%'
    },
    column: {},
    columns: 12
  }
};

var transform = {
  rotate: {
    at: function at(amount) {
      return {
        transform: "rotate(".concat(amount, "deg)")
      };
    },
    45: {
      transform: 'rotate(45deg)'
    },
    90: {
      transform: 'rotate(90deg)'
    },
    180: {
      transform: 'rotate(180deg)'
    },
    270: {
      transform: 'rotate(270deg)'
    }
  }
};

var theme = _objectSpread2({
  colors: colors$1,
  display: display,
  flex: flex,
  form: form$2,
  helpers: helpers,
  layout: layout$1,
  margin: margin,
  padding: padding,
  transform: transform,
  transition: transition,
  typography: typography
}, components);

export { Link as A, AppHeader, Button, Caption, Card, Checkbox, Column, Divider, Drawer, FilePicker, Form, Grid, H1, H2, H3, H4, H5, H6, Icon, Image, Input, Label, Link, Loading, Option, P, Radio, Row, Section, Select, Subtitle, Switch, Text$1 as Text, TextBox, TouchableIcon, View, theme };
