import React, { useRef, useEffect, useMemo, isValidElement, useState, useLayoutEffect, forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { helpers as helpers$1, useTheme, useDimensions, withTheme, useThemeHover, useThemeActive } from '@svkeg/re-theme';
import { isFunc, reduceObj, isArr, isObj, isStr, get as get$1, deepMerge as deepMerge$1, validate, flatMap, mapEntries, isEmptyColl, jsonEqual, checkCall, logData, toBool, pickKeys, trainCase, isNum, capitalize } from '@svkeg/jsutils';
import { View as View$1, Dimensions, Animated, Text as Text$2, Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, Clipboard, ActivityIndicator, Image as Image$1, Switch as Switch$1 } from 'react-native';

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
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
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

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var View = React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);
  return React.createElement(View$1, _extends({}, props, {
    ref: ref
  }), children);
});

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config,
      startCb = _ref.startCb,
      startDelay = _ref.startDelay;
  var aniRef = useRef(ref);
  var animate = function animate() {
    var element = aniRef.current;
    element && isFunc(element.animate) && element.animate(animation, config);
  };
  useEffect(function () {
    var timeout = setTimeout(function () {
      return animate();
    }, startDelay || 0);
    return function () {
      return clearTimeout(timeout);
    };
  }, []);
  return [aniRef];
};

var useChildren = function useChildren(defaults, overrides) {
  return useMemo(function () {
    return reduceObj(defaults, function (key, value, children) {
      children[key] = overrides[key] || value;
    }, {});
  }, [].concat(_toConsumableArray(Object.values(defaults.values)), _toConsumableArray(Object.values(overrides))));
};

var isValidComponent = function isValidComponent(Component) {
  return isValidElement(Component) || isFunc(Component);
};

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent(Element) ? isFunc(Element) ? React.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React.createElement(Wrapper, props, Element) : Element;
};

var getOnLoad = function getOnLoad(isWeb, callback) {
  return _defineProperty({}, isWeb ? 'onLoad' : 'onLoadEnd', callback);
};

var getOnChangeHandler = function getOnChangeHandler(isWeb, onChange, onValueChange) {
  return _defineProperty({}, isWeb ? 'onChange' : 'onValueChange', onChange || onValueChange);
};

var getPressHandler = function getPressHandler(isWeb, onClick, onPress) {
  var action = onClick || onPress;
  return isFunc(action) && _defineProperty({}, isWeb ? 'onClick' : 'onPress', onClick || onPress) || {};
};

var getActiveOpacity = function getActiveOpacity(isWeb, props, style) {
  return !isWeb ? {
    activeOpacity: props.activeOpacity || props.opacity || style && style.opacity || 0.3,
    accessibilityRole: 'button'
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
  return value ? value : children ? isArr(children) ? get$1(children, ['0', 'props', 'children']) : get$1(children, ['props', 'children']) : '';
};

var getReadOnly = function getReadOnly(isWeb, readOnly, disabled) {
  var editable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var key = isWeb ? 'disabled' : 'editable';
  var value = isWeb ? readOnly || disabled || !editable : !(readOnly || disabled || !editable);
  return _defineProperty({}, key, value);
};

var getTarget = function getTarget(isWeb, target) {
  return isWeb && target ? {
    target: target
  } : {};
};

var platform = "native"  ;
var getPlatform = function getPlatform() {
  return platform;
};

var noOp = function noOp() {};

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
	family: "Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\""
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
var modal = {
	width: 600
};
var defaults = {
	states: states,
	colors: colors,
	layout: layout,
	font: font,
	form: form,
	modal: modal
};

var defPalette = get$1(defaults, 'colors.palette', {});
var defTypes = get$1(defaults, 'colors.types', {});
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

var colorSurface = get$1(colors$1, 'surface', {});

var allPlatforms = "$all";
var platform$1 = "$" + getPlatform();
var nonPlatform =  "$web" ;
var platforms = [allPlatforms, platform$1, nonPlatform];
var mergePlatforms = function mergePlatforms(toMerge) {
  var $all = toMerge.$all,
      $web = toMerge.$web,
      $native = toMerge.$native,
      otherKeys = _objectWithoutProperties(toMerge, ["$all", "$web", "$native"]);
  return platforms.reduce(function (merged, plat) {
    var platStyles = plat !== nonPlatform && get$1(toMerge, [plat]);
    return platStyles ? deepMerge$1(merged, platStyles) : merged;
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
  return deepMerge$1.apply(void 0, _toConsumableArray(styles.map(function (style) {
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
  return platformFlatten(deepMerge$1.apply(void 0, _toConsumableArray(inheritFrom).concat([themeWithTypes])));
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
    return deepMerge$1(totalTheme, themeForType(themeFn, state, colorType));
  };
};
var themeForType = function themeForType(themeFn, state, colorType) {
  return _defineProperty({}, colorType, _defineProperty({}, state, themeFn(state, colorType)));
};

var validateFunctions = function validateFunctions(functionObj) {
  return isObj(functionObj) && mapEntries(functionObj, function (name, func) {
    return [name, isFunc(func)];
  }) || {};
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
      var value = get$1(event, 'target.value');
      areValidFuncs.onChange && onChange(event);
      areValidFuncs.onValueChange && onValueChange(value);
      areValidFuncs.onChangeText && onChangeText(value);
    };
    return makeHandlerObject(handleChange, areValidFuncs);
  }, [onChange, onValueChange, onChangeText]);
};

var getMediaType = function getMediaType(mediaTypes, styles) {
  return reduceObj(mediaTypes, function (key, value, mediaData) {
    return !mediaData.type && value ? {
      type: key,
      media: value,
      styles: !isObj(styles) ? styles : styles.media
    } : mediaData;
  }, {});
};
var useMediaProps = function useMediaProps(_ref) {
  var Media = _ref.Media,
      image = _ref.image,
      video = _ref.video,
      styles = _ref.styles;
  return useMemo(function () {
    var _getMediaType = getMediaType({
      Media: Media,
      image: image,
      video: video
    }, styles),
        type = _getMediaType.type,
        media = _getMediaType.media,
        mediaStyles = _getMediaType.styles;
    return !Boolean(media) || isValidComponent(media) ? null :
    isStr(media) ? {
      type: type,
      src: media,
      styles: _objectSpread2({
        loading: styles.loading
      }, mediaStyles)
    } :
    _objectSpread2(_objectSpread2({
      type: type
    }, media), {}, {
      styles: deepMerge$1(
      {
        loading: styles.loading
      },
      mediaStyles,
      get$1(media, 'style', {}))
    });
  }, [Media, image, video, styles]);
};

var makeHandlerObject$1 = function makeHandlerObject(isWeb, handler, _ref) {
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
    return makeHandlerObject$1(isWeb, handler, validFuncsMap);
  }, [onPress, onClick]);
};

var makeHandlerObject$2 = function makeHandlerObject(handler, _ref) {
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
      var value = get$1(event, 'target.value');
      validFuncMap.onChange && onChange(event);
      validFuncMap.onValueChange && onValueChange(value);
    };
    return makeHandlerObject$2(onChangeHandler, validFuncMap);
  }, [onChange, onValueChange]);
};

var defAnimation = [{
  transform: 'rotate(0)'
}, {
  transform: 'rotate(360deg)'
}];
var defConfig = {
  duration: 2000,
  iterations: Infinity
};
var useSpin = function useSpin() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ref = props.ref,
      animation = props.animation,
      config = props.config;
  animation = animation || defAnimation;
  config = config || defConfig;
  return useAnimate({
    animation: animation,
    config: config,
    ref: ref
  });
};

var useStyle = function useStyle() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }
  var theme = useTheme();
  return useMemo(function () {
    return theme.get.apply(theme, styles);
  }, [].concat(styles));
};

