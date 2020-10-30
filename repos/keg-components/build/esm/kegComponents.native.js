import React__default, { useMemo, isValidElement, useRef, useCallback, useState, useLayoutEffect, useEffect, createElement, forwardRef, useImperativeHandle } from 'react';
import { View as View$1, Text as Text$2, Dimensions, Animated, Platform, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, Clipboard, ActivityIndicator, Image as Image$2, TextInput, Picker, Switch as Switch$2, ScrollView as ScrollView$2 } from 'react-native';
import PropTypes from 'prop-types';
import { capitalize, isFunc, isArr, isObj, isStr, get, checkCall, reduceObj, deepMerge, validate, flatMap, mapEntries, noOpObj, noPropObj, isEmptyColl, noOp, noPropArr, toBool, isNum, mapObj, pickKeys, eitherArr, trainCase, deepClone, set } from '@keg-hub/jsutils';
import { useTheme, useDimensions, useThemeHover, useThemeActive, useStyle, withTheme, useStylesCallback } from '@keg-hub/re-theme';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { opacity, shadeHex } from '@keg-hub/re-theme/colors';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

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

var useClassName = function useClassName(defClass, className, ref) {
  return ref;
};

var View = React__default.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      className = _ref.className,
      props = _objectWithoutProperties(_ref, ["children", "className"]);
  var classRef = useClassName('keg-view', className, ref);
  return React__default.createElement(View$1, _extends({}, props, {
    ref: classRef
  }), children);
});
View.propTypes = _objectSpread2(_objectSpread2({}, View$1.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var useTextAccessibility = function useTextAccessibility(element, accessibilityRole) {
  return useMemo(function () {
    var type = accessibilityRole ? accessibilityRole : headings.includes(element) ? 'header' : element;
    return _objectSpread2({
      accessibilityRole: type
    }, type === 'header' && _defineProperty({}, 'aria-level', element[1]));
  }, [element, accessibilityRole]);
};

var useTextStyles = function useTextStyles(element) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.get('typography.font.family', 'typography.default', element && "typography.".concat(element));
  }, [theme, element]);
};

var ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1
};
var KegText = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var accessibilityRole = props.accessibilityRole,
        children = props.children,
        className = props.className,
        ellipsis = props.ellipsis,
        attrs = _objectWithoutProperties(props, ["accessibilityRole", "children", "className", "ellipsis"]);
    var classRef = useClassName("keg-".concat(element), className, ref);
    var a11y = useTextAccessibility(element, accessibilityRole);
    return React__default.createElement(Text$2, _extends({}, attrs, a11y, ellipsis && ellipsisProps, {
      ref: classRef
    }), children);
  });
};
KegText.propTypes = _objectSpread2(_objectSpread2({}, Text$2.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var useTextComponent = function useTextComponent(element) {
  return useMemo(function () {
    return StyleInjector(KegText(element), {
      displayName: capitalize(element),
      className: "keg-".concat(element)
    });
  }, [element]);
};
var KegText$1 = function KegText(element) {
  return React__default.forwardRef(function (props, ref) {
    var textStyles = useTextStyles(element);
    var Text = useTextComponent(element);
    return React__default.createElement(Text, _extends({}, props, {
      style: [textStyles, props.style],
      ref: ref
    }));
  });
};
KegText$1.propTypes = KegText.propTypes;

var Text = KegText$1('text');

var isValidComponent = function isValidComponent(Component) {
  return isValidElement(Component) || isFunc(Component);
};

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent(Element) ? isFunc(Element) ? React__default.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React__default.createElement(Wrapper, props, Element) : Element;
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
  return value ? value : children ? isArr(children) ? get(children, ['0', 'props', 'children']) : get(children, ['props', 'children']) : '';
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

var handleRefUpdate = function handleRefUpdate(ref, update) {
  return !ref ? update : isObj(ref) && 'current' in ref ? ref.current = update : checkCall(ref, update);
};

var platform = "native"  ;
var getPlatform = function getPlatform() {
  return platform;
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
	family: "Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\"",
	components: {
	}
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

var __themeDefaults = defaults;
var getThemeDefaults = function getThemeDefaults() {
  return __themeDefaults;
};

var defaults$1 = getThemeDefaults();
var defPalette = get(defaults$1, 'colors.palette', {});
var defTypes = get(defaults$1, 'colors.types', {});
var colors$1 = {
  opacity: opacity,
  palette: reduceObj(defPalette, function (key, value, updated) {
    !isArr(value) ? updated[key] = value : value.map(function (val, i) {
      var name = "".concat(key, "0").concat(i + 1);
      updated[name] = isStr(val) ? val : shadeHex(value[1], value[i]);
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
var buildSurfaceStyles = function buildSurfaceStyles(cb) {
  return Object.keys(colorSurface).reduce(function (surfaceStyles, surface) {
    surfaceStyles[surface] = checkCall(cb, surface, colorSurface);
    return surfaceStyles;
  }, {});
};

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
  return isObj(functionObj) && mapEntries(functionObj, function (name, func) {
    return [name, isFunc(func)];
  }) || {};
};

var useAnimate = function useAnimate(_ref) {
  var ref = _ref.ref,
      animation = _ref.animation,
      config = _ref.config,
      startCb = _ref.startCb,
      startDelay = _ref.startDelay;
  var aniRef = useRef(ref);
  console.warn('useAnimate not implemented on native');
  return [aniRef];
};

var useChildren = function useChildren(defaults, overrides) {
  return useMemo(function () {
    return reduceObj(defaults, function (key, value, children) {
      children[key] = overrides[key] || value;
    }, {});
  }, [].concat(_toConsumableArray(Object.values(defaults.values)), _toConsumableArray(Object.values(overrides))));
};

var buildPropsForChild = function buildPropsForChild(childRefs, child, index) {
  var key = (child === null || child === void 0 ? void 0 : child.key) || index || child;
  var existingRef = child === null || child === void 0 ? void 0 : child.ref;
  return {
    key: key,
    ref: function ref(childRef) {
      handleRefUpdate(existingRef, childRef);
      childRefs.current[key] = childRef;
    }
  };
};
var useCloneChildCallback = function useCloneChildCallback(childRefs) {
  return useCallback(function (child) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var props = buildPropsForChild(childRefs, child, index);
    return React__default.isValidElement(child) ? React__default.cloneElement(child, props) : child;
  }, [childRefs]);
};
var useChildrenWithRefs = function useChildrenWithRefs(children) {
  var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var childRefs = useRef({});
  var cloneChild = useCloneChildCallback(childRefs);
  var updatedChildren = useMemo(function () {
    return enable ? React__default.Children.count(children) > 1 ? children.map(cloneChild) : cloneChild(children) : children;
  }, [enable, children]);
  return [updatedChildren, childRefs];
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

var getMediaType = function getMediaType(mediaTypes, styles) {
  return mediaTypes ? reduceObj(mediaTypes, function (key, value, mediaData) {
    return !mediaData.type && value ? {
      type: key,
      media: value,
      styles: !isObj(styles) ? styles : styles.media
    } : mediaData;
  }, {}) : noOpObj;
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
      styles: deepMerge(
      {
        loading: styles.loading
      },
      mediaStyles,
      get(media, 'style', {}))
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
      var value = get(event, 'target.value');
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

var validateStyles = function validateStyles(styles) {
  return !Boolean(!styles || styles === noPropObj || isEmptyColl(styles));
};
var getStylesFromPath = function getStylesFromPath(theme, path) {
  return path && get(theme, path) || function () {
  }();
};
var mergeStyles = function mergeStyles(pathStyles, userStyles) {
  if (!userStyles || userStyles === noPropObj) return pathStyles;
  var pathKeys = Object.keys(pathStyles);
  var userKeys = Object.keys(userStyles);
  return !userKeys.length ? pathStyles : pathKeys.indexOf(userKeys[0]) !== -1 ?
  deepMerge(pathStyles, userStyles) :
  reduceObj(pathStyles, function (key, value, updated) {
    updated[key] = deepMerge(value, userStyles);
    return updated;
  }, {});
};
var useThemePath = function useThemePath(path) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noPropObj;
  var theme = useTheme();
  return useMemo(function () {
    var pathStyles = getStylesFromPath(theme, path);
    var validStyles = validateStyles(styles);
    return validStyles ? mergeStyles(pathStyles, styles) : pathStyles || noPropObj;
  }, [theme, path, styles]);
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
  return deepMerge(themeStyles, stylesWithHeight);
};
var useThemeWithHeight = function useThemeWithHeight(themePath, styles, key) {
  var themeStyles = useThemePath(themePath, styles);
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

var useFromToAnimation = function useFromToAnimation(params) {
  var _ref = params || {},
      from = _ref.from,
      to = _ref.to,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 500 : _ref$duration,
      _ref$onFinish = _ref.onFinish,
      onFinish = _ref$onFinish === void 0 ? noOp : _ref$onFinish,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? false : _ref$loop,
      easing = _ref.easing;
  var animDependencies = [from, to, duration, loop, easing, onFinish];
  var fromVal = useMemo(function () {
    return new Animated.Value(from);
  }, animDependencies);
  var config = {
    toValue: to,
    duration: duration,
    easing: easing
  };
   (config.useNativeDriver = true);
  var animatedTiming = Animated.timing(fromVal, config);
  useEffect(function () {
    loop ? Animated.loop(animatedTiming).start() : animatedTiming.start(onFinish);
  }, animDependencies);
  return [fromVal];
};

var useClassList = function useClassList() {
  return noPropArr;
};

var useThemeTypeAsClass = function useThemeTypeAsClass() {
  return noPropArr;
};

var Icon = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var className = props.className,
      color = props.color,
      Component = props.Component,
      _props$Element = props.Element,
      Element = _props$Element === void 0 ? Component : _props$Element,
      name = props.name,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      attrs = _objectWithoutProperties(props, ["className", "color", "Component", "Element", "name", "size", "styles", "themePath", "type"]);
  if (!isValidComponent(Element)) return console.error("Invalid Element passed to Icon component!", Element) || null;
  var iconStyles = useThemePath(themePath || "icon.".concat(type), styles);
  var iconProps = {
    ref: ref,
    name: name,
    style: iconStyles.icon,
    color: color || iconStyles.color || get(iconStyles, 'icon.color') || get(theme, 'typography.default.color'),
    size: parseInt(size || get(iconStyles, 'icon.fontSize') || get(theme, 'typography.default.fontSize', 15) * 2, 10)
  };
  return React__default.createElement(View, {
    className: useClassList(),
    style: iconStyles.container
  }, renderFromType(Element, _objectSpread2(_objectSpread2({}, attrs), iconProps)));
});
Icon.propTypes = {
  className: PropTypes.string,
  Component: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.elementType]),
  Element: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.elementType]),
  color: PropTypes.string,
  name: PropTypes.string,
  ref: PropTypes.object,
  style: PropTypes.object,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string
};

var TouchableComp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
var Touchable = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      _props$showFeedback = props.showFeedback,
      showFeedback = _props$showFeedback === void 0 ? true : _props$showFeedback,
      touchRef = props.touchRef,
      attrs = _objectWithoutProperties(props, ["className", "showFeedback", "touchRef"]);
  var Component = showFeedback ? TouchableComp : TouchableWithoutFeedback;
  var classRef = useClassName('keg-touchable', className, touchRef || ref);
  return React__default.createElement(Component, _extends({
    accessible: true
  }, attrs, {
    ref: classRef
  }));
});
Touchable.propTypes = _objectSpread2(_objectSpread2({}, TouchableComp.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  showFeedback: PropTypes.bool
});