var stylesEqual = function stylesEqual(current, updates) {
  return current && !updates || !current && updates ? false : Boolean(!current && !updates || isEmptyColl(current) && isEmptyColl(updates) || jsonEqual(current, updates));
};
var getStylesFromPath = function getStylesFromPath(theme, path) {
  return get$1(theme, path) || checkCall(function () {
    logData("Could not find ".concat(path, " on theme"), theme, "warn");
    var split = path.split('.');
    split[split.length] = 'default';
    return get$1(theme, split, {});
  });
};
var mergeStyles = function mergeStyles(pathStyles, userStyles) {
  if (!userStyles) return pathStyles;
  var pathKeys = Object.keys(pathStyles);
  var userKeys = Object.keys(userStyles);
  return pathKeys.indexOf(userKeys[0]) !== -1 ?
  deepMerge$1(pathStyles, userStyles) :
  reduceObj(pathStyles, function (key, value, updated) {
    updated[key] = deepMerge$1(value, userStyles);
    return updated;
  }, {});
};
var buildTheme$1 = function buildTheme(theme, path, styles) {
  return mergeStyles(getStylesFromPath(theme, path), styles);
};
var useThemePath = function useThemePath(path, styles) {
  var _useState = useState(styles),
      _useState2 = _slicedToArray(_useState, 2),
      userStyles = _useState2[0],
      setUserStyles = _useState2[1];
  var customEqual = stylesEqual(styles, userStyles);
  var theme = useTheme();
  var _useState3 = useState(buildTheme$1(theme, path, styles)),
      _useState4 = _slicedToArray(_useState3, 2),
      themeStyles = _useState4[0],
      setThemeStyles = _useState4[1];
  useLayoutEffect(function () {
    var updatedStyles = buildTheme$1(theme, path, styles);
    if (stylesEqual(themeStyles, updatedStyles)) return;
    !customEqual && setUserStyles(styles);
    setThemeStyles(updatedStyles);
  }, [theme, path, customEqual]);
  return [themeStyles, setThemeStyles];
};

var windowHeight = Dimensions.get('window').height;
var heightStyles = {
  height: windowHeight
};
var buildHeightStyles = function buildHeightStyles(height, key) {
  heightStyles.maxHeight = height;
  return key ? _defineProperty({}, key, heightStyles) : heightStyles;
};
var buildHeightWithTheme = function buildHeightWithTheme(stylesWithHeight, themeStyles) {
  return deepMerge$1(themeStyles, stylesWithHeight);
};
var useThemeWithHeight = function useThemeWithHeight(themePath, styles, key) {
  var _useThemePath = useThemePath(themePath, styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      themeStyles = _useThemePath2[0];
  var _useDimensions = useDimensions(),
      height = _useDimensions.height;
  var _useState = useState(height),
      _useState2 = _slicedToArray(_useState, 2),
      curHeight = _useState2[0],
      setCurHeight = _useState2[1];
  var _useState3 = useState(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles)),
      _useState4 = _slicedToArray(_useState3, 2),
      stylesWithHeight = _useState4[0],
      setStylesWithHeight = _useState4[1];
  useLayoutEffect(function () {
    if (height === curHeight) return;
    setCurHeight(height);
    setStylesWithHeight(buildHeightWithTheme(buildHeightStyles(height, key), themeStyles));
  }, [curHeight, height, key, themeStyles]);
  return [stylesWithHeight, setStylesWithHeight];
};

var useFromToAnimation = function useFromToAnimation(params, dependencies) {
  var _ref = params || {},
      from = _ref.from,
      to = _ref.to,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? noOp : _ref$onFinish;
  var animDependencies = isArr(dependencies) ? dependencies : [from, to];
  var fromVal = useMemo(function () {
    return new Animated.Value(from);
  }, animDependencies);
  useEffect(function () {
    Animated.timing(fromVal, {
      toValue: to,
      duration: duration
    }).start(onFinish);
  }, animDependencies);
  return [fromVal];
};

var ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1
};
var KegText = function KegText(element) {
  return withTheme(function (props) {
    var children = props.children,
        style = props.style,
        theme = props.theme,
        ellipsis = props.ellipsis,
        attrs = _objectWithoutProperties(props, ["children", "style", "theme", "ellipsis"]);
    var textStyles = theme.get('typography.font.family', 'typography.default', element && "typography.".concat(element));
    return React.createElement(Text$2, _extends({}, attrs, ellipsis && ellipsisProps, {
      style: theme.join(textStyles, style)
    }), children);
  });
};

var Text = KegText('text');

var getChildren = function getChildren(Children) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return renderFromType(Children, {
    style: styles.content
  }, Text);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _objectSpread2(_objectSpread2({}, mainStyles), get$1(btnStyles, 'disabled.main')) : mainStyles;
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
  var _useThemeHover = useThemeHover(get$1(btnStyles, 'default', {}), get$1(btnStyles, 'hover'), {
    ref: ref,
    noMerge: true
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      hoverRef = _useThemeHover2[0],
      hoverStyles = _useThemeHover2[1];
  var _useThemeActive = useThemeActive(hoverStyles, get$1(btnStyles, 'active'), {
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
  }, getPressHandler(false, onClick, onPress), getActiveOpacity(false, props, btnStyles)));
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

var isWeb = getPlatform() === 'web';
var Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
var Element = React.forwardRef(function (props, ref) {
  return React.createElement(Touchable, _extends({}, props, {
    ref: ref
  }));
});
var Button = function Button(props) {
  return React.createElement(ButtonWrapper, _extends({}, props, {
    Element: Element,
    isWeb: isWeb
  }));
};
Button.propTypes = _objectSpread2(_objectSpread2({}, Touchable.propTypes), ButtonWrapper.propTypes);

var IconWrapper = React.forwardRef(function (props, ref) {
  var theme = useTheme();
  var color = props.color,
      Element = props.Element,
      name = props.name,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type;
  if (!isValidComponent(Element)) return console.error("Invalid Element passed to Icon component!", Element) || null;
  var _useThemePath = useThemePath(themePath || "icon.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      builtStyles = _useThemePath2[0];
  var iconProps = {
    ref: ref,
    name: name,
    style: builtStyles.icon,
    color: color || builtStyles.color || get$1(builtStyles, 'icon.color') || get$1(theme, 'typography.default.color'),
    size: parseInt(size || get$1(builtStyles, 'icon.fontSize') || get$1(theme, 'typography.default.fontSize', 15) * 2, 10)
  };
  return React.createElement(View, {
    style: builtStyles.container
  }, React.createElement(Element, iconProps));
});
IconWrapper.propTypes = {
  Element: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.elementType]),
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string
};

var isWeb$1 = getPlatform() === 'web';
var Icon = function Icon(props) {
  return React.createElement(IconWrapper, _extends({}, props, {
    Element: props.Element,
    isWeb: isWeb$1
  }));
};
Icon.propTypes = _objectSpread2({}, IconWrapper.propTypes);

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