var Touchable$1 = StyleInjector(Touchable, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable$1.propTypes = Touchable.propTypes;

var withTouch = function withTouch(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$showFeedback = options.showFeedback,
      showFeedback = _options$showFeedback === void 0 ? true : _options$showFeedback;
  var wrapped = React__default.forwardRef(function (props, ref) {
    var _props$touchThemePath = props.touchThemePath,
        touchThemePath = _props$touchThemePath === void 0 ? '' : _props$touchThemePath,
        _props$touchStyle = props.touchStyle,
        touchStyle = _props$touchStyle === void 0 ? noPropObj : _props$touchStyle,
        onPress = props.onPress,
        otherProps = _objectWithoutProperties(props, ["touchThemePath", "touchStyle", "onPress"]);
    var theme = useTheme();
    return React__default.createElement(Touchable$1, {
      showFeedback: showFeedback,
      style: [get(theme, touchThemePath), touchStyle],
      onPress: onPress
    }, React__default.createElement(Component, _extends({
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
TouchableIcon.propTypes = _objectSpread2(_objectSpread2({}, Touchable$1.propTypes), Icon.propTypes);

var useSize = function useSize(size, style, theme) {
  return useMemo(function () {
    var iconSize = size || get(style, 'fontSize');
    var themeSize = get(theme, 'typography.default.fontSize', 15) * 2;
    return {
      height: iconSize || get(style, 'height', themeSize),
      width: iconSize || get(style, 'width', themeSize)
    };
  }, [size, style]);
};
var useColor = function useColor(fill, stroke, color, border, style, theme) {
  return useMemo(function () {
    var themeColor = get(theme, 'typography.default.color');
    return {
      stroke: stroke || border || style.border || color || style.color || themeColor,
      fill: fill || color || style.color || stroke
    };
  }, [fill, stroke, color, border, style]);
};
var SvgIcon = function SvgIcon(props) {
  var border = props.border,
      color = props.color,
      clipRule = props.clipRule,
      delta = props.delta,
      fill = props.fill,
      fillRule = props.fillRule,
      size = props.size,
      stroke = props.stroke,
      _props$style = props.style,
      style = _props$style === void 0 ? noPropObj : _props$style,
      svgFill = props.svgFill,
      viewBox = props.viewBox,
      attrs = _objectWithoutProperties(props, ["border", "color", "clipRule", "delta", "fill", "fillRule", "size", "stroke", "style", "svgFill", "viewBox"]);
  var theme = useTheme();
  var sizeStyle = useSize(size, style, theme);
  var colorStyle = useColor(fill, stroke, color, border, style, theme);
  return React__default.createElement(Svg, _extends({}, attrs, {
    fill: svgFill,
    viewBox: viewBox,
    style: [style, sizeStyle]
  }), React__default.createElement(Path, {
    stroke: colorStyle.stroke,
    fill: colorStyle.fill,
    d: delta,
    fillRule: fillRule,
    clipRule: clipRule
  }));
};
SvgIcon.propTypes = {
  border: PropTypes.string,
  color: PropTypes.string,
  clipRule: PropTypes.string,
  delta: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stroke: PropTypes.string,
  style: PropTypes.object,
  svgFill: PropTypes.string,
  viewBox: PropTypes.string
};

var Check = function Check(props) {
  return createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 512 512",
    delta: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
  }));
};

var ChevronDown = function ChevronDown(props) {
  return createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"
  }));
};

var Copy = function Copy(props) {
  return createElement(SvgIcon, _extends({}, props, {
    viewBox: "0 0 448 512",
    delta: "M433.941 65.941l-51.882-51.882A48 48 0 00348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 00-14.059-33.941zM266 464H54a6 6 0 01-6-6V150a6 6 0 016-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 01-6 6zm128-96H182a6 6 0 01-6-6V54a6 6 0 016-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 01-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 011.757 4.243V112z"
  }));
};

var TextBox = function TextBox(props) {
  var className = props.className,
      _props$maxLines = props.maxLines,
      maxLines = _props$maxLines === void 0 ? 100 : _props$maxLines,
      styles = props.styles,
      text = props.text,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "textBox.outlined.".concat(type) : _props$themePath,
      _props$useClipboard = props.useClipboard,
      useClipboard = _props$useClipboard === void 0 ? false : _props$useClipboard;
  var style = useThemePath(themePath, styles);
  return React__default.createElement(View, {
    className: useThemeTypeAsClass(),
    style: style.main
  }, React__default.createElement(View, {
    className: "keg-textbox-container",
    style: get(style, 'content.wrapper')
  }, React__default.createElement(Text, {
    className: "keg-textbox-text",
    numberOfLines: maxLines,
    style: get(style, 'content.text')
  }, text || '')), React__default.createElement(Text, null, useClipboard && text && React__default.createElement(TouchableIcon, {
    Component: Copy,
    size: 15,
    className: "keg-textbox-clipboard",
    touchStyle: get(style, 'content.clipboard'),
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

var getChildren = function getChildren(Children) {
  var styles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return renderFromType(Children, {
    style: styles.content
  }, Text);
};
var checkDisabled = function checkDisabled(mainStyles, btnStyles, disabled) {
  return disabled ? _objectSpread2(_objectSpread2({}, mainStyles), get(btnStyles, 'disabled.main')) : mainStyles;
};
var Button = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      content = props.content,
      onClick = props.onClick,
      onPress = props.onPress,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      themePath = props.themePath,
      elProps = _objectWithoutProperties(props, ["className", "children", "content", "onClick", "onPress", "styles", "type", "themePath"]);
  var btnStyles = useThemePath(themePath || "button.contained.".concat(type), styles);
  var _useThemeHover = useThemeHover(get(btnStyles, 'default', {}), get(btnStyles, 'hover'), {
    ref: ref
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      hoverRef = _useThemeHover2[0],
      hoverStyles = _useThemeHover2[1];
  var _useThemeActive = useThemeActive(hoverStyles, get(btnStyles, 'active'), {
    ref: hoverRef
  }),
      _useThemeActive2 = _slicedToArray(_useThemeActive, 2),
      themeRef = _useThemeActive2[0],
      themeStyles = _useThemeActive2[1];
  return React__default.createElement(Touchable$1, _extends({
    accessibilityRole: "button",
    className: useThemeTypeAsClass()
  }, elProps, {
    touchRef: themeRef,
    style: checkDisabled(themeStyles.main, btnStyles, props.disabled),
    children: getChildren(children || content, themeStyles)
  }, getPressHandler(false, onClick, onPress), getActiveOpacity(false, props, btnStyles)));
});
Button.propTypes = _objectSpread2(_objectSpread2({}, Touchable$1.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  Touchable: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  ref: PropTypes.object,
  styles: PropTypes.object,
  themePath: PropTypes.string
});

var CardCallout = function CardCallout(_ref) {
  var className = _ref.className,
      subtitle = _ref.subtitle,
      title = _ref.title,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  var calloutStyles = get(styles, "callout");
  return React__default.createElement(View, {
    className: useClassList(),
    style: calloutStyles.overlay
  }, title && React__default.createElement(Text, {
    className: "keg-card-title",
    style: calloutStyles.title
  }, title), subtitle && React__default.createElement(Text, {
    className: "keg-card-subtitle",
    style: calloutStyles.subtitle
  }, subtitle));
};

var CardContent = function CardContent(_ref) {
  var children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles,
      subtitle = _ref.subtitle,
      title = _ref.title;
  return React__default.createElement(View, {
    className: "keg-card-content",
    style: styles.main
  }, (title || subtitle) && React__default.createElement(CardCallout, {
    className: "keg-card-content-callout",
    styles: styles,
    subtitle: subtitle,
    title: title
  }), children);
};
CardContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  style: PropTypes.object
};

var CardContainer = function CardContainer(_ref) {
  var className = _ref.className,
      _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? noOpObj : _ref$attributes,
      children = _ref.children,
      _ref$styles = _ref.styles,
      styles = _ref$styles === void 0 ? noPropObj : _ref$styles;
  return React__default.createElement(View, _extends({
    className: useClassList()
  }, attributes, {
    style: styles.main
  }), React__default.createElement(View, {
    className: "keg-card-container",
    style: styles.container
  }, children));
};
CardContainer.propTypes = {
  attributes: PropTypes.object,
  styles: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func])
};

var SectionWrap = function SectionWrap(_ref) {
  var children = _ref.children,
      numberOfLines = _ref.numberOfLines,
      showBorder = _ref.showBorder,
      styles = _ref.styles,
      type = _ref.type;
  type = type || 'section';
  return React__default.createElement(Text, {
    className: "keg-".concat(type, "-text"),
    numberOfLines: numberOfLines,
    style: [get(styles, "text"), showBorder === false && get(styles, "noBorder.text")]
  }, children);
};
var CardSection = function CardSection(_ref2) {
  var Section = _ref2.Section,
      props = _objectWithoutProperties(_ref2, ["Section"]);
  var type = props.type || 'section';
  return Section && React__default.createElement(View, {
    className: "keg-card-".concat(type),
    style: [get(props, "styles.main"), props.showBorder === false && get(props, "styles.noBorder.main")]
  }, renderFromType(Section, props, SectionWrap));
};
CardSection.propTypes = _defineProperty({
  Section: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  type: PropTypes.string
}, "numberOfLines", PropTypes.number);

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
  var builtStyles = useThemePath(themePath || "indicator.".concat(type), styles);
  return React__default.createElement(View, {
    style: builtStyles.container
  }, React__default.createElement(Element, _extends({}, elProps, {
    alt: alt || 'Loading',
    style: builtStyles.icon,
    size: size,
    resizeMode: resizeMode || 'contain'
  })));
};

var isWeb = getPlatform() === 'web';
var Element = function Element(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      size = _ref.size,
      color = _ref.color,
      attrs = _objectWithoutProperties(_ref, ["className", "style", "size", "color"]);
  return React__default.createElement(View, {
    className: useClassList()
  }, React__default.createElement(ActivityIndicator, {
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
  return React__default.createElement(IndicatorWrapper, _extends({}, props, {
    alt: alt || 'Loading',
    size: ['large', 'small'].includes(size) ? size : 'large',
    color: color,
    Element: Element,
    styles: styles,
    isWeb: isWeb
  }));
};

var Progress = function Progress(props) {
  var styles = props.styles,
      text = props.text,
      loadIndicator = props.loadIndicator,
      type = props.type,
      size = props.size;
  var LoadingIndicator = loadIndicator || Indicator;
  return React__default.createElement(View, {
    style: styles.progress,
    className: "keg-progress"
  }, isValidComponent(LoadingIndicator) ? React__default.createElement(LoadingIndicator, {
    size: size,
    styles: styles.indicator,
    type: type
  }) : text && React__default.createElement(Text, {
    className: "keg-progress-text",
    style: styles.text
  }, text));
};
var Loading = function Loading(props) {
  var className = props.className,
      children = props.children,
      _props$text = props.text,
      text = _props$text === void 0 ? 'Loading' : _props$text,
      indicator = props.indicator,
      size = props.size,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type;
  var builtStyles = useThemePath(themePath || "loading.".concat(type), styles);
  return React__default.createElement(View, {
    style: builtStyles.main,
    className: useClassList()
  }, children || React__default.createElement(Progress, {
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
  children: PropTypes.object
};

var Image = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-image', className, ref);
  return React__default.createElement(Image$2, _extends({
    accessibilityLabel: "image"
  }, props, {
    ref: classRef
  }));
});
Image.propTypes = _objectSpread2(_objectSpread2({}, Image$2.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var KegImage = StyleInjector(Image, {
  displayName: 'Image',
  className: 'keg-image'
});
var Image$1 = forwardRef(function (props, ref) {
  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
  var internalRef = ref || useRef(null);
  var alt = props.alt,
      className = props.className,
      children = props.children,
      onClick = props.onClick,
      onPress = props.onPress,
      src = props.src,
      source = props.source,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "image.".concat(type) : _props$themePath,
      _props$useLoading = props.useLoading,
      useLoading = _props$useLoading === void 0 ? true : _props$useLoading,
      attrs = _objectWithoutProperties(props, ["alt", "className", "children", "onClick", "onPress", "src", "source", "styles", "type", "themePath", "useLoading"]);
  var builtStyles = useThemePath(themePath, styles);
  var loadingStyles = useStyle(builtStyles.loading, builtStyles.image);
  var loadedStyles = useStyle(loadingStyles, builtStyles.loaded);
  var _useThemeHover = useThemeHover(loadedStyles, builtStyles.hover, {
    internalRef: internalRef
  }),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 3),
      imgRef = _useThemeHover2[0],
      elementStyle = _useThemeHover2[1],
      setStyle = _useThemeHover2[2];
  var onLoad = useCallback(function () {
    checkCall(setLoading, false);
    checkCall(setStyle, elementStyle);
    checkCall(props.onLoad, props);
    isFunc(imgRef) ? imgRef(internalRef.current) : imgRef && (imgRef.current = internalRef.current);
  }, [src, source, internalRef.current]);
  return React__default.createElement(View, {
    className: useClassList(),
    style: builtStyles.container
  }, loading && useLoading && React__default.createElement(Loading, {
    className: "keg-image-loading",
    styles: builtStyles.loadingComp
  }), React__default.createElement(KegImage, _extends({}, attrs, {
    style: loading ? loadingStyles : builtStyles.image
  }, getPressHandler(false, onClick, onPress), getImgSrc(false, src, source), {
    onLoadEnd: onLoad,
    alt: alt,
    ref: internalRef
  })));
});
Image$1.propTypes = _objectSpread2(_objectSpread2({}, Image.propTypes), {}, {
  onPress: PropTypes.func,
  type: PropTypes.string,
  alt: PropTypes.string,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  styles: PropTypes.object
});

var noHeader = {
  marginTop: 0
};
var MediaFromType = function MediaFromType(_ref) {
  var mediaProps = _ref.mediaProps,
      styles = _ref.styles;
  var className = mediaProps.className,
      type = mediaProps.type,
      _mediaProps$resizeMod = mediaProps.resizeMode,
      resizeMode = _mediaProps$resizeMod === void 0 ? 'cover' : _mediaProps$resizeMod,
      _mediaProps$resizeMet = mediaProps.resizeMethod,
      resizeMethod = _mediaProps$resizeMet === void 0 ? 'scale' : _mediaProps$resizeMet,
      props = _objectWithoutProperties(mediaProps, ["className", "type", "resizeMode", "resizeMethod"]);
  var image = styles.image,
      video = styles.video,
      container = styles.container,
      loading = styles.loading,
      loadingComp = styles.loadingComp;
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
        return React__default.createElement(Image$1, _extends({
          resizeMode: resizeMode,
          resizeMethod: resizeMethod
        }, props, {
          className: "keg-card-media",
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
  var hasHeader = _ref2.hasHeader,
      mediaProps = _ref2.mediaProps,
      Media = _ref2.Media,
      subtitle = _ref2.subtitle,
      styles = _ref2.styles,
      title = _ref2.title;
  return Media || !mediaProps ? Media || null : React__default.createElement(View, {
    className: "keg-card-media",
    style: [get(styles, 'main'), hasHeader === false && noHeader]
  }, React__default.createElement(MediaFromType, {
    mediaProps: mediaProps,
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
  var contentTitle = props.contentTitle,
      children = props.children,
      className = props.className,
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
      attributes = _objectWithoutProperties(props, ["contentTitle", "children", "className", "Footer", "footerLines", "Header", "headerLines", "image", "Media", "subtitle", "themePath", "title", "type", "video"]);
  var cardStyles = useThemePath(themePath || "card.".concat(type), styles);
  var mediaProps = useMediaProps({
    Media: Media,
    image: image,
    video: video,
    styles: cardStyles
  });
  var hasMedia = Boolean(Media || mediaProps);
  var hasContent = Boolean(children || title || subtitle);
  return React__default.createElement(CardContainer, {
    className: className,
    attributes: attributes,
    styles: cardStyles
  }, Header && React__default.createElement(CardSection, {
    Section: Header,
    type: "header",
    numberOfLines: headerLines,
    styles: cardStyles.header,
    showBorder: !hasMedia
  }), hasMedia && React__default.createElement(CardMedia, {
    mediaProps: mediaProps,
    styles: cardStyles.media,
    hasHeader: Boolean(Header)
  }), hasContent && React__default.createElement(CardContent, {
    title: title,
    subtitle: subtitle,
    styles: cardStyles.content,
    children: children
  }), Footer && React__default.createElement(CardSection, {
    Section: Footer,
    type: "footer",
    numberOfLines: footerLines,
    styles: cardStyles.footer,
    showBorder: hasContent
  }));
};
Card.Body = CardContent;
Card.Container = CardContainer;
Card.Header = CardSection;
Card.Footer = CardSection;
Card.Media = CardMedia;
Card.propTypes = {
  contentTitle: PropTypes.string,
  Footer: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  footerLines: PropTypes.number,
  Header: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  headerLines: PropTypes.number,
  Media: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.func, PropTypes.element]),
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string
};

var Divider = function Divider(_ref) {
  var className = _ref.className,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "style"]);
  var theme = useTheme();
  return React__default.createElement(View, _extends({
    accessibilityRole: "separator",
    className: useClassList()
  }, props, {
    style: [get(theme, ['divider']), style]
  }));
};
Divider.propTypes = {
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

var Caption = KegText$1('caption');

var H1 = KegText$1('h1');

var H2 = KegText$1('h2');

var H3 = KegText$1('h3');

var H4 = KegText$1('h4');

var H5 = KegText$1('h5');

var H6 = KegText$1('h6');

var Label = KegText$1('label');

var Paragraph = KegText$1('paragraph');
var P = function P(props) {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Paragraph, props), '\n');
};

var Subtitle = KegText$1('subtitle');

var FilePicker = function FilePicker(props) {
  return React__default.createElement(View, null, React__default.createElement(P, null, "FilePicker Not yet implemented for native."));
};

var useCheckedState = function useCheckedState(isChecked, themeStyles) {
  return useMemo(function () {
    return _objectSpread2(_objectSpread2({}, themeStyles), {}, {
      content: _objectSpread2(_objectSpread2({}, themeStyles.content), {}, {
        area: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.area.off')), isChecked && get(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.indicator.off')), isChecked && get(themeStyles, 'content.indicator.on'))
      })
    });
  }, [isChecked, themeStyles]);
};
var useCheckboxPressHandler = function useCheckboxPressHandler(isChecked, setChecked, onChange, _ref) {
  var _ref$disableCheck = _ref.disableCheck,
      disableCheck = _ref$disableCheck === void 0 ? false : _ref$disableCheck,
      _ref$disableUncheck = _ref.disableUncheck,
      disableUncheck = _ref$disableUncheck === void 0 ? true : _ref$disableUncheck;
  return useCallback(function (event) {
    if (isChecked) !disableUncheck && setChecked(false);else !disableCheck && setChecked(true);
    checkCall(onChange, event, !isChecked);
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
  return isStr(Component) ? React__default.createElement(Text, _extends({
    className: className,
    style: style
  }, sideProps), Component) : renderFromType(Component, _objectSpread2({
    className: className,
    style: style,
    styles: styles
  }, sideProps));
};
var ChildrenComponent = function ChildrenComponent(_ref3) {
  var children = _ref3.children,
      className = _ref3.className;
  return React__default.createElement(React__default.Fragment, null, renderFromType(children, {
    className: className
  }, null));
};
var useCheckboxHandle = function useCheckboxHandle(ref, isChecked, _setChecked, pressHandler) {
  return useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: function setChecked(checked) {
        _setChecked(checked);
        pressHandler({}, checked);
      }
    };
  }, [ref, isChecked, _setChecked, pressHandler]);
};
var CheckboxWrapper = forwardRef(function (props, ref) {
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
      elProps = _objectWithoutProperties(props, ["className", "initChecked", "checked", "children", "elType", "Element", "CheckIcon", "disabled", "disableCheck", "disableUncheck", "allowAdjacentPress", "isWeb", "LeftComponent", "leftClassName", "close", "onChange", "onValueChange", "RightComponent", "rightClassName", "styles", "CheckboxComponent", "type", "themePath", "value"]);
  var initCheckedValue = toBool(checked || initChecked || value);
  var _useState = useState(initCheckedValue),
      _useState2 = _slicedToArray(_useState, 2),
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
  var themeStyles = useThemePath(elThemePath, styles);
  var disabledStyles = useThemePath("form.".concat(elType, ".disabled"), themeStyles);
  var activeStyles = useCheckedState(isChecked, canUseHandler ? themeStyles : disabledStyles);
  var typeClassName = useThemeTypeAsClass();
  var pressHandlerProp = canUseHandler ? getOnChangeHandler(isWeb, pressHandler) : undefined;
  var ChildrenView = children && React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default.createElement(ChildrenComponent, {
    className: "keg-checkbox-container",
    children: children
  }));
  return ChildrenView || React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default.createElement(SideComponent, {
    className: useClassList(),
    Component: LeftComponent,
    style: activeStyles.content.left,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }), CheckboxComponent ? renderFromType(CheckboxComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default.createElement(Element, _extends({
    className: "keg-checkbox-container",
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content,
    CheckIcon: CheckIcon
  }, getChecked(isWeb, isChecked), pressHandlerProp)), RightComponent && React__default.createElement(SideComponent, {
    className: useClassList(),
    Component: RightComponent,
    style: activeStyles.content.right,
    onPress: allowAdjacentPress && canUseHandler && pressHandler
  }));
});
CheckboxWrapper.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  Element: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  LeftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  RightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  CheckboxComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  CheckIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool,
  disableCheck: PropTypes.bool,
  disableUncheck: PropTypes.bool,
  allowAdjacentPress: PropTypes.bool
};

var Input = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  return React__default.createElement("input", _extends({
    ref: classRef
  }, props));
});

var checkBoxStyles = {
  icon: {
    position: 'relative',
    zIndex: 1,
    height: 14,
    width: 14,
    top: 0,
    left: 3,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    opacity: 0,
    cursor: 'pointer'
  }
};
var Input$1 = StyleInjector(Input, {
  displayName: 'Checkbox',
  className: 'keg-checkbox'
});
var Element$1 = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      elProps = props.elProps,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? noPropObj : _props$styles,
      _props$CheckIcon = props.CheckIcon,
      CheckIcon = _props$CheckIcon === void 0 ? Check : _props$CheckIcon,
      checked = props.checked,
      attributes = _objectWithoutProperties(props, ["className", "elProps", "styles", "CheckIcon", "checked"]);
  var checkStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, checkBoxStyles.icon), styles.indicator);
  }, [checkBoxStyles, styles]);
  var inputStyle = useMemo(function () {
    return _objectSpread2(_objectSpread2({}, styles.input), checkBoxStyles.input);
  }, [checkBoxStyles, styles]);
  return React__default.createElement(View, {
    style: styles.main,
    className: className
  }, React__default.createElement(View, {
    className: "keg-checkbox-area",
    style: styles.area
  }), checked && React__default.createElement(CheckIcon, {
    className: "keg-checkbox-icon",
    style: checkStyle
  }), React__default.createElement(Input$1, _extends({
    className: "keg-checkbox"
  }, elProps, attributes, {
    role: "checkbox",
    checked: checked,
    type: "checkbox",
    ref: ref,
    style: inputStyle
  })));
});
var Checkbox = forwardRef(function (props, ref) {
  return React__default.createElement(CheckboxWrapper, _extends({}, props, {
    elType: 'checkbox',
    Element: Element$1,
    isWeb: true,
    ref: ref
  }));
});
Checkbox.propTypes = _objectSpread2({}, CheckboxWrapper.propTypes);

var Form = React__default.forwardRef(function (props, ref) {
  var theme = useTheme();
  var children = props.children,
      className = props.className,
      elType = props.elType,
      style = props.style,
      type = props.type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.form.".concat(type || 'default') : _props$themePath,
      elProps = _objectWithoutProperties(props, ["children", "className", "elType", "style", "type", "themePath"]);
  var formTheme = useThemePath(themePath);
  return React__default.createElement(View, _extends({
    accessibilityRole: "form",
    className: useClassList()
  }, elProps, {
    style: [get(theme, 'form.form.default'), formTheme, style],
    ref: ref
  }), children);
});
Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  onSubmit: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string
};

var Input$2 = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-input', className, ref);
  var TextInputTouch = withTouch(TextInput, {
    showFeedback: false
  });
  return React__default.createElement(TextInputTouch, _extends({
    accessibilityRole: "textbox"
  }, props, {
    ref: classRef
  }));
});
Input$2.propTypes = _objectSpread2(_objectSpread2({}, TextInput.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var KegInput = StyleInjector(Input$2, {
  displayName: 'Input',
  className: 'keg-input'
});
var getValue = function getValue(_ref) {
  var children = _ref.children,
      value = _ref.value;
  var setValue = getValueFromChildren(value, children);
  return value !== undefined ? {
    value: setValue
  } : {};
};
var Input$3 = React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
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
      elProps = _objectWithoutProperties(props, ["className", "children", "disabled", "editable", "Element", "onChange", "onValueChange", "onChangeText", "onClick", "onPress", "readOnly", "type", "themePath", "style", "value"]);
  var inputStyles = useThemePath(themePath);
  return React__default.createElement(KegInput, _extends({
    accessibilityRole: "textbox",
    onPress: onPress
  }, getReadOnly(false, readOnly, disabled, editable), getValue(props), useInputHandlers({
    onChange: onChange,
    onValueChange: onValueChange,
    onChangeText: onChangeText
  }), usePressHandlers(false, {
    onClick: onClick,
    onPress: onPress
  }), elProps, {
    style: [inputStyles, style],
    ref: ref
  }));
});
Input$3.propTypes = _objectSpread2(_objectSpread2({}, KegInput.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func,
  onPress: PropTypes.func,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

var SelectOption = Picker.Item;
var useable = function useable(item) {
  return (isStr(item) || isNum(item)) && item;
};
var getVal = function getVal(value, text, children, label) {
  return useable(value) || useable(text) || useable(children) || useable(label);
};
var Option = function Option(props) {
  var label = props.label,
      children = props.children,
      text = props.text,
      value = props.value;
  return React__default.createElement(SelectOption, {
    label: getVal(label, value, text),
    value: getVal(value, text, children, label)
  });
};
Option.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

var Radio = withTheme(function (props) {
  var theme = props.theme,
      children = props.children,
      style = props.style,
      onClick = props.onClick,
      onPress = props.onPress,
      text = props.text,
      args = _objectWithoutProperties(props, ["theme", "children", "style", "onClick", "onPress", "text"]);
  return React__default.createElement(Text, _extends({}, args, {
    style: [get(theme, ['form', 'radio']), style]
  }), text);
});
Radio.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string
};

var Select = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-select', className, ref);
  return React__default.createElement(Picker, _extends({}, props, {
    ref: classRef
  }));
});
Select.propTypes = _objectSpread2(_objectSpread2({}, Picker.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var KegSelect = StyleInjector(Select, {
  displayName: 'Select',
  className: 'keg-select'
});
var getValue$1 = function getValue(props) {
  var children = props.children,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      readOnly = props.readOnly,
      value = props.value;
  var setValue = getValueFromChildren(value, children);
  var valKey = getInputValueKey(false, onChange, onValueChange, readOnly);
  return _defineProperty({}, valKey, setValue);
};
var Select$1 = React__default.forwardRef(function (props, ref) {
  var _selectStyles$icon, _selectStyles$icon$di;
  var className = props.className,
      children = props.children,
      disabled = props.disabled,
      readOnly = props.readOnly,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      style = props.style,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"]);
  var selectStyles = useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass();
  var classRef = useClassName('keg-select', selectClasses, ref);
  return React__default.createElement(View, {
    style: [selectStyles.main, style]
  }, React__default.createElement(KegSelect, _extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue$1(props), useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default.createElement(Icon, {
    styles: selectStyles.icon,
    Component: ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});
Select$1.propTypes = _objectSpread2(_objectSpread2({}, Select.propTypes), {}, {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  ref: PropTypes.object,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

var Switch = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);
  var classRef = useClassName('keg-switch', className, ref);
  return React__default.createElement(Switch$2, _extends({}, props, {
    reg: classRef
  }));
});
Switch.propTypes = _objectSpread2(_objectSpread2({}, Switch$2.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var KegSwitch = StyleInjector(Switch, {
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
  var colors = _objectSpread2(_objectSpread2({}, indicatorColor && {
    thumbColor: thumbColor || color
  }), areaColor && {
    trackColor: areaColor,
    onTintColor: areaColor
  });
  return colors;
};
var useCheckedState$1 = function useCheckedState(isChecked, themeStyles) {
  var theme = useTheme();
  return useMemo(function () {
    return theme.join(themeStyles, {
      content: {
        area: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.area.off')), isChecked && get(themeStyles, 'content.area.on')),
        indicator: _objectSpread2(_objectSpread2({}, get(themeStyles, 'content.indicator.off')), isChecked && get(themeStyles, 'content.indicator.on'))
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
var SideComponent$1 = function SideComponent(_ref2) {
  var Component = _ref2.Component,
      style = _ref2.style;
  return isStr(Component) ? React__default.createElement(Text, {
    style: style
  }, Component) : renderFromType(Component, {
    style: styles.content
  });
};
var ChildrenComponent$1 = function ChildrenComponent(_ref3) {
  var children = _ref3.children;
  return React__default.createElement(React__default.Fragment, null, renderFromType(children, {}, null));
};
var useSwitchHandle = function useSwitchHandle(ref, isChecked, setChecked) {
  return useImperativeHandle(ref, function () {
    return {
      isChecked: isChecked,
      setChecked: setChecked
    };
  }, [ref, isChecked, setChecked]);
};
var Switch$1 = forwardRef(function (props, ref) {
  var className = props.className,
      checked = props.checked,
      children = props.children,
      elType = props.elType,
      disabled = props.disabled,
      LeftComponent = props.LeftComponent,
      close = props.close,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      RightComponent = props.RightComponent,
      styles = props.styles,
      SwitchComponent = props.SwitchComponent,
      setCheckedSetter = props.setCheckedSetter,
      type = props.type,
      themePath = props.themePath,
      thumbColor = props.thumbColor,
      trackColor = props.trackColor,
      value = props.value,
      elProps = _objectWithoutProperties(props, ["className", "checked", "children", "elType", "disabled", "LeftComponent", "close", "onChange", "onValueChange", "RightComponent", "styles", "SwitchComponent", "setCheckedSetter", "type", "themePath", "thumbColor", "trackColor", "value"]);
  var _useState = useState(toBool(checked || value)),
      _useState2 = _slicedToArray(_useState, 2),
      isChecked = _useState2[0],
      setChecked = _useState2[1];
  useSwitchHandle(ref, isChecked, setChecked);
  var elThemePath = themePath || "form.switch.".concat(close && 'close' || 'default');
  var themeStyles = useThemePath(elThemePath, styles);
  var activeStyles = useCheckedState$1(isChecked, themeStyles);
  var typeClassName = useThemeTypeAsClass();
  return children && React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, React__default.createElement(ChildrenComponent$1, {
    className: "keg-switch-container",
    children: children
  })) || React__default.createElement(View, {
    className: typeClassName,
    style: activeStyles.main
  }, LeftComponent && React__default.createElement(SideComponent$1, {
    className: "keg-switch-left",
    Component: LeftComponent,
    style: activeStyles.content.left
  }), SwitchComponent ? renderFromType(SwitchComponent, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: activeStyles.content
  })) : React__default.createElement(KegSwitch, _extends({
    elProps: elProps,
    disabled: disabled,
    styles: activeStyles.content
  }, getSwitchColors(thumbColor, trackColor, activeStyles.content), getChecked(false, isChecked), getOnChangeHandler(false, setCheckedValue(isChecked, setChecked, onChange || onValueChange)))), RightComponent && React__default.createElement(SideComponent$1, {
    className: "keg-switch-right",
    Component: RightComponent,
    style: activeStyles.content.right
  }));
});
Switch$1.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  LeftComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  RightComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  SwitchComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func, PropTypes.element]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  thumbColor: PropTypes.string,
  trackColor: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool
};

var SimpleHeader = React__default.forwardRef(function (props, ref) {
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
  return React__default.createElement(Text, _extends({
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
  return React__default.createElement(Checkbox, {
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
  return React__default.createElement(View, {
    className: useClassList(),
    style: groupStyles === null || groupStyles === void 0 ? void 0 : groupStyles.main
  }, showHeader && React__default.createElement(Header, null), childrenWithProps);
});
CheckGroup.Item = Checkbox;
CheckGroup.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  headerClassName: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  title: PropTypes.string,
  initChecked: PropTypes.bool,
  showHeaderCheckbox: PropTypes.bool,
  showHeader: PropTypes.bool,
  onGroupPress: PropTypes.func,
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

var useHasWidth = function useHasWidth(styles) {
  return useMemo(function () {
    return styles.map(function (style) {
      return Boolean(Object.keys(pickKeys(style, ['width', 'minWidth', 'maxWidth'])).length);
    }).indexOf(true) !== -1;
  }, styles);
};
var Container = function Container(_ref) {
  var onPress = _ref.onPress,
      onClick = _ref.onClick,
      children = _ref.children,
      flexDir = _ref.flexDir,
      size = _ref.size,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? noPropObj : _ref$style,
      props = _objectWithoutProperties(_ref, ["onPress", "onClick", "children", "flexDir", "size", "style"]);
  var containerStyles = isArr(style) ? style : [style];
  var hasWidth = useHasWidth(containerStyles);
  var flexStyle = flexDir === 'row' ? {
    flexDirection: flexDir,
    flex: size ? size : hasWidth ? 0 : 1
  } : {};
  return React__default.createElement(View, _extends({}, props, {
    style: [flexStyle].concat(_toConsumableArray(containerStyles))
  }, getPressHandler(getPlatform(), onClick || onPress)), children);
};
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array, PropTypes.func]),
  flexDir: PropTypes.string,
  onPress: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

var Row = function Row(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    style: [get(theme, 'layout.grid.row'), style],
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
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "children", "style"]);
  var theme = useTheme();
  var _getChildAttrs = getChildAttrs(children),
      isRow = _getChildAttrs.isRow,
      isCenter = _getChildAttrs.isCenter;
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    flexDir: isRow ? 'column' : 'row',
    size: 1,
    style: [get(theme, ['layout', 'grid', 'wrapper']), style, isCenter && buildCenterStyles(isCenter)]
  }), children);
};
Grid.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object
};

var widthFromSize = function widthFromSize(size, theme) {
  var total = get(theme, ['layout', 'columns'], 12);
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
  var className = _ref.className,
      children = _ref.children,
      size = _ref.size,
      center = _ref.center,
      props = _objectWithoutProperties(_ref, ["className", "children", "size", "center"]);
  var theme = useTheme();
  return React__default.createElement(Container, _extends({}, props, {
    className: useClassList(),
    size: size,
    flexDir: "column",
    style: [get(theme, ['layout', 'grid', 'column']), props.style, getColumnWidth(size, theme)]
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
  var _useThemeHover = useThemeHover(theme.join(linkStyle, style), get(theme, "link.hover")),
      _useThemeHover2 = _slicedToArray(_useThemeHover, 2),
      ref = _useThemeHover2[0],
      themeStyle = _useThemeHover2[1];
  var spacer = space && getSpacer(space);
  return React__default.createElement(React__default.Fragment, null, spacer, React__default.createElement(Element, _extends({
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

var isWeb$1 = getPlatform() === 'web';
var Text$1 = KegText$1('link');
var Element$2 = React__default.forwardRef(function (props, ref) {
  var children = props.children,
      className = props.className,
      elProps = props.elProps,
      href = props.href,
      onPress = props.onPress,
      style = props.style,
      target = props.target,
      attrs = _objectWithoutProperties(props, ["children", "className", "elProps", "href", "onPress", "style", "target"]);
  return React__default.createElement(Touchable$1, _extends({
    className: useClassList()
  }, elProps, attrs, {
    touchRef: ref
  }), React__default.createElement(Text$1, {
    accessibilityRole: "link",
    className: "keg-link-text",
    style: style,
    href: href,
    target: target
  }, children));
});
var Link = function Link(props) {
  return React__default.createElement(LinkWrapper, _extends({}, props, {
    Element: Element$2,
    isWeb: isWeb$1
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
  var className = props.className,
      theme = props.theme,
      children = props.children,
      style = props.style,
      type = props.type,
      args = _objectWithoutProperties(props, ["className", "theme", "children", "style", "type"]);
  return React__default.createElement(View, _extends({}, args, {
    className: useClassList(),
    accessibilityRole: "region",
    style: theme.get("section.default", type && "section.".concat(type), style)
  }), children);
});
Section.propTypes = {
  style: PropTypes.object,
  type: PropTypes.string
};

var SlideAnimatedView = function SlideAnimatedView(_ref) {
  var className = _ref.className,
      defaultStyle = _ref.defaultStyle,
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
  }),
      _useFromToAnimation2 = _slicedToArray(_useFromToAnimation, 1),
      slide = _useFromToAnimation2[0];
  var classRef = useClassName();
  return React__default.createElement(Animated.View, {
    ref: classRef,
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
  var _props$AnimatedCompon = props.AnimatedComponent,
      AnimatedComponent = _props$AnimatedCompon === void 0 ? SlideAnimatedView : _props$AnimatedCompon,
      _props$activeOpacity = props.activeOpacity,
      activeOpacity = _props$activeOpacity === void 0 ? 1 : _props$activeOpacity,
      children = props.children,
      className = props.className,
      onAnimateIn = props.onAnimateIn,
      onAnimateOut = props.onAnimateOut,
      _props$onBackdropTouc = props.onBackdropTouch,
      onBackdropTouch = _props$onBackdropTouc === void 0 ? noOp : _props$onBackdropTouc,
      styles = props.styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      visible = props.visible;
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      renderModal = _useState2[0],
      setRenderModal = _useState2[1];
  if (props.visible && !renderModal) setRenderModal(true);
  var modalStyles = useThemePath(themePath || "modal.".concat(type), styles);
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
  }, [onAnimateOut, onAnimateIn, visible]);
  return (
    React__default.createElement(View, {
      className: useClassList(),
      style: renderModal ? modalStyles.main : hideModalStyle
    }, React__default.createElement(Touchable$1, {
      className: 'keg-modal-backdrop',
      style: modalStyles.backdrop,
      onPress: onBackdropTouch,
      activeOpacity: activeOpacity
    }), React__default.createElement(AnimatedComponent, {
      onAnimationFinish: cb,
      visible: visible,
      defaultStyle: modalStyles.content
    }, children))
  );
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

var ItemHeader = function ItemHeader(props) {
  var _headerStyles$shadow, _headerStyles$content;
  var theme = useTheme();
  var appHeader = props.appHeader,
      className = props.className,
      title = props.title,
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
      children = props.children,
      elProps = _objectWithoutProperties(props, ["appHeader", "className", "title", "styles", "RightComponent", "CenterComponent", "LeftComponent", "onLeftClick", "leftIcon", "LeftIconComponent", "rightIcon", "RightIconComponent", "IconComponent", "onRightClick", "shadow", "ellipsis", "themePath", "children"]);
  var headerStyles = useThemePath(themePath || "header.itemHeader", styles);
  return React__default.createElement(View, _extends({
    className: useClassList()
  }, elProps, {
    style: [headerStyles.main, appHeader && get(headerStyles, ['appHeader', 'main']), shadow && get(headerStyles, ['shadow', 'main'])]
  }),  shadow && React__default.createElement(View, {
    style: headerStyles === null || headerStyles === void 0 ? void 0 : (_headerStyles$shadow = headerStyles.shadow) === null || _headerStyles$shadow === void 0 ? void 0 : _headerStyles$shadow.cover
  }), children || React__default.createElement(React__default.Fragment, null, React__default.createElement(Side, {
    styles: headerStyles.content,
    iconName: leftIcon,
    IconElement: LeftIconComponent || IconComponent,
    action: onLeftClick
  }, LeftComponent), React__default.createElement(Center, {
    ellipsis: ellipsis,
    theme: theme,
    styles: (_headerStyles$content = headerStyles.content) === null || _headerStyles$content === void 0 ? void 0 : _headerStyles$content.center,
    title: title
  }, CenterComponent), React__default.createElement(Side, {
    right: true,
    styles: headerStyles.content,
    iconName: rightIcon,
    IconElement: RightIconComponent || IconComponent,
    action: onRightClick
  }, RightComponent)));
};
ItemHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
  leftIcon: PropTypes.string,
  LeftIconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.elementType]),
  onRightClick: PropTypes.oneOfType([PropTypes.func, PropTypes.any]),
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
  return React__default.createElement(View, {
    className: "keg-header-center",
    style: styles.main
  }, children && renderFromType(children, {}, null) || React__default.createElement(H5, {
    className: "keg-header-center-title",
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
  var contentStyles = get(styles, [position, 'content'], noPropObj);
  var iconProps = {
    styles: styles,
    IconElement: IconElement,
    iconName: iconName,
    position: position
  };
  var showIcon = isValidComponent(IconElement);
  return React__default.createElement(View, {
    className: "keg-header-".concat(position),
    style: get(styles, [position, 'main'])
  }, children && renderFromType(children, {}, null) || (action ? React__default.createElement(Button, {
    className: "keg-header-".concat(position, "-button"),
    styles: contentStyles.button,
    onClick: action
  }, showIcon && React__default.createElement(CustomIcon, iconProps)) : showIcon && React__default.createElement(View, {
    className: "keg-header-".concat(position, "-icon"),
    style: contentStyles.main
  }, React__default.createElement(CustomIcon, iconProps))));
};
var CustomIcon = function CustomIcon(props) {
  var className = props.className,
      iconName = props.iconName,
      IconElement = props.IconElement,
      position = props.position,
      styles = props.styles;
  return React__default.createElement(Icon, {
    className: className,
    name: iconName,
    Element: IconElement,
    styles: get(styles, [position, 'content', 'icon'])
  });
};

var AppHeader = function AppHeader(props) {
  var className = props.className,
      otherProps = _objectWithoutProperties(props, ["className"]);
  return React__default.createElement(ItemHeader, _extends({
    accessibilityRole: "banner",
    className: useClassList(),
    appHeader: true
  }, otherProps));
};

var useScrollClassNames = function useScrollClassNames(defClass, className, innerClassName, ref) {
  className = eitherArr(className, [className]);
  var classRef = useRef(className);
  return useCallback(function (scrollResponder) {
    handleRefUpdate(ref, scrollResponder);
  }, [defClass, className.join(' '), ref]);
};
var ScrollView = React__default.forwardRef(function (_ref, ref) {
  var className = _ref.className,
      innerClassName = _ref.innerClassName,
      props = _objectWithoutProperties(_ref, ["className", "innerClassName"]);
  var classRef = useScrollClassNames('keg-scrollview', className, innerClassName, ref);
  return React__default.createElement(ScrollView$2, _extends({}, props, {
    ref: classRef
  }));
});
ScrollView.propTypes = _objectSpread2(_objectSpread2({}, ScrollView$2.propTypes), {}, {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  innerClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
});

var ScrollView$1 = StyleInjector(ScrollView, {
  displayName: 'Scroll-View',
  className: 'keg-scrollview'
});
ScrollView$1.propTypes = ScrollView.propTypes;

var noAnimate = function noAnimate(toggled, current, collapsedHeight, contentMaxHeight) {
  return !toggled && current === collapsedHeight || toggled && current === contentMaxHeight;
};
var Drawer = function Drawer(props) {
  var Element = props.Element,
      styles = props.styles,
      toggled = props.toggled,
      className = props.className,
      _props$type = props.type,
      type = _props$type === void 0 ? 'timing' : _props$type,
      _props$config = props.config,
      config = _props$config === void 0 ? noOpObj : _props$config,
      _props$collapsedHeigh = props.collapsedHeight,
      collapsedHeight = _props$collapsedHeigh === void 0 ? 0 : _props$collapsedHeigh,
      childProps = _objectWithoutProperties(props, ["Element", "styles", "toggled", "className", "type", "config", "collapsedHeight"]);
  var contentMaxHeight = useRef(null);
  var _useState = useState(new Animated.Value(collapsedHeight)),
      _useState2 = _slicedToArray(_useState, 2),
      animation = _useState2[0],
      setAnimation = _useState2[1];
  var setMaxHeight = useCallback(function (event) {
    var maxHeight = event.nativeEvent.layout.height;
    if (contentMaxHeight.current === maxHeight) return;
    contentMaxHeight.current = maxHeight;
    toggled && setAnimation(new Animated.Value(maxHeight));
  }, [contentMaxHeight, toggled, setAnimation]);
  useLayoutEffect(function () {
    if (noAnimate(toggled, animation._value, collapsedHeight, contentMaxHeight.current)) return;
    var heightChanges = toggled ? {
      from: collapsedHeight,
      to: contentMaxHeight.current
    } : {
      from: contentMaxHeight.current,
      to: collapsedHeight
    };
    animation.setValue(heightChanges.from);
    var animationConfig = config ? _objectSpread2(_objectSpread2({}, config), {}, {
      toValue: heightChanges.to
    }) : {
      toValue: heightChanges.to
    };
    Animated[type](animation, animationConfig).start();
  }, [toggled, type, config, collapsedHeight]);
  var drawerStyles = useThemePath("drawer", styles);
  var classRef = useClassName();
  return React__default.createElement(Animated.View, {
    ref: classRef,
    style: [drawerStyles.main, get(styles, 'main'), {
      maxHeight: animation
    }]
  }, React__default.createElement(View, {
    className: "keg-drawer-content",
    onLayout: setMaxHeight,
    style: get(styles, 'content')
  }, isValidComponent(Element) ? React__default.createElement(Element, _extends({}, childProps, {
    styles: styles
  })) : props.children));
};
Drawer.propTypes = {
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  config: PropTypes.object,
  Element: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  toggled: PropTypes.bool,
  type: PropTypes.oneOf(['decay', 'spring', 'timing']),
  collapsedHeight: PropTypes.number
};

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
      isExpandedInit = _props$isExpandedInit === void 0 ? false : _props$isExpandedInit,
      className = props.className,
      CustomToggle = props.CustomToggle,
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
  return React__default.createElement(View, {
    style: [mainStyle.main],
    className: useClassList()
  }, React__default.createElement(Drawer, {
    collapsedHeight: collapsedHeight,
    toggled: expanded
  }, React__default.createElement(Text, {
    style: mainStyle.text,
    onLayout: onTextLayout
  }, text)), showToggle && !expanded && React__default.createElement(LinearGradient, {
    colors: ['rgba(255,255,255,0)', fadeColor],
    style: mainStyle.linearGradient
  }), showToggle && React__default.createElement(ToggleComponent, {
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
  return React__default.createElement(Touchable$1, {
    style: styles === null || styles === void 0 ? void 0 : styles.main,
    onPress: onPress
  }, isValidComponent(CustomComponent) ? React__default.createElement(CustomComponent, {
    isExpanded: isExpanded
  }) : React__default.createElement(Text, {
    style: styles === null || styles === void 0 ? void 0 : styles.text
  }, defaultText));
};
TextToggle.propTypes = {
  text: PropTypes.string,
  isExpandedInit: PropTypes.bool,
  styles: PropTypes.object,
  className: PropTypes.string,
  CustomToggle: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
  onToggle: PropTypes.func,
  togglePosition: PropTypes.oneOf(['left', 'center', 'right']),
  collapsedHeight: PropTypes.number,
  fadeColor: PropTypes.string,
  expandedToggleText: PropTypes.string,
  collapsedToggleText: PropTypes.string
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

var defaults$2 = getThemeDefaults();
var containedStyles = function containedStyles(state, colorType) {
  var opacity = get(defaults$2, "states.types.".concat(state, ".opacity"));
  var shade = get(defaults$2, "states.types.".concat(state, ".shade"));
  var activeColor = get(colors$1, "surface.".concat(colorType, ".colors.").concat(shade));
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
      }, transition(['backgroundColor', 'borderColor'], 0.5)),
      $native: {}
    },
    content: {
      color: state === 'disabled' ? get(colors$1, 'opacity._50') : get(colors$1, 'palette.white01'),
      fontSize: 14,
      fontWeight: '500',
      letterSpacing: 0.5,
      textAlign: 'center',
      $web: _objectSpread2({}, transition(['color'], 0.5))
    }
  };
};
var contained = buildTheme(containedStyles);

var defaults$3 = getThemeDefaults();
var textStyle = function textStyle(state, colorType) {
  var shade = get(defaults$3, "states.types.".concat(state, ".shade"));
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

var defaults$4 = getThemeDefaults();
var outlineStyles = function outlineStyles(state, colorType) {
  var stateShade = defaults$4.states.types[state].shade;
  var activeColor = get(colors$1, "surface.".concat(colorType, ".colors.").concat(stateShade));
  return {
    main: {
      $all: {
        padding: 8,
        borderWidth: 1,
        borderColor: activeColor,
        backgroundColor: state === 'hover' ? colors$1.opacity(10, activeColor) : get(colors$1, 'palette.white01')
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

var defaults$5 = getThemeDefaults();
var spaceHelper = function spaceHelper(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var type = arguments.length > 2 ? arguments[2] : undefined;
  sides = sides.length && sides || defaults$5.layout.sides;
  if (sides === 'all' || isArr(sides) && sides[0] === 'all') sides = defaults$5.layout.sides;
  return sides.reduce(function (styles, side) {
    styles["".concat(type).concat(capitalize(side))] = unitsHelper(amount);
    return styles;
  }, {});
};
var unitsHelper = function unitsHelper(value) {
  if (!isStr(value) && !isNum(value)) return value;
  if (isStr(value)) {
    var amount = parseInt(value);
    if ((amount || amount === 0) && amount.toString() === value) value += defaults$5.font.units;
  } else value += defaults$5.font.units;
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
    fontWeight: defaults$5.font.bold
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

var defaults$6 = getThemeDefaults();
var size$1 = defaults$6.layout.margin;
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

var defaults$7 = getThemeDefaults();
var size$2 = defaults$7.layout.padding;
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

var opacity05 = get(colors$1, 'opacity._5');
var colorPalette = get(colors$1, 'palette');
var section = {
  main: _objectSpread2(_objectSpread2(_objectSpread2({}, flex.left), flex.column), {}, {
    borderColor: colorPalette.gray01,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    padding: 0,
    paddingBottom: padding.size / 2,
    margin: margin.size,
    marginBottom: 0,
    marginTop: margin.size - margin.size / 5
  }),
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: get(colors$1, 'opacity._65'),
    fontWeight: 'bold'
  },
  noBorder: {
    main: {
      borderBottomWidth: 0,
      borderTopWidth: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
    text: {
      lineHeight: 20
    }
  }
};
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
      margin: margin.size,
      paddingBottom: margin.size - margin.size / 5,
      borderColor: colorPalette.gray01,
      borderStyle: 'solid',
      borderWidth: 1
    }
  },
  container: {
    backgroundColor: colorPalette.transparent
  },
  header: section,
  footer: _objectSpread2(_objectSpread2({}, section), {}, {
    main: _objectSpread2(_objectSpread2({}, section.main), {}, {
      paddingTop: padding.size / 2,
      paddingBottom: 0,
      marginBottom: 0,
      borderTopWidth: 1,
      borderBottomWidth: 0
    }),
    text: _objectSpread2(_objectSpread2({}, section.text), {}, {
      fontSize: 20,
      lineHeight: 24
    }),
    noBorder: {
      main: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        paddingTop: 0,
        paddingBottom: 0
      },
      text: {
        lineHeight: 20
      }
    }
  }),
  media: {
    main: {
      position: 'relative',
      margin: 0,
      marginTop: margin.size - margin.size / 5
    },
    image: {},
    loadingComp: {
      main: {},
      progress: {},
      indicator: {}
    },
    video: {
      width: '100%'
    }
  },
  content: {
    main: {
      margin: margin.size,
      marginBottom: 0
    },
    callout: {
      title: {
        fontSize: 18,
        marginBottom: margin.size / 4,
        color: get(colors$1, 'opacity._40'),
        fontWeight: '800'
      },
      subtitle: {
        fontSize: 13,
        marginBottom: margin.size,
        color: get(colors$1, 'opacity._40'),
        fontWeight: '400'
      }
    },
    overlay: _objectSpread2({
      flex: 1,
      alignItems: 'center',
      backgroundColor: opacity05,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }, helpers.abs)
  }
};

var card = {
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

var drawer = {
  main: {
    overflow: 'hidden',
    width: "100%"
  }
};

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

var colorPalette$1 = get(colors$1, 'palette');
var image = {
  default: {
    container: {
      $all: {
        display: 'flex'
      }
    },
    loadingComp: {
      main: {
        position: 'absolute',
        alignSelf: 'stretch',
        display: 'flex',
        width: '100%',
        height: '100%',
        zIndex: 1,
        background: colorPalette$1.white03
      },
      progress: {
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      indicator: {
        icon: {
          fontSize: '100px',
          color: colorPalette$1.gray02
        }
      }
    },
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
      color: get(colors$1, 'surface.default.colors.main')
    }
  },
  primary: {
    container: container,
    icon: {
      color: get(colors$1, 'surface.primary.colors.main')
    }
  },
  secondary: {
    container: container,
    icon: {
      color: get(colors$1, 'surface.secondary.colors.main')
    }
  },
  warn: {
    container: container,
    icon: {
      color: get(colors$1, 'surface.warn.colors.main')
    }
  },
  danger: {
    container: container,
    icon: {
      color: get(colors$1, 'surface.danger.colors.main')
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

var colorPalette$2 = get(colors$1, 'palette');
var styles$1 = {
  main: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    icon: {
      fontSize: '100px',
      color: colorPalette$2.gray02
    }
  }
};
var loadingStyles = buildSurfaceStyles(function (colorType, surfaces) {
  var surfaceStyles = deepClone(styles$1);
  set(surfaceStyles, 'indicator.icon.color', get(surfaces, "".concat(colorType, ".colors.main")));
  return surfaceStyles;
});
var loading = loadingStyles;

var section$1 = {
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
var itemHeader = {
  main: {
    $all: {
      position: 'relative',
      justifyContent: 'center',
      backgroundColor: get(colors$1, 'surface.primary.colors.dark'),
      width: '100%',
      flexDirection: 'row',
      height: 60
    },
    $web: {
      height: 70
    }
  },
  shadow: {
    main: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      position: 'relative',
      zIndex: 1
    },
    cover: {
      position: 'absolute',
      backgroundColor: get(colors$1, 'surface.primary.colors.dark'),
      height: 10,
      width: '100%',
      flexDirection: 'row',
      top: -5,
      zIndex: 2
    }
  },
  appHeader: {
    main: {}
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
};

var header = {
  itemHeader: itemHeader
};

var textToggle = {
  main: {
    fl: 1
  },
  textContainer: {},
  text: {
    ftSz: 20
  },
  linearGradient: {
    pos: 'absolute',
    bt: 40,
    lt: 0,
    rt: 0,
    height: 50
  },
  drawer: {
    main: {
      ovf: 'hidden',
      width: '100%'
    }
  },
  toggleComponent: {
    main: {
      mV: 15,
      alI: 'flex-end'
    },
    text: {
      txDL: 'underline'
    }
  }
};

var components = {
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
  section: section$1,
  textBox: textBox,
  modal: modal$1,
  header: header,
  textToggle: textToggle
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

var defaults$8 = getThemeDefaults();
var height = get(defaults$8, 'form.checkbox.height', 20);
var width = get(defaults$8, 'form.checkbox.width', 20);
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
          backgroundColor: get(colors$1, 'palette.gray01')
        },
        $web: {
          outline: 'none',
          height: '100%',
          width: '100%',
          position: 'absolute',
          boxShadow: "inset 0px 0px 5px ".concat(get(colors$1, 'opacity._15')),
          borderRadius: get(defaults$8, 'form.border.radius', 5)
        }
      },
      on: {
        $all: {
          backgroundColor: get(colors$1, 'surface.primary.colors.main')
        }
      }
    },
    indicator: {
      off: {
        $web: {
          color: get(colors$1, 'palette.white02')
        }
      },
      on: {}
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
var checkboxClose = deepMerge(checkboxDefault, {
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
var disabledRules = {
  $all: {
    opacity: 0.4
  },
  $web: {
    cursor: 'not-allowed'
  }
};
var checkboxDisabled = {
  main: disabledRules,
  content: {
    main: disabledRules,
    input: {
      cursor: 'not-allowed'
    },
    right: {
      cursor: 'not-allowed'
    }
  }
};
var checkbox = {
  default: checkboxDefault,
  close: checkboxClose,
  disabled: checkboxDisabled
};

var header$1 = {
  $all: {
    $xsmall: {
      width: '70%',
      color: colors$1.lightGray,
      lineHeight: 19,
      padding: 1,
      paddingBottom: 6,
      marginBottom: 4,
      borderBottomWidth: 1,
      borderStyle: 'dotted'
    },
    $small: {
      padding: 2,
      paddingBottom: 12,
      marginBottom: 7
    }
  },
  $web: {
    letterSpacing: '0.105em'
  }
};
var simpleHeader = {
  main: {
    marginLeft: 27
  }
};
var checkGroup = {
  main: {},
  header: header$1,
  simpleHeader: simpleHeader
};

var defaults$9 = getThemeDefaults();
var sharedForm = {
  inputs: {
    backgroundColor: colors$1.palette.white01,
    minWidth: 100,
    overflow: 'hidden',
    height: get(defaults$9, 'form.input.height', 35),
    padding: padding.size / 2
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
  default: _objectSpread2(_objectSpread2(_objectSpread2({}, sharedForm.border), sharedForm.inputs), {}, {
    width: '100%'
  })
};

var option = {};

var radio = {};

var select = {
  default: {
    main: _objectSpread2(_objectSpread2(_objectSpread2({
      position: 'relative'
    }, sharedForm.border), sharedForm.inputs), {}, {
      padding: 0,
      overflow: 'none'
    }),
    select: {
      $web: _objectSpread2(_objectSpread2({}, sharedForm.inputs), {}, {
        borderWidth: 0,
        appearance: 'none',
        backgroundColor: colors$1.palette.transparent
      })
    },
    icon: {
      container: {
        color: colors$1.opacity._85,
        position: 'absolute',
        zIndex: 1,
        right: 10,
        top: 10,
        pointerEvents: 'none'
      },
      icon: {
        color: colors$1.opacity._85,
        fontSize: 15
      },
      disabled: {
        color: colors$1.opacity._30
      }
    }
  }
};

var defaults$a = getThemeDefaults();
var height$1 = get(defaults$a, 'form.switch.height', 20);
var width$1 = get(defaults$a, 'form.switch.width', 20);
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
          backgroundColor: get(colors$1, 'palette.gray01'),
          boxShadow: "inset 0px 0px 5px ".concat(get(colors$1, 'opacity._15')),
          borderRadius: get(defaults$a, 'form.border.radius', 5) * 2,
          height: '70%',
          width: '100%',
          position: 'absolute',
          top: 3
        },
        $native: {
          backgroundColor: get(colors$1, 'surface.primary.colors.main')
        }
      },
      on: {}
    },
    indicator: {
      off: {
        $web: _objectSpread2({
          outline: 'none',
          backgroundColor: get(colors$1, 'palette.white02'),
          borderRadius: get(defaults$a, 'form.border.radius', 5) * 2,
          boxShadow: "0px 1px 3px ".concat(get(colors$1, 'opacity._50')),
          marginLeft: 0,
          cursor: 'pointer',
          height: height$1,
          width: width$1,
          position: 'absolute',
          top: 0,
          left: 0
        }, transition('left', 0.2))
      },
      on: {
        $web: {
          left: width$1,
          boxShadow: "1px 1px 3px ".concat(get(colors$1, 'opacity._50')),
          backgroundColor: get(colors$1, 'surface.primary.colors.main')
        }
      }
    },
    disabled: {
      opacity: 0.4
    }
  }
};
var switchClose = deepMerge(switchDefault, {
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
  checkGroup: checkGroup,
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

var defaults$b = getThemeDefaults();
var fontDefs = get(defaults$b, 'font', {
  components: {}
});
var compFontDefs = fontDefs.components;
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
  caption: _objectSpread2({
    color: colors$1.opacity._60,
    fontSize: 12,
    letterSpacing: 0.4
  }, compFontDefs.caption),
  h1: _objectSpread2({
    fontWeight: '300',
    fontSize: 40,
    letterSpacing: -1.5
  }, compFontDefs.h1),
  h2: _objectSpread2({
    fontWeight: '300',
    fontSize: 32,
    letterSpacing: -0.5
  }, compFontDefs.h2),
  h3: _objectSpread2({
    color: colors$1.opacity._60,
    fontSize: 28
  }, compFontDefs.h3),
  h4: _objectSpread2({
    fontSize: 24,
    letterSpacing: 0.25
  }, compFontDefs.h4),
  h5: _objectSpread2({
    fontSize: 20,
    marginBottom: margin.size
  }, compFontDefs.h5),
  h6: _objectSpread2({
    color: colors$1.opacity._60,
    fontSize: 16,
    letterSpacing: 0.15,
    fontWeight: '500'
  }, compFontDefs.h6),
  label: _objectSpread2({
    minWidth: '100%',
    fontSize: 14,
    letterSpacing: 0.15,
    fontWeight: '700',
    marginBottom: margin.size / 4
  }, compFontDefs.label),
  paragraph: _objectSpread2({
    fontSize: fontDefs.size || 16,
    letterSpacing: 0.5,
    marginBottom: margin.size,
    lineHeight: 20
  }, compFontDefs.paragraph),
  subtitle: _objectSpread2({
    fontSize: 14,
    letterSpacing: fontDefs.spacing || 0.15
  }, compFontDefs.subtitle)
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

export { Link as A, AppHeader, Button, Caption, Card, CheckGroup, Checkbox, Column, Divider, Drawer, FilePicker, Form, Grid, H1, H2, H3, H4, H5, H6, Icon, Image$1 as Image, Input$3 as Input, ItemHeader, Label, Link, Loading, Modal, Option, P, Radio, Row, ScrollView$1 as ScrollView, Section, Select$1 as Select, Subtitle, SvgIcon, Switch$1 as Switch, Text, TextBox, TextToggle, Touchable$1 as Touchable, TouchableIcon, View, isValidComponent, renderFromType, theme, useAnimate, useChildren, useChildrenWithRefs, useClassList, useClassName, useFromToAnimation, useInputHandlers, useMediaProps, usePressHandlers, useSelectHandlers, useSpin, useTextAccessibility, useThemePath, useThemeTypeAsClass, useThemeWithHeight, withTouch };
//# sourceMappingURL=kegComponents.native.js.map