var AppHeader = function AppHeader(props) {
  var theme = useTheme();
  var title = props.title,
      styles = props.styles,
      RightComponent = props.RightComponent,
      CenterComponent = props.CenterComponent,
      LeftComponent = props.LeftComponent,
      onLeftClick = props.onLeftClick,
      leftIcon = props.leftIcon,
      LeftIconComponent = props.LeftIconComponent,
      rightIcon = props.rightIcon,
      RightIconComponent = props.RightIconComponent,
      IconComponent = props.IconComponent,
      onRightClick = props.onRightClick,
      shadow = props.shadow,
      ellipsis = props.ellipsis,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      children = props.children,
      elprops = _objectWithoutProperties(props, ["title", "styles", "RightComponent", "CenterComponent", "LeftComponent", "onLeftClick", "leftIcon", "LeftIconComponent", "rightIcon", "RightIconComponent", "IconComponent", "onRightClick", "shadow", "ellipsis", "themePath", "type", "children"]);
  var _useThemePath = useThemePath(themePath || "appHeader.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      headerStyles = _useThemePath2[0];
  return React.createElement(View, _extends({
    dataSet: AppHeader.dataSet.main
  }, elprops, {
    style: theme.join(headerStyles.main, shadow && get$1(headerStyles, ['shadow']))
  }), children || React.createElement(React.Fragment, null, React.createElement(Side, {
    styles: headerStyles.content,
    iconName: leftIcon,
    IconElement: LeftIconComponent || IconComponent,
    action: onLeftClick
  }, LeftComponent), React.createElement(Center, {
    ellipsis: ellipsis,
    theme: theme,
    styles: headerStyles.content.center,
    title: title
  }, CenterComponent), React.createElement(Side, {
    right: true,
    styles: headerStyles.content,
    iconName: rightIcon,
    IconElement: RightIconComponent || IconComponent,
    action: onRightClick
  }, RightComponent)));
};
AppHeader.dataSet = {
  main: {
    class: 'app-header-main'
  },
  left: {
    class: 'app-header-content-left'
  },
  right: {
    class: 'app-header-content-right'
  },
  center: {
    class: 'app-header-content-center'
  }
};
AppHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  LeftIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.elementType]),
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  RightIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.elementType]),
  IconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.elementType]),
  shadow: PropTypes.bool,
  ellipsis: PropTypes.bool,
  themePath: PropTypes.string
};
var Center = function Center(props) {
  var styles = props.styles,
      title = props.title,
      _props$ellipsis = props.ellipsis,
      ellipsis = _props$ellipsis === void 0 ? true : _props$ellipsis,
      children = props.children;
  return React.createElement(View, {
    dataSet: AppHeader.dataSet.center,
    style: styles.main
  }, children && renderFromType(children, {}, null) || React.createElement(H6, {
    ellipsis: ellipsis,
    style: styles.content.title
  }, title));
};
var Side = function Side(props) {
  var styles = props.styles,
      iconName = props.iconName,
      IconElement = props.IconElement,
      action = props.action,
      children = props.children,
      right = props.right;
  var position = right ? 'right' : 'left';
  var contentStyles = get$1(styles, [position, 'content']);
  var iconProps = {
    styles: styles,
    IconElement: IconElement,
    iconName: iconName,
    position: position
  };
  var showIcon = iconName && IconElement;
  return React.createElement(View, {
    dataSet: AppHeader.dataSet[position],
    style: get$1(styles, [position, 'main'])
  }, children && renderFromType(children, {}, null) || (action ? React.createElement(Button, {
    styles: contentStyles.button,
    onClick: action
  }, showIcon && React.createElement(CustomIcon, iconProps)) : showIcon && React.createElement(View, {
    style: contentStyles.main
  }, React.createElement(CustomIcon, iconProps))));
};
var CustomIcon = function CustomIcon(props) {
  var styles = props.styles,
      iconName = props.iconName,
      IconElement = props.IconElement,
      position = props.position;
  return React.createElement(Icon, {
    name: iconName,
    Element: IconElement,
    styles: get$1(styles, [position, 'content', 'icon'])
  });
};

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
TouchableIcon.propTypes = _objectSpread2(_objectSpread2({}, TouchableIcon.propTypes), Icon.propTypes);

var TextBox = function TextBox(props) {
  var text = props.text,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? 'textBox.outlined.default' : _props$themePath,
      styles = props.styles,
      _props$useClipboard = props.useClipboard,
      useClipboard = _props$useClipboard === void 0 ? false : _props$useClipboard,
      _props$maxLines = props.maxLines,
      maxLines = _props$maxLines === void 0 ? 100 : _props$maxLines;
  var theme = useTheme();
  var _useThemePath = useThemePath(themePath, styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      style = _useThemePath2[0];
  return React.createElement(View$1, {
    style: theme.join(style.main, styles)
  }, React.createElement(View$1, {
    style: get$1(style, 'content.wrapper')
  }, React.createElement(Text$2, {
    numberOfLines: maxLines,
    style: get$1(style, 'content.text')
  }, text || '')), React.createElement(Text$2, null, useClipboard && text && React.createElement(TouchableIcon, {
    name: 'copy',
    size: 15,
    wrapStyle: get$1(style, 'content.clipboard'),
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

var CardBody = function CardBody(_ref) {
  var style = _ref.style,
      children = _ref.children;
  return React.createElement(View, {
    style: style
  }, children);
};
CardBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  style: PropTypes.object
};

var CardContainer = function CardContainer(_ref) {
  var _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? {} : _ref$styles;
  return React.createElement(View, _extends({}, attributes, {
    style: styles.main
  }), React.createElement(View, {
    style: styles.container
  }, children));
};
CardContainer.propTypes = {
  attributes: PropTypes.object,
  styles: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func])
};

var Divider = function Divider(_ref) {
  var style = _ref.style,
      props = _objectWithoutProperties(_ref, ["style"]);
  var theme = useTheme();
  return React.createElement(View, _extends({}, props, {
    style: theme.join(get$1(theme, ['divider']), style)
  }));
};
Divider.propTypes = {
  style: PropTypes.object
};

var FooterWrap = function FooterWrap(_ref) {
  var numberOfLines = _ref.numberOfLines,
      styles = _ref.styles,
      children = _ref.children;
  var textProps = {
    style: get(styles, 'footer.text')
  };
  numberOfLines && (textProps.numberOfLines = numberOfLines);
  return React.createElement(View, {
    style: get(styles, 'footer.container')
  }, React.createElement(Text, textProps, children), React.createElement(Divider, {
    style: deepMerge(styles.divider, get(styles, 'footer.divider'))
  }));
};
var CardFooter = function CardFooter(_ref2) {
  var Footer = _ref2.Footer,
      props = _objectWithoutProperties(_ref2, ["Footer"]);
  return Footer ? renderFromType(Footer, props, FooterWrap) : null;
};
CardFooter.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object
};

var HeaderWrap = function HeaderWrap(_ref) {
  var numberOfLines = _ref.numberOfLines,
      styles = _ref.styles,
      children = _ref.children;
  var textProps = {
    style: get$1(styles, 'header.text')
  };
  numberOfLines && (textProps.numberOfLines = numberOfLines);
  return React.createElement(View, {
    style: get$1(styles, 'header.container')
  }, React.createElement(Text, textProps, children), React.createElement(Divider, {
    style: deepMerge$1(styles.divider, get$1(styles, 'header.divider'))
  }));
};
var CardHeader = function CardHeader(_ref2) {
  var Header = _ref2.Header,
      props = _objectWithoutProperties(_ref2, ["Header"]);
  return Header ? renderFromType(Header, props, HeaderWrap) : null;
};
CardHeader.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object
};

var IndicatorWrapper = function IndicatorWrapper(props) {
  var alt = props.alt,
      Element = props.Element,
      isWeb = props.isWeb,
      resizeMode = props.resizeMode,
      size = props.size,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _objectWithoutProperties(props, ["alt", "Element", "isWeb", "resizeMode", "size", "styles", "type", "themePath"]);
  var _useThemePath = useThemePath(themePath || "indicator.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      builtStyles = _useThemePath2[0];
  return React.createElement(View, {
    style: builtStyles.container
  }, React.createElement(Element, _extends({}, elProps, {
    alt: alt || 'Loading',
    style: builtStyles.icon,
    size: size,
    resizeMode: resizeMode || 'contain'
  })));
};

var isWeb$2 = getPlatform() === 'web';
var Element$1 = function Element(_ref) {
  var _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color,
      attrs = _objectWithoutProperties(_ref, ["style", "size", "color"]);
  return React.createElement(View, null, React.createElement(ActivityIndicator, {
    size: size,
    color: style.color || color
  }));
};
var Indicator = function Indicator(_ref2) {
  var alt = _ref2.alt,
      size = _ref2.size,
      color = _ref2.color,
      styles = _ref2.styles,
      props = _objectWithoutProperties(_ref2, ["alt", "size", "color", "styles"]);
  return React.createElement(IndicatorWrapper, _extends({}, props, {
    alt: alt || 'Loading',
    size: ['large', 'small'].includes(size) ? size : 'large',
    color: color,
    Element: Element$1,
    styles: styles,
    isWeb: isWeb$2
  }));
};

var Progress = function Progress(props) {
  var styles = props.styles,
      text = props.text,
      loadIndicator = props.loadIndicator,
      type = props.type,
      size = props.size;
  var LoadingIndicator = loadIndicator || Indicator;
  return React.createElement(View, {
    style: styles.progress
  }, isValidComponent(LoadingIndicator) ? React.createElement(LoadingIndicator, {
    size: size,
    styles: styles.indicator,
    type: type
  }) : text && React.createElement(Text, {
    style: styles.text
  }, text));
};
var Loading = function Loading(props) {
  var children = props.children,
      _props$text = props.text,
      text = _props$text === void 0 ? 'Loading' : _props$text,
      indicator = props.indicator,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type;
  var _useThemePath = useThemePath(themePath || "loading.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      builtStyles = _useThemePath2[0];
  return React.createElement(View, {
    style: builtStyles.container
  }, children || React.createElement(Progress, {
    styles: builtStyles,
    text: text,
    loadIndicator: indicator,
    type: type,
    size: size
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
var ImageWrapper = forwardRef(function (props, ref) {
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
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? {} : _props$styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      _props$useLoading = props.useLoading,
      useLoading = _props$useLoading === void 0 ? true : _props$useLoading,
      attrs = _objectWithoutProperties(props, ["alt", "children", "Element", "isWeb", "onClick", "onPress", "src", "source", "styles", "type", "themePath", "useLoading"]);
  var _useThemePath = useThemePath(themePath || "image.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      builtStyles = _useThemePath2[0];
  var loadingStyles = useStyle(builtStyles.loading, builtStyles.image);
  var loadedStyles = useStyle(loadingStyles, builtStyles.loaded);
  var _useThemeHover = useThemeHover(loadedStyles, builtStyles.hover, {
    ref: ref
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 3),
      elementStyle = _useThemeHover2[1],
      setStyle = _useThemeHover2[2];
  return React.createElement(View, {
    style: builtStyles.container
  }, loading && useLoading && React.createElement(Loading, {
    styles: builtStyles.loadingComp
  }), React.createElement(Element, _extends({
    ref: ref,
    attrs: attrs,
    alt: alt,
    style: loading ? loadingStyles : builtStyles.image
  }, getPressHandler(isWeb, onClick, onPress), getImgSrc(false, src, source), getOnLoad(isWeb, onLoadEvent(setLoading, props, setStyle, elementStyle)))));
});
ImageWrapper.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

var isWeb$3 = getPlatform() === 'web';
var Element$2 = forwardRef(function (_ref, ref) {
  var attrs = _ref.attrs,
      src = _ref.src,
      props = _objectWithoutProperties(_ref, ["attrs", "src"]);
  return React.createElement(Image$1, _extends({
    ref: ref
  }, attrs, props));
});
var Image = forwardRef(function (props, ref) {
  return React.createElement(ImageWrapper, _extends({}, props, {
    ref: ref,
    Element: Element$2,
    isWeb: isWeb$3
  }));
});
Image.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object
};

var CardMediaTitle = function CardMediaTitle(_ref) {
  var subtitle = _ref.subtitle,
      title = _ref.title,
      styles = _ref.styles;
  var theme = useTheme();
  return React.createElement(View, {
    style: theme.join(get$1(theme, ['components', 'card', 'overlay']), styles.overlay)
  }, title && React.createElement(Text, {
    style: theme.join(get$1(theme, ['components', 'card', 'featured', 'title']), styles.title)
  }, title), subtitle && React.createElement(Text, {
    style: theme.join(get$1(theme, ['components', 'card', 'featured', 'subtitle']), styles.subtitle)
  }, subtitle));
};

var MediaFromType = function MediaFromType(_ref) {
  var mediaProps = _ref.mediaProps,
      styles = _ref.styles;
  var type = mediaProps.type,
      props = _objectWithoutProperties(mediaProps, ["type"]);
  var _props$styles = props.styles,
      image = _props$styles.image,
      video = _props$styles.video,
      container = _props$styles.container,
      loading = _props$styles.loading,
      loadingComp = _props$styles.loadingComp;
  var mediaStyles = useStyle(type === 'image' && image && {
    image: image
  }, type === 'video' && video && {
    video: video
  }, container && {
    container: container
  }, loading && {
    loading: loading
  }, loadingComp && {
    loadingComp: loadingComp
  });
  switch (type) {
    case 'image':
      {
        return React.createElement(Image, _extends({}, props, {
          styles: mediaStyles
        }));
      }
    default:
      {
        return null;
      }
  }
};
var CardMedia = function CardMedia(_ref2) {
  var mediaProps = _ref2.mediaProps,
      Media = _ref2.Media,
      subtitle = _ref2.subtitle,
      styles = _ref2.styles,
      title = _ref2.title;
  return Media || !mediaProps ? Media || null : React.createElement(View, {
    style: get$1(styles, 'media.container')
  }, React.createElement(MediaFromType, {
    mediaProps: mediaProps,
    styles: styles
  }), (title || subtitle) && React.createElement(CardMediaTitle, {
    subtitle: subtitle,
    title: title,
    styles: styles
  }));
};
CardMedia.propTypes = {
  image: PropTypes.object,
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

var Card = function Card(_ref) {
  var styles = _ref.styles,
      props = _objectWithoutProperties(_ref, ["styles"]);
  styles = styles || {};
  var children = props.children,
      Footer = props.Footer,
      footerLines = props.footerLines,
      Header = props.Header,
      headerLines = props.headerLines,
      image = props.image,
      Media = props.Media,
      subtitle = props.subtitle,
      themePath = props.themePath,
      title = props.title,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      video = props.video,
      attributes = _objectWithoutProperties(props, ["children", "Footer", "footerLines", "Header", "headerLines", "image", "Media", "subtitle", "themePath", "title", "type", "video"]);
  var _useThemePath = useThemePath(themePath || "card.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      cardStyles = _useThemePath2[0];
  var mediaProps = useMediaProps({
    Media: Media,
    image: image,
    video: video,
    styles: cardStyles
  });
  return React.createElement(CardContainer, {
    attributes: attributes,
    styles: cardStyles
  }, Header && React.createElement(CardHeader, {
    Header: Header,
    numberOfLines: headerLines,
    styles: cardStyles
  }), (Media || mediaProps) && React.createElement(CardMedia, {
    title: title,
    subtitle: subtitle,
    mediaProps: mediaProps,
    styles: cardStyles
  }), children && React.createElement(CardBody, {
    style: cardStyles.body,
    children: children
  }), Footer && React.createElement(CardFooter, {
    footer: Footer,
    numberOfLines: footerLines,
    styles: cardStyles
  }));
};
Card.Body = CardBody;
Card.Container = CardContainer;
Card.Header = CardHeader;
Card.Footer = CardFooter;
Card.Media = CardMedia;
Card.propTypes = {
  footerLines: PropTypes.number,
  header: PropTypes.string,
  headerLines: PropTypes.number,
  Media: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string
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
    var curHeight = get$1(slideRef, 'current.offsetHeight');
    if (curHeight === 0) return;
    height !== curHeight && setHeight(curHeight);
  }, [height]);
  var sliderStyle = theme.join({
    overflow: 'hidden',
    transition: 'max-height 1s ease'
  }, get$1(theme, 'components.drawer'), style, {
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
    style: theme.join(get$1(componentTheme, 'main'), style)
  }, React.createElement(Button, {
    content: title,
    onClick: clickInput,
    style: get$1(componentTheme, 'content.button'),
    themePath: buttonThemePath
  }, children),
  showFile && React.createElement(P, {
    style: get$1(componentTheme, 'content.file')
  }, file.name), React.createElement("input", _extends({}, args, {
    ref: function ref(input) {
      _ref && (_ref.current = input);
      refToInput.current = input;
    },
    onChange: handleInputChange,
    style: get$1(componentTheme, 'content.input'),
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

var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.join(themeStyles, {
      content: {
        area: _objectSpread2(_objectSpread2({}, get$1(themeStyles, 'content.area.off')), isChecked && get$1(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get$1(themeStyles, 'content.indicator.off')), isChecked && get$1(themeStyles, 'content.indicator.on'))
      }
    });
  }, [isChecked]);
};
var setCheckedValue = function setCheckedValue(isChecked, setChecked, onChange) {
  return function (event) {
    setChecked(!isChecked);
    checkCall(onChange, event, !isChecked);
  };
};
var SideComponent = function SideComponent(_ref) {
  var Component = _ref.Component,
      style = _ref.style;
  return isStr(Component) ? React.createElement(Text, {
    style: style
  }, Component) : renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent = function ChildrenComponent(_ref2) {
  var children = _ref2.children;
  return React.createElement(React.Fragment, null, renderFromType(children, {}, null));
};
var CheckboxWrapper = function CheckboxWrapper(props) {
  var checked = props.checked,
      children = props.children,
      elType = props.elType,
      Element = props.Element,
      disabled = props.disabled,
      isWeb = props.isWeb,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      ref = props.ref,
      RightComponent = props.RightComponent,
      styles = props.styles,
      CheckboxComponent = props.CheckboxComponent,
      type = props.type,
      themePath = props.themePath,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["checked", "children", "elType", "Element", "disabled", "isWeb", "LeftComponent", "close", "onChange", "onValueChange", "ref", "RightComponent", "styles", "CheckboxComponent", "type", "themePath", "value"]);
  var _useState = useState(toBool(checked || value)),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  var elThemePath = themePath || "form.".concat(elType, ".").concat(close && 'close' || 'default');
  var _useThemePath = useThemePath(elThemePath, styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      themeStyles = _useThemePath2[0];
  var activeStyles = useCheckedState(isChecked, themeStyles);
  return children && React.createElement(View, {
    style: activeStyles.main
  }, React.createElement(ChildrenComponent, {
    children: children
  })) || React.createElement(View, {
    style: activeStyles.main
  }, LeftComponent && React.createElement(SideComponent, {
    Component: LeftComponent,
    style: activeStyles.content.left
  }), CheckboxComponent ? renderFromType(CheckboxComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React.createElement(Element, _extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getChecked(isWeb, isChecked), getOnChangeHandler(isWeb, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React.createElement(SideComponent, {
    Component: RightComponent,
    style: activeStyles.content.right
  }));
};
CheckboxWrapper.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  Element: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  LeftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  RightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  CheckboxComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool
};

var Element$3 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      styles = _ref.styles,
      icon = _ref.icon,
      checked = _ref.checked,
      props = _objectWithoutProperties(_ref, ["elProps", "styles", "icon", "checked"]);
  return React.createElement(View, {
    style: styles.main
  }, React.createElement(View, {
    style: styles.area
  }), checked && React.createElement(Icon, {
    styles: styles.indicator,
    name: icon || 'check'
  }), React.createElement("input", _extends({}, elProps, props, {
    checked: checked,
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
  return React.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element$3,
    isWeb: true
  }));
};
Checkbox.propTypes = _objectSpread2({}, CheckboxWrapper.propTypes);

var buildStyles = function buildStyles(theme, type, elType) {
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
  var builtStyles = buildStyles(theme, type);
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
      isWeb = props.isWeb,
      elProps = _objectWithoutProperties(props, ["children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value", "isWeb"]);
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
  isWeb: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onChangeText: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

var Element$5 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      args = _objectWithoutProperties(_ref, ["elProps"]);
  return React.createElement("input", _extends({}, args, elProps, {
    ref: ref
  }));
});
var Input = function Input(props) {
  return React.createElement(InputWrapper, _extends({
    Element: Element$5,
    isWeb: true
  }, props));
};
Input.propTypes = _objectSpread2(_objectSpread2({}, InputWrapper.propTypes), {}, {
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

var Element$6 = React.forwardRef(function (_ref, ref) {
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
    Element: Element$6,
    isWeb: true
  }));
};
Select.propTypes = _objectSpread2({}, SelectWrapper.propTypes);

var useCheckedState$1 = function useCheckedState(isChecked, themeStyles) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.join(themeStyles, {
      content: {
        area: _objectSpread2(_objectSpread2({}, get$1(themeStyles, 'content.area.off')), isChecked && get$1(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get$1(themeStyles, 'content.indicator.off')), isChecked && get$1(themeStyles, 'content.indicator.on'))
      }
    });
  }, [isChecked]);
};
var setCheckedValue$1 = function setCheckedValue(isChecked, setChecked, onChange) {
  return function (event) {
    setChecked(!isChecked);
    checkCall(onChange, event, !isChecked);
  };
};
var SideComponent$1 = function SideComponent(_ref) {
  var Component = _ref.Component,
      style = _ref.style;
  return isStr(Component) ? React.createElement(Text, {
    style: style
  }, Component) : renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent$1 = function ChildrenComponent(_ref2) {
  var children = _ref2.children;
  return React.createElement(React.Fragment, null, renderFromType(children, {}, null));
};
var SwitchWrapper = function SwitchWrapper(props) {
  var checked = props.checked,
      children = props.children,
      elType = props.elType,
      Element = props.Element,
      disabled = props.disabled,
      isWeb = props.isWeb,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      ref = props.ref,
      RightComponent = props.RightComponent,
      styles = props.styles,
      SwitchComponent = props.SwitchComponent,
      type = props.type,
      themePath = props.themePath,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["checked", "children", "elType", "Element", "disabled", "isWeb", "LeftComponent", "close", "onChange", "onValueChange", "ref", "RightComponent", "styles", "SwitchComponent", "type", "themePath", "value"]);
  var _useState = useState(toBool(checked || value)),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  var elThemePath = themePath || "form.".concat(elType, ".").concat(close && 'close' || 'default');
  var _useThemePath = useThemePath(elThemePath, styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      themeStyles = _useThemePath2[0];
  var activeStyles = useCheckedState$1(isChecked, themeStyles);
  return children && React.createElement(View, {
    style: activeStyles.main
  }, React.createElement(ChildrenComponent$1, {
    children: children
  })) || React.createElement(View, {
    style: activeStyles.main
  }, LeftComponent && React.createElement(SideComponent$1, {
    Component: LeftComponent,
    style: activeStyles.content.left
  }), SwitchComponent ? renderFromType(SwitchComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React.createElement(Element, _extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getChecked(false, isChecked), getOnChangeHandler(false, setCheckedValue$1(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React.createElement(SideComponent$1, {
    Component: RightComponent,
    style: activeStyles.content.right
  }));
};
SwitchWrapper.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  Element: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  LeftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  RightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  SwitchComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool
};

var isWeb$4 = getPlatform() === 'web';
var getSwitchColors = function getSwitchColors(thumbColor, trackColor, _ref) {
  var _ref$indicator = _ref.indicator,
      indicator = _ref$indicator === void 0 ? {} : _ref$indicator,
      _ref$area = _ref.area,
      area = _ref$area === void 0 ? {} : _ref$area;
  var indicatorColor = thumbColor || indicator.color;
  var areaColor = trackColor || area.backgroundColor;
  var colors = _objectSpread2(_objectSpread2({}, indicatorColor && {
    thumbColor: thumbColor || color
  }), areaColor && {
    trackColor: areaColor,
    onTintColor: areaColor
  });
  return colors;
};
var Element$7 = React.forwardRef(function (props, ref) {
  var elProps = props.elProps,
      style = props.style,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? {} : _props$styles,
      thumbColor = props.thumbColor,
      trackColor = props.trackColor,
      attrs = _objectWithoutProperties(props, ["elProps", "style", "styles", "thumbColor", "trackColor"]);
  return React.createElement(View, {
    style: styles.main
  }, React.createElement(Switch$1, _extends({
    style: styles.switch
  }, getSwitchColors(thumbColor, trackColor, styles), elProps, attrs, {
    ref: ref
  })));
});
var Switch = function Switch(props) {
  return React.createElement(SwitchWrapper, _extends({}, props, {
    elType: 'switch',
    Element: Element$7,
    isWeb: isWeb$4
  }));
};
Switch.propTypes = _objectSpread2(_objectSpread2({}, TouchableOpacity.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string
});

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
  var flexStyle = flexDir === 'row' ? {
    flexDirection: flexDir,
    flex: size ? size : hasWidth(style) ? 0 : 1
  } : {};
  return React.createElement(View, _extends({}, props, {
    style: _objectSpread2(_objectSpread2({}, flexStyle), style)
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

var Row = function Row(_ref) {
  var children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["children", "style"]);
  var theme = useTheme();
  return React.createElement(Container, _extends({}, props, {
    style: _objectSpread2(_objectSpread2({}, get$1(theme, 'layout.grid.row')), style),
    flexDir: "row"
  }), children);
};
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
    style: theme.join(get$1(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter))
  }), children);
};
Grid.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object
};

var widthFromSize = function widthFromSize(size, theme) {
  var total = get$1(theme, ['layout', 'columns'], 12);
  size = size > total ? total : size;
  var colWidth = parseFloat(size * (100 / total)).toFixed(4);
  return {
    minWidth: "".concat(colWidth, "%"),
    maxWidth: "".concat(colWidth, "%")
  };
};
var getColumnWidth = function getColumnWidth(size, theme) {
  return size ? widthFromSize(size, theme) : {
    flexGrow: 1
  };
};
var Column = function Column(_ref) {
  var children = _ref.children,
      size = _ref.size,
      center = _ref.center,
      props = _objectWithoutProperties(_ref, ["children", "size", "center"]);
  var theme = useTheme();
  return React.createElement(Container, _extends({}, props, {
    size: size,
    flexDir: "column",
    style: theme.join(get$1(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme))
  }), children);
};
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
  var linkStyle = theme.get('typography.font.family', 'link.default', type && "link.".concat(type));
  var _useThemeHover = useThemeHover(theme.join(linkStyle, style), get$1(theme, "link.hover")),
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

var isWeb$5 = getPlatform() === 'web';
var Text$1 = KegText('link');
var Element$8 = React.forwardRef(function (_ref, ref) {
  var elProps = _ref.elProps,
      children = _ref.children,
      href = _ref.href,
      onPress = _ref.onPress,
      target = _ref.target,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["elProps", "children", "href", "onPress", "target", "style"]);
  return React.createElement(TouchableOpacity, _extends({}, elProps, props, {
    ref: ref
  }), React.createElement(Text$1, {
    style: style,
    href: href,
    accessibilityRole: "link",
    target: target
  }, children));
});
var Link = function Link(props) {
  return React.createElement(LinkWrapper, _extends({}, props, {
    Element: Element$8,
    isWeb: isWeb$5
  }));
};
Link.propTypes = {
  href: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
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

var SlideAnimatedView = function SlideAnimatedView(_ref) {
  var defaultStyle = _ref.defaultStyle,
      visible = _ref.visible,
      children = _ref.children,
      onAnimationFinish = _ref.onAnimationFinish;
  var windowHeight = Dimensions.get('window').height;
  var bottomOfScreen = windowHeight;
  var origin = 0;
  var _useFromToAnimation = useFromToAnimation({
    from: visible ? bottomOfScreen : origin,
    to: visible ? origin : bottomOfScreen,
    onFinish: onAnimationFinish
  }, [visible]),
      _useFromToAnimation2 = _slicedToArray(_useFromToAnimation, 1),
      slide = _useFromToAnimation2[0];
  return React.createElement(Animated.View, {
    dataSet: Modal.dataSet.content,
    style: _objectSpread2(_objectSpread2({}, defaultStyle), {}, {
      transform: [{
        translateY: slide
      }]
    })
  }, children);
};
var hideModalStyle = {
  height: 0,
  width: 0,
  overflow: 'hidden'
};
var Modal = function Modal(props) {
  var styles = props.styles,
      _props$onBackdropTouc = props.onBackdropTouch,
      onBackdropTouch = _props$onBackdropTouc === void 0 ? noOp : _props$onBackdropTouc,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$activeOpacity = props.activeOpacity,
      activeOpacity = _props$activeOpacity === void 0 ? 1 : _props$activeOpacity,
      visible = props.visible,
      _props$AnimatedCompon = props.AnimatedComponent,
      AnimatedComponent = _props$AnimatedCompon === void 0 ? SlideAnimatedView : _props$AnimatedCompon,
      onAnimateIn = props.onAnimateIn,
      onAnimateOut = props.onAnimateOut,
      children = props.children;
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      renderModal = _useState2[0],
      setRenderModal = _useState2[1];
  if (props.visible && !renderModal) setRenderModal(true);
  var _useThemePath = useThemePath(themePath || "modal.".concat(type), styles),
      _useThemePath2 = _slicedToArray(_useThemePath, 1),
      modalStyles = _useThemePath2[0];
  useEffect(function () {
    if (global.document && visible) {
      global.document.body.style.overflow = 'hidden';
      return function () {
        global.document.body.style.overflow = '';
      };
    }
  }, [visible]);
  var cb = useCallback(function () {
    if (!visible) {
      setRenderModal(false);
      if (isFunc(onAnimateOut)) onAnimateOut();
    } else if (isFunc(onAnimateIn)) onAnimateIn();
  }, [onAnimateOut, onAnimateIn]);
  return (
    React.createElement(View, {
      dataSet: Modal.dataSet.main,
      style: renderModal ? modalStyles.main : hideModalStyle
    }, React.createElement(TouchableOpacity, {
      dataSet: Modal.dataSet.backdrop,
      style: modalStyles.backdrop,
      onPress: onBackdropTouch,
      activeOpacity: activeOpacity
    }), React.createElement(AnimatedComponent, {
      onAnimationFinish: cb,
      visible: visible,
      defaultStyle: modalStyles.content
    }, children))
  );
};
Modal.dataSet = {
  main: {
    class: 'modal-main'
  },
  backdrop: {
    class: 'modal-backdrop'
  },
  content: {
    class: 'modal-content'
  }
};
Modal.propTypes = {
  themePath: PropTypes.string,
  type: PropTypes.string,
  visible: PropTypes.bool,
  styles: PropTypes.object,
  activeOpacity: PropTypes.number,
  onBackdropTouch: PropTypes.func,
  onAnimateIn: PropTypes.func,
  onAnimateOut: PropTypes.func,
  AnimatedComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
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
var sideContentMainStyle = _objectSpread2(_objectSpread2({}, defaultSectionStyle), {}, {
  justifyContent: 'center',
  paddingLeft: 0
});
var defaultSideSectionStyle = {
  main: _objectSpread2(_objectSpread2({}, defaultSectionStyle), {}, {
    flexDirection: 'row',
    maxWidth: '20%'
  }, flex.align.center),
  content: {
    button: {
      main: _objectSpread2({}, sideContentMainStyle)
    },
    main: _objectSpread2({}, sideContentMainStyle),
    icon: {
      paddingHorizontal: 10,
      color: '#111111',
      fontSize: 30
    }
  }
};
var appHeader = {
  default: {
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2
    },
    main: {
      $all: {
        justifyContent: 'center',
        backgroundColor: get$1(colors$1, 'surface.primary.colors.dark'),
        height: 70,
        width: '100%',
        flexDirection: 'row'
      }
    },
    content: {
      left: {
        main: _objectSpread2(_objectSpread2({}, flex.left), defaultSideSectionStyle.main),
        content: defaultSideSectionStyle.content
      },
      right: {
        main: _objectSpread2(_objectSpread2({}, flex.right), defaultSideSectionStyle.main),
        content: defaultSideSectionStyle.content
      },
      center: {
        main: _objectSpread2(_objectSpread2(_objectSpread2({}, flex.center), defaultSectionStyle), {}, {
          width: '60%'
        }),
        content: {
          title: {
            color: 'white'
          }
        }
      }
    }
  }
};

var transition = function transition() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
  prop = isArr(prop) ? prop : [prop];
  amount = isNum(amount) && "".concat(amount, "s") || amount;
  return {
    transitionProperty: prop.map(trainCase),
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
  var opacity = get$1(defaults, "states.types.".concat(state, ".opacity"));
  var shade = get$1(defaults, "states.types.".concat(state, ".shade"));
  var activeColor = get$1(colors$1, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: activeColor,
        padding: 9,
        minHeight: 35,
        opacity: opacity
      },
      $web: _objectSpread2({
        cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
        boxShadow: 'none'
      }, transition(['backgroundColor', 'borderColor'], 0.3)),
      $native: {}
    },
    content: {
      color: state === 'disabled' ? get$1(colors$1, 'opacity._50') : get$1(colors$1, 'palette.white01'),
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
  var shade = get$1(defaults, "states.types.".concat(state, ".shade"));
  var activeColor = get$1(colors$1, "surface.".concat(colorType, ".colors.").concat(shade));
  return {
    main: {
      $all: {
        backgroundColor: state === 'hover' ? colors$1.opacity(10, activeColor) : get$1(colors$1, 'palette.transparent')
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
  var activeColor = get$1(colors$1, "surface.".concat(colorType, ".colors.").concat(stateShade));
  return {
    main: {
      $all: {
        padding: 8,
        borderWidth: 1,
        borderColor: activeColor,
        backgroundColor: state === 'hover' ? colors$1.opacity(10, activeColor) : get$1(colors$1, 'palette.white01')
      },
      $web: {
        outline: 'none'
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
var color$1 = function color(_color) {
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
  color: color$1,
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

var opacity05 = get$1(colors$1, 'opacity._05');
var colorPalette = get$1(colors$1, 'palette');
var contained$1 = {
  main: {
    $native: {
      shadowColor: opacity05,
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 1,
      elevation: 1
    },
    $web: {
      boxShadow: "1px 1px 5px ".concat(opacity05)
    },
    $all: {
      backgroundColor: colorPalette.white01,
      borderWidth: 1,
      padding: padding.size,
      margin: margin.size,
      marginBottom: 0,
      borderColor: colorPalette.gray01,
      borderStyle: 'solid'
    }
  },
  container: {
    backgroundColor: colorPalette.transparent
  },
  footer: {
    container: {},
    text: {},
    divider: {}
  },
  header: {
    container: _objectSpread2(_objectSpread2({}, flex.left), flex.column),
    text: {
      fontSize: 16,
      color: colorPalette.black02,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    divider: {}
  },
  divider: {
    marginBottom: margin.size
  },
  media: {
    container: {
      marginBottom: margin.size,
      width: '100%'
    },
    image: {
      width: '100%'
    },
    loadingComp: {
      indicator: {
        icon: {
          fontSize: '100px',
          color: colorPalette.gray01
        }
      }
    },
    video: {
      width: '100%'
    }
  },
  featured: {
    title: {
      fontSize: 18,
      marginBottom: 8,
      color: colorPalette.white01,
      fontWeight: '800'
    },
    subtitle: {
      fontSize: 13,
      marginBottom: 8,
      color: colorPalette.white01,
      fontWeight: '400'
    }
  },
  overlay: _objectSpread2({
    flex: 1,
    alignItems: 'center',
    backgroundColor: opacity05,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }, helpers.abs),
  body: {}
};

var full = deepMerge$1(contained$1, {
  main: {
    $all: {
      padding: 0
    }
  },
  header: {
    container: {
      paddingTop: padding.size / 2,
      paddingBottom: padding.size / 2
    },
    text: {
      paddingLeft: padding.size,
      paddingRight: padding.size
    },
    divider: {
      display: 'none'
    }
  },
  body: {
    padding: padding.size,
    paddingTop: 0
  }
});

var card = {
  full: full,
  default: contained$1
};

var divider = {
  $all: {
    width: '100%',
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

var icon = {
  default: {
    container: {},
    icon: {}
  }
};

var image = {
  default: {
    container: {
      $all: {
        display: 'flex'
      }
    },
    loadingComp: {},
    loading: {
      opacity: 0
    },
    loaded: {
      opacity: 1
    },
    image: {
      $web: _objectSpread2({}, transition('opacity', 0.8))
    },
    hover: {}
  }
};

var container = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 36,
  minWidth: 36,
  position: 'relative'
};
var indicator = {
  default: {
    container: container,
    icon: {
      color: get$1(colors$1, 'surface.default.colors.main')
    }
  },
  primary: {
    container: container,
    icon: {
      color: get$1(colors$1, 'surface.primary.colors.main')
    }
  },
  secondary: {
    container: container,
    icon: {
      color: get$1(colors$1, 'surface.secondary.colors.main')
    }
  },
  warn: {
    container: container,
    icon: {
      color: get$1(colors$1, 'surface.warn.colors.main')
    }
  },
  danger: {
    container: container,
    icon: {
      color: get$1(colors$1, 'surface.danger.colors.main')
    }
  }
};

var link = {
  default: {
    $all: {
      color: colors$1.palette.blue01,
      textDecorationLine: 'underline',
      textDecorationColor: colors$1.palette.blue02
    }
  },
  hover: {
    $all: {
      color: colors$1.palette.blue02,
      textDecorationColor: colors$1.palette.blue02
    }
  }
};

var loading = {
  default: {
    container: {},
    progress: {},
    text: {}
  }
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
var contained$2 = {
  default: {
    $all: {
      main: {
        minHeight: 100,
        width: wrapper.width,
        padding: wrapper.padding,
        backgroundColor: get$1(surface, 'default.colors.light'),
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
          color: get$1(palette, 'black03'),
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
        borderColor: get$1(surface$1, 'default.colors.main')
      }
    }
  }
};
outlined.default = inheritFrom(contained$2.default, outlined.default);

var textBox = {
  outlined: outlined,
  contained: contained$2
};

var modal$1 = {
  default: {
    main: _objectSpread2(_objectSpread2({
      zIndex: 9998
    }, flex.center), {}, {
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      alignItems: 'stretch'
    }),
    backdrop: _objectSpread2(_objectSpread2({}, helpers.abs), {}, {
      backgroundColor: 'rgba(1,1,1,0.2)'
    }),
    content: {
      $xsmall: {
        position: 'absolute',
        zIndex: 9999,
        alignSelf: 'center',
        backgroundColor: colors$1.palette.white01
      },
      $medium: {
        maxWidth: '80%'
      }
    }
  }
};

var components = {
  appHeader: appHeader,
  button: button,
  card: card,
  divider: divider,
  drawer: drawer,
  filePicker: filePicker,
  icon: icon,
  image: image,
  indicator: indicator,
  link: link,
  loading: loading,
  section: section,
  textBox: textBox,
  modal: modal$1
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

var height = get$1(defaults, 'form.checkbox.height', 20);
var width = get$1(defaults, 'form.checkbox.width', 20);
var checkboxDefault = {
  main: {
    $all: {
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    $web: {
      display: 'flex'
    }
  },
  content: {
    main: {
      $web: {
        outline: 'none',
        height: height,
        width: width,
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative'
      },
      $native: {
        alignItems: 'center'
      }
    },
    area: {
      off: {
        $all: {
          backgroundColor: get$1(colors$1, 'palette.gray01')
        },
        $web: {
          outline: 'none',
          height: '100%',
          width: '100%',
          position: 'absolute',
          boxShadow: "inset 0px 0px 5px ".concat(get$1(colors$1, 'opacity._15')),
          borderRadius: get$1(defaults, 'form.border.radius', 5)
        }
      },
      on: {
        $all: {
          backgroundColor: get$1(colors$1, 'surface.primary.colors.main')
        }
      }
    },
    indicator: {
      off: {
        $web: {
          outline: 'none',
          marginLeft: 0,
          cursor: 'pointer',
          height: height,
          width: width,
          position: 'absolute',
          top: 0,
          left: 0,
          color: get$1(colors$1, 'palette.white02'),
          fontSize: '16px',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      on: {}
    },
    disabled: {
      opacity: 0.4
    },
    left: {
      flex: 1,
      textAlign: 'left'
    },
    right: {
      flex: 1,
      textAlign: 'right'
    }
  }
};
var checkboxClose = deepMerge$1(checkboxDefault, {
  main: {
    $all: {
      justifyContent: 'flex-start'
    }
  },
  content: {
    left: {
      flex: 'none',
      marginRight: '10px',
      textAlign: 'inherit'
    },
    right: {
      flex: 'none',
      marginLeft: '10px',
      textAlign: 'inherit'
    }
  }
});
var checkbox = {
  default: checkboxDefault,
  close: checkboxClose
};

var height$1 = get$1(defaults, 'form.input.height', 35);
var verticalPad = padding.size / 6;
var borderWidth = 1;
var inputHeight = height$1 - (verticalPad * 2 + borderWidth * 2);
var sharedForm = {
  inputs: {
    backgroundColor: colors$1.palette.white01,
    minWidth: 100,
    overflow: 'hidden',
    height: get$1(defaults, 'form.input.height', 35),
    padding: padding.size / 2
  },
  derivedInput: {
    paddingTop: verticalPad,
    paddingBottom: verticalPad,
    height: inputHeight
  },
  border: {
    borderRadius: 5,
    borderWidth: 1,
    borderTopColor: "".concat(colors$1.palette.gray01),
    borderLeftColor: "".concat(colors$1.palette.gray01),
    borderRightColor: "".concat(colors$1.palette.gray01),
    borderBottomColor: "".concat(colors$1.palette.gray02),
    borderStyle: 'solid'
  }
};

var input = {
  default: {
    $all: _objectSpread2(_objectSpread2(_objectSpread2({}, sharedForm.border), sharedForm.inputs), sharedForm.derivedInput),
    $web: {
      width: '100%'
    },
    $native: {
      width: '100%'
    }
  }
};

var option = {};

var radio = {};

var select = {
  default: {
    $all: _objectSpread2(_objectSpread2({}, sharedForm.border), sharedForm.inputs)
  }
};

var height$2 = get$1(defaults, 'form.switch.height', 20);
var width$1 = get$1(defaults, 'form.switch.width', 20);
var switchDefault = {
  main: {
    $all: {
      width: '100%',
      height: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'flex'
    }
  },
  content: {
    main: {
      alignItems: 'center'
    },
    left: {
      flex: 1,
      textAlign: 'left'
    },
    right: {
      flex: 1,
      textAlign: 'right'
    },
    area: {
      off: {
        $web: {
          outline: 'none',
          backgroundColor: get$1(colors$1, 'palette.gray01'),
          boxShadow: "inset 0px 0px 5px ".concat(get$1(colors$1, 'opacity._15')),
          borderRadius: get$1(defaults, 'form.border.radius', 5) * 2,
          height: '70%',
          width: '100%',
          position: 'absolute',
          top: 3
        },
        $native: {
          backgroundColor: get$1(colors$1, 'surface.primary.colors.main')
        }
      },
      on: {}
    },
    indicator: {
      off: {
        $web: _objectSpread2({
          outline: 'none',
          backgroundColor: get$1(colors$1, 'palette.white02'),
          borderRadius: get$1(defaults, 'form.border.radius', 5) * 2,
          boxShadow: "0px 1px 3px ".concat(get$1(colors$1, 'opacity._50')),
          marginLeft: 0,
          cursor: 'pointer',
          height: height$2,
          width: width$1,
          position: 'absolute',
          top: 0,
          left: 0
        }, transition('left', 0.2))
      },
      on: {
        $web: {
          left: width$1,
          boxShadow: "1px 1px 3px ".concat(get$1(colors$1, 'opacity._50')),
          backgroundColor: get$1(colors$1, 'surface.primary.colors.main')
        }
      }
    },
    disabled: {
      opacity: 0.4
    }
  }
};
var switchClose = deepMerge$1(switchDefault, {
  main: {
    $all: {
      justifyContent: 'flex-start'
    }
  },
  content: {
    left: {
      flex: 'none',
      marginRight: '10px',
      textAlign: 'inherit'
    },
    right: {
      flex: 'none',
      marginLeft: '10px',
      textAlign: 'inherit'
    }
  }
});
var switchStyles = {
  default: switchDefault,
  close: switchClose
};

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
      flexWrap: 'wrap',
      minWidth: '100%'
    },
    column: {
      flexWrap: 'wrap'
    },
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

var fontDefs = get$1(defaults, 'font', {});
var typography = {
  font: {
    family: {
      $native: {},
      $web: {
        fontFamily: fontDefs.family || 'Verdana, Geneva, sans-serif'
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
    fontSize: 40,
    letterSpacing: -1.5
  },
  h2: {
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: -0.5
  },
  h3: {
    color: colors$1.opacity._60,
    fontSize: 28
  },
  h4: {
    fontSize: 24,
    letterSpacing: 0.25
  },
  h5: {
    fontSize: 20
  },
  h6: {
    color: colors$1.opacity._60,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: '500'
  },
  label: {
    minWidth: '100%',
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: '700',
    marginBottom: margin.size / 4
  },
  paragraph: {
    fontSize: fontDefs.size || 16,
    letterSpacing: 0.5
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: fontDefs.spacing || 0.15
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

export { Link as A, AppHeader, Button, Caption, Card, Checkbox, Column, Divider, Drawer, FilePicker, Form, Grid, H1, H2, H3, H4, H5, H6, Icon, Image, Input, Label, Link, Loading, Modal, Option, P, Radio, Row, Section, Select, Subtitle, Switch, Text, TextBox, TouchableIcon, View, isValidComponent, renderFromType, theme, useAnimate, useChildren, useFromToAnimation, useInputHandlers, useMediaProps, usePressHandlers, useSelectHandlers, useSpin, useStyle, useThemePath, useThemeWithHeight, withTouch };
//# sourceMappingURL=kegComponents.native.js.map
