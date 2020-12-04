'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
var colors$3 = require('./colors-3022218c.js');
var themeDefaults = require('./themeDefaults-f48ffcaf.js');
var buildColorStyles = require('./buildColorStyles.js');
require('./getPlatform-ec53cd5e.js');
require('./platformFlatten.js');
var inheritFrom = require('./inheritFrom.js');
var buildTheme = require('./buildTheme.js');
require('react');

var __transition;
var clearTransitionStyles = function clearTransitionStyles() {
  return __transition = undefined;
};
var transition = function transition() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  if (__transition) return __transition;
  __transition = function __transition() {
    var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1s';
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
    prop = jsutils.isArr(prop) ? prop : [prop];
    amount = jsutils.isNum(amount) && "".concat(amount, "s") || amount;
    return {
      transitionProperty: prop.map(jsutils.trainCase),
      transitionDuration: amount,
      transitionTimingFunction: type
    };
  };
  __transition.move = function () {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
    return {
      transition: "transform ".concat(amount, "s ").concat(type)
    };
  };
  __transition.opacity = function () {
    var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
    return {
      transition: "opacity ".concat(amount, "s ").concat(type)
    };
  };
  __transition.maxHeight = {
    overflow: 'hidden',
    transition: 'max-height 1s ease'
  };
  return jsutils.checkCall(config.transition, __transition) || Object.assign(__transition, config.transition);
};

var containedInit = function containedInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      states = _getThemeDefaults.states;
  var __transition = transition(config);
  var containedStyles = function containedStyles(state, colorType) {
    var opacity = jsutils.get(states, "types.".concat(state, ".opacity"));
    var shade = jsutils.get(states, "types.".concat(state, ".shade"));
    var activeColor = jsutils.get(colors, "surface.".concat(colorType, ".colors.").concat(shade));
    var defStyles = {
      main: {
        $all: {
          borderWidth: 0,
          borderRadius: 4,
          backgroundColor: activeColor,
          padding: 9,
          minHeight: 35,
          opacity: opacity
        },
        $web: _rollupPluginBabelHelpers._objectSpread2({
          cursor: state === 'disabled' ? 'not-allowed' : 'pointer',
          boxShadow: 'none'
        }, __transition(['backgroundColor', 'borderColor'], 0.3)),
        $native: {}
      },
      content: {
        color: state === 'disabled' ? jsutils.get(colors, 'opacity._50') : jsutils.get(colors, 'palette.white01'),
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5,
        textAlign: 'center',
        $web: _rollupPluginBabelHelpers._objectSpread2({}, __transition(['color'], 0.15))
      }
    };
    var custom = jsutils.get(config, 'button.contained');
    return jsutils.checkCall(custom, defStyles, state, colorType) || jsutils.deepMerge(defStyles, custom);
  };
  return buildTheme.buildTheme(containedStyles);
};

var textInit = function textInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var contained = arguments.length > 1 ? arguments[1] : undefined;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      states = _getThemeDefaults.states;
  var textStyle = function textStyle(state, colorType) {
    var shade = jsutils.get(states, "types.".concat(state, ".shade"));
    var activeColor = jsutils.get(colors, "surface.".concat(colorType, ".colors.").concat(shade));
    var defStyles = {
      main: {
        $all: {
          backgroundColor: state === 'hover' ? colors.opacity(10, activeColor) : jsutils.get(colors, 'palette.transparent')
        }
      },
      content: {
        $all: {
          color: activeColor
        }
      }
    };
    var custom = jsutils.get(config, 'button.text');
    return jsutils.checkCall(custom, defStyles, state, colorType) || jsutils.deepMerge(defStyles, custom);
  };
  return buildTheme.buildTheme(textStyle, {
    inheritFrom: [contained]
  });
};

var outlineInit = function outlineInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var contained = arguments.length > 1 ? arguments[1] : undefined;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      states = _getThemeDefaults.states;
  var outlineStyles = function outlineStyles(state, colorType) {
    var stateShade = states.types[state].shade;
    var activeColor = jsutils.get(colors, "surface.".concat(colorType, ".colors.").concat(stateShade));
    var defStyles = {
      main: {
        $all: {
          padding: 8,
          borderWidth: 1,
          borderColor: activeColor,
          backgroundColor: state === 'hover' ? colors.opacity(10, activeColor) : jsutils.get(colors, 'palette.white01')
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
    var custom = jsutils.get(config, 'button.outline');
    return jsutils.checkCall(custom, defStyles, state, colorType) || jsutils.deepMerge(defStyles, custom);
  };
  return buildTheme.buildTheme(outlineStyles, {
    inheritFrom: [contained]
  });
};

var button = function button(config) {
  var contained = containedInit(config);
  return {
    button: {
      contained: contained,
      text: textInit(config, contained),
      outline: outlineInit(config, contained)
    }
  };
};

var __flex;
var clearFlexStyles = function clearFlexStyles() {
  return __flex = undefined;
};
var flex = function flex() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  if (__flex) return __flex;
  __flex = {
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
  __flex.direction.row = {
    flexDirection: 'row'
  };
  __flex.direction.column = {
    flexDirection: 'column'
  };
  __flex.row = __flex.direction.row;
  __flex.column = __flex.direction.column;
  __flex.justify.start = {
    justifyContent: 'flex-start'
  };
  __flex.justify.end = {
    justifyContent: 'flex-end'
  };
  __flex.justify.center = {
    justifyContent: 'center'
  };
  __flex.justify.between = {
    justifyContent: 'space-between'
  };
  __flex.justify.around = {
    justifyContent: 'space-around'
  };
  __flex.justify.even = {
    justifyContent: 'space-evenly'
  };
  __flex.align.start = {
    alignItems: 'flex-start'
  };
  __flex.align.end = {
    alignItems: 'flex-end'
  };
  __flex.align.center = {
    alignItems: 'center'
  };
  __flex.align.stretch = {
    alignItems: 'stretch'
  };
  __flex.align.base = {
    alignItems: 'baseline'
  };
  return jsutils.checkCall(config.display, __flex) || jsutils.deepMerge(__flex, config.flex);
};

var __helpers;
var clearHelpersStyles = function clearHelpersStyles() {
  return __helpers = undefined;
};
var spaceHelper = function spaceHelper(amount) {
  var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noPropArr;
  var type = arguments.length > 2 ? arguments[2] : undefined;
  var defaults = themeDefaults.getThemeDefaults();
  sides = sides.length && sides || defaults.layout.sides;
  if (sides === 'all' || jsutils.isArr(sides) && sides[0] === 'all') sides = defaults.layout.sides;
  return sides.reduce(function (styles, side) {
    styles["".concat(type).concat(jsutils.capitalize(side))] = unitsHelper(amount);
    return styles;
  }, {});
};
var unitsHelper = function unitsHelper(value) {
  var defaults = themeDefaults.getThemeDefaults();
  if (!jsutils.isStr(value) && !jsutils.isNum(value)) return value;
  if (jsutils.isStr(value)) {
    var amount = parseInt(value);
    if ((amount || amount === 0) && amount.toString() === value) value += defaults.font.units;
  } else value += defaults.font.units;
  return value;
};
var align = function align(dir) {
  return jsutils.isStr(dir) && {
    textAlign: dir
  } || {};
};
var background = function background(color) {
  return {
    backgroundColor: colors[color] || color || ''
  };
};
var bold = function bold() {
  var _getThemeDefaults, _getThemeDefaults$fon;
  return {
    fontWeight: (_getThemeDefaults = themeDefaults.getThemeDefaults()) === null || _getThemeDefaults === void 0 ? void 0 : (_getThemeDefaults$fon = _getThemeDefaults.font) === null || _getThemeDefaults$fon === void 0 ? void 0 : _getThemeDefaults$fon.bold
  };
};
var color = function color(_color) {
  var _getThemeDefaults2 = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults2.colors;
  return colors[_color] ? {
    color: colors[_color]
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
  return prop && _rollupPluginBabelHelpers._defineProperty({}, prop, 'initial');
};
var abs = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var helpers = function helpers() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  if (__helpers) return __helpers;
  __helpers = jsutils.deepMerge({
    abs: abs,
    align: align,
    background: background,
    bold: bold,
    color: color,
    initial: initial,
    size: size,
    weight: weight
  }, config.helpers);
  return __helpers;
};

var containedInit$1 = function containedInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      margin = _getThemeDefaults.margin,
      padding = _getThemeDefaults.padding;
  var opacity05 = jsutils.get(colors, 'opacity._5');
  var colorPalette = jsutils.get(colors, 'palette');
  var __flex = flex(config);
  var __helpers = helpers(config);
  var section = {
    main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, __flex.left), __flex.column), {}, {
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
      color: jsutils.get(colors, 'opacity._65'),
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
  var defStyles = {
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
    footer: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section), {}, {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section.main), {}, {
        paddingTop: padding.size / 2,
        paddingBottom: 0,
        marginBottom: 0,
        borderTopWidth: 1,
        borderBottomWidth: 0
      }),
      text: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section.text), {}, {
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
          color: jsutils.get(colors, 'opacity._40'),
          fontWeight: '800'
        },
        subtitle: {
          fontSize: 13,
          marginBottom: margin.size,
          color: jsutils.get(colors, 'opacity._40'),
          fontWeight: '400'
        }
      },
      overlay: _rollupPluginBabelHelpers._objectSpread2({
        flex: 1,
        alignItems: 'center',
        backgroundColor: opacity05,
        alignSelf: 'stretch',
        justifyContent: 'center'
      }, __helpers.abs)
    }
  };
  var custom = jsutils.get(config, 'button.contained');
  return jsutils.checkCall(custom, defStyles) || jsutils.deepMerge(defStyles, custom);
};

var card = function card(config) {
  var contained = containedInit$1(config);
  return {
    card: {
      contained: contained,
      default: contained
    }
  };
};

var divider = function divider() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      margin = _getThemeDefaults.margin;
  var defStyles = {
    $all: {
      width: '100%',
      backgroundColor: colors.opacity._15,
      marginBottom: margin.size,
      marginTop: margin.size / 3,
      height: 1
    },
    $native: {
      hairlineWidth: 1
    }
  };
  return {
    divider: jsutils.checkCall(config.divider, defStyles) || jsutils.deepMerge(defStyles, config.divider)
  };
};

var drawer = function drawer() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
    main: {
      overflow: 'hidden',
      width: "100%"
    }
  };
  return {
    drawer: jsutils.checkCall(config.drawer, defStyles) || jsutils.deepMerge(defStyles, config.drawer)
  };
};

var filePicker = function filePicker() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
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
  return {
    filePicker: jsutils.checkCall(config.filePicker, defStyles) || jsutils.deepMerge(defStyles, config.filePicker)
  };
};

var iconInit = function iconInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
    default: {
      container: {},
      icon: {}
    }
  };
  return {
    icon: jsutils.checkCall(config.icon, defStyles) || jsutils.deepMerge(defStyles, config.icon)
  };
};

var icon = function icon(config) {
  return iconInit(config);
};

var image = function image() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var colorPalette = jsutils.get(colors, 'palette');
  var __transition = transition(config);
  var defStyles = {
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
          background: colorPalette.white03
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
            color: colorPalette.gray02
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
        $web: _rollupPluginBabelHelpers._objectSpread2({}, __transition('opacity', 0.8))
      },
      hover: {}
    }
  };
  return {
    image: jsutils.checkCall(config.image, defStyles) || jsutils.deepMerge(defStyles, config.image)
  };
};

var indicator = function indicator() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
    minWidth: 36,
    position: 'relative'
  };
  var defStyles = {
    default: {
      container: container,
      icon: {
        color: jsutils.get(colors, 'surface.default.colors.main')
      }
    },
    primary: {
      container: container,
      icon: {
        color: jsutils.get(colors, 'surface.primary.colors.main')
      }
    },
    secondary: {
      container: container,
      icon: {
        color: jsutils.get(colors, 'surface.secondary.colors.main')
      }
    },
    warn: {
      container: container,
      icon: {
        color: jsutils.get(colors, 'surface.warn.colors.main')
      }
    },
    danger: {
      container: container,
      icon: {
        color: jsutils.get(colors, 'surface.danger.colors.main')
      }
    }
  };
  return {
    indicator: jsutils.checkCall(config.indicator, defStyles) || jsutils.deepMerge(defStyles, config.indicator)
  };
};

var link = function link() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var defStyles = {
    default: {
      $all: {
        color: colors.palette.blue01,
        textDecorationLine: 'underline',
        textDecorationColor: colors.palette.blue02
      }
    },
    hover: {
      $all: {
        color: colors.palette.blue02,
        textDecorationColor: colors.palette.blue02
      }
    }
  };
  return {
    link: jsutils.checkCall(config.link, defStyles) || jsutils.deepMerge(defStyles, config.link)
  };
};

var loading = function loading() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var colorPalette = jsutils.get(colors, 'palette');
  var styles = {
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
        color: colorPalette.gray02
      }
    }
  };
  return {
    loading: buildColorStyles.buildSurfaceStyles(function (colorType, surfaces) {
      var surfaceStyles = jsutils.deepClone(styles);
      jsutils.set(surfaceStyles, 'indicator.icon.color', jsutils.get(surfaces, "".concat(colorType, ".colors.main")));
      return jsutils.checkCall(config.loading, surfaceStyles) || jsutils.deepMerge(surfaceStyles, config.loading);
    })
  };
};

var section = function section() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors,
      margin = _getThemeDefaults.margin,
      padding = _getThemeDefaults.padding;
  var defStyles = {
    default: {
      $native: {
        shadowColor: colors.opacity._05,
        shadowOffset: {
          height: 0,
          width: 0
        },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 1
      },
      $web: {
        boxShadow: "1px 1px 5px ".concat(colors.opacity._05)
      },
      $all: {
        backgroundColor: colors.palette.white01,
        borderColor: colors.palette.gray01,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: padding.size,
        margin: margin.size,
        marginBottom: 0,
        minHeight: 200
      }
    }
  };
  return {
    section: jsutils.checkCall(config.section, defStyles) || jsutils.deepMerge(defStyles, config.section)
  };
};

var containedInit$2 = function containedInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var surface = colors.surface,
      palette = colors.palette;
  var defStyles = {
    default: {
      $all: {
        main: {
          minHeight: 100,
          width: 250,
          padding: 5,
          backgroundColor: jsutils.get(surface, 'default.colors.light'),
          display: 'flex',
          flexDirection: 'column'
        },
        content: {
          wrapper: {
            display: 'flex',
            marginRight: 10,
            flex: 1,
            flexWrap: 'wrap'
          },
          text: {
            color: jsutils.get(palette, 'black03'),
            fontWeight: 'bold',
            fontSize: 10
          },
          clipboard: {
            opacity: 0.7,
            right: 0,
            top: 0,
            margin: 3,
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
  var custom = jsutils.get(config, 'textBox.contained');
  return jsutils.checkCall(custom, defStyles) || jsutils.deepMerge(defStyles, custom);
};

var outlinedInit = function outlinedInit() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var contained = arguments.length > 1 ? arguments[1] : undefined;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var surface = colors.surface;
  var defStyles = {
    default: {
      $all: {
        main: {
          borderWidth: 2,
          borderRadius: 2,
          borderColor: jsutils.get(surface, 'default.colors.main')
        }
      }
    }
  };
  var custom = jsutils.get(config, 'textBox.outlined');
  var outlined = jsutils.checkCall(custom, defStyles) || jsutils.deepMerge(defStyles, custom);
  outlined.default = inheritFrom.inheritFrom(contained.default, outlined.default);
  return outlined;
};

var textBox = function textBox(config) {
  var contained = containedInit$2(config);
  return {
    textBox: {
      contained: contained,
      outlined: outlinedInit(config, contained)
    }
  };
};

var modal = function modal() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var __helpers = helpers(config);
  var __flex = flex(config);
  var defStyles = {
    default: {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
        zIndex: 9998
      }, __flex.center), {}, {
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        alignItems: 'stretch'
      }),
      backdrop: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, __helpers.abs), {}, {
        backgroundColor: 'rgba(1,1,1,0.2)'
      }),
      content: {
        $xsmall: {
          position: 'absolute',
          zIndex: 9999,
          alignSelf: 'center',
          backgroundColor: colors.palette.white01
        },
        $medium: {
          maxWidth: '80%'
        }
      }
    }
  };
  return {
    modal: jsutils.checkCall(config.modal, defStyles) || jsutils.deepMerge(defStyles, config.modal)
  };
};

var itemHeader = function itemHeader() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var colorPalette = jsutils.get(colors, 'palette');
  var colorSurface = jsutils.get(colors, 'surface');
  var __flex = flex(config);
  var defaultSectionStyle = {
    height: '100%',
    backgroundColor: 'transparent'
  };
  var sideContentMainStyle = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultSectionStyle), {}, {
    justifyContent: 'center',
    paddingLeft: 0
  });
  var defaultSideSectionStyle = {
    main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, defaultSectionStyle), {}, {
      flexDirection: 'row',
      maxWidth: '20%'
    }, __flex.align.center),
    content: {
      button: {
        main: _rollupPluginBabelHelpers._objectSpread2({}, sideContentMainStyle)
      },
      main: _rollupPluginBabelHelpers._objectSpread2({}, sideContentMainStyle),
      icon: {
        paddingHorizontal: 10,
        color: '#111111',
        fontSize: 30
      }
    }
  };
  var defStyles = {
    main: {
      $all: {
        position: 'relative',
        justifyContent: 'center',
        backgroundColor: jsutils.get(colorSurface, 'primary.colors.dark'),
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
        backgroundColor: jsutils.get(colorSurface, 'primary.colors.dark'),
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
        main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, __flex.left), defaultSideSectionStyle.main),
        content: defaultSideSectionStyle.content
      },
      right: {
        main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, __flex.right), defaultSideSectionStyle.main),
        content: defaultSideSectionStyle.content
      },
      center: {
        main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, __flex.center), defaultSectionStyle), {}, {
          width: '60%'
        }),
        content: {
          title: {
            color: colorPalette.white01
          }
        }
      }
    }
  };
  return {
    itemHeader: jsutils.checkCall(config.itemHeader, defStyles) || jsutils.deepMerge(defStyles, config.itemHeader)
  };
};

var header = function header(config) {
  return {
    header: _rollupPluginBabelHelpers._objectSpread2({}, itemHeader(config))
  };
};

var textToggle = function textToggle() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
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
  return {
    textToggle: jsutils.checkCall(config.textToggle, defStyles) || jsutils.deepMerge(defStyles, config.textToggle)
  };
};

var components = function components(config) {
  return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, button(config)), card(config)), divider(config)), drawer(config)), filePicker(config)), icon(config)), image(config)), indicator(config)), link(config)), loading(config)), section(config)), textBox(config)), modal(config)), header(config)), textToggle(config));
};

var display = function display() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
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
  return jsutils.checkCall(config.display, defStyles) || jsutils.deepMerge(defStyles, config.display);
};

var form = function form() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
    default: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  };
  return jsutils.checkCall(config.form, defStyles) || jsutils.deepMerge(defStyles, config.form);
};

var checkbox = function checkbox(config) {
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      form = _getThemeDefaults.form,
      colors = _getThemeDefaults.colors;
  var height = jsutils.get(form, 'checkbox.height', 20);
  var width = jsutils.get(form, 'checkbox.width', 20);
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
            backgroundColor: jsutils.get(colors, 'palette.gray01')
          },
          $web: {
            outline: 'none',
            height: '100%',
            width: '100%',
            position: 'absolute',
            boxShadow: "inset 0px 0px 5px ".concat(jsutils.get(colors, 'opacity._15')),
            borderRadius: jsutils.get(form, 'border.radius', 5)
          }
        },
        on: {
          $all: {
            backgroundColor: jsutils.get(colors, 'surface.primary.colors.main')
          }
        }
      },
      indicator: {
        off: {
          $web: {
            color: jsutils.get(colors, 'palette.white02')
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
  };
  var checkboxClose = jsutils.deepMerge(checkboxDefault, {
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
  var defStyles = {
    default: checkboxDefault,
    close: checkboxClose,
    disabled: checkboxDisabled
  };
  return jsutils.checkCall(config.checkbox, defStyles) || jsutils.deepMerge(defStyles, config.checkbox);
};

var checkGroup = function checkGroup() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var header = {
    $all: {
      $xsmall: {
        width: '70%',
        color: colors.lightGray,
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
  var defStyles = {
    main: {},
    header: header,
    simpleHeader: simpleHeader
  };
  return jsutils.checkCall(config.checkGroup, defStyles) || jsutils.deepMerge(defStyles, config.checkGroup);
};

var initSharedForm = function initSharedForm(config) {
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      form = _getThemeDefaults.form,
      padding = _getThemeDefaults.padding,
      colors = _getThemeDefaults.colors;
  return {
    inputs: {
      backgroundColor: colors.palette.white01,
      minWidth: 100,
      overflow: 'hidden',
      height: jsutils.get(form, 'input.height', 35),
      padding: padding.size / 2
    },
    border: {
      borderRadius: 5,
      borderWidth: 1,
      borderTopColor: "".concat(colors.palette.gray01),
      borderLeftColor: "".concat(colors.palette.gray01),
      borderRightColor: "".concat(colors.palette.gray01),
      borderBottomColor: "".concat(colors.palette.gray02),
      borderStyle: 'solid'
    }
  };
};

var input = function input() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var sharedForm = initSharedForm();
  var defStyles = {
    default: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sharedForm.border), sharedForm.inputs), {}, {
      width: '100%'
    })
  };
  return jsutils.checkCall(config.input, defStyles) || jsutils.deepMerge(defStyles, config.input);
};

var option = function option(config) {
  var defStyles = {};
  return jsutils.checkCall(config.option, defStyles) || jsutils.deepMerge(defStyles, config.option);
};

var radio = function radio() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {};
  return jsutils.checkCall(config.radio, defStyles) || jsutils.deepMerge(defStyles, config.radio);
};

var select = function select() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var sharedForm = initSharedForm();
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      colors = _getThemeDefaults.colors;
  var defStyles = {
    default: {
      main: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
        position: 'relative'
      }, sharedForm.border), sharedForm.inputs), {}, {
        padding: 0,
        overflow: 'none'
      }),
      select: {
        $web: _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, sharedForm.inputs), {}, {
          borderWidth: 0,
          appearance: 'none',
          backgroundColor: colors.palette.transparent
        })
      },
      icon: {
        container: {
          color: colors.opacity._85,
          position: 'absolute',
          zIndex: 1,
          right: 10,
          top: 10,
          pointerEvents: 'none'
        },
        icon: {
          color: colors.opacity._85,
          fontSize: 15
        },
        disabled: {
          color: colors.opacity._30
        }
      }
    }
  };
  return jsutils.checkCall(config.select, defStyles) || jsutils.deepMerge(defStyles, config.select);
};

var switchStyles = function switchStyles() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      form = _getThemeDefaults.form,
      colors = _getThemeDefaults.colors;
  var height = jsutils.get(form, 'switch.height', 20);
  var width = jsutils.get(form, 'switch.width', 20);
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
            backgroundColor: jsutils.get(colors, 'palette.gray01'),
            boxShadow: "inset 0px 0px 5px ".concat(jsutils.get(colors, 'opacity._15')),
            borderRadius: jsutils.get(form, 'border.radius', 5) * 2,
            height: '70%',
            width: '100%',
            position: 'absolute',
            top: 3
          },
          $native: {
            backgroundColor: jsutils.get(colors, 'surface.primary.colors.main')
          }
        },
        on: {}
      },
      indicator: {
        off: {
          $web: _rollupPluginBabelHelpers._objectSpread2({
            outline: 'none',
            backgroundColor: jsutils.get(colors, 'palette.white02'),
            borderRadius: jsutils.get(form, 'border.radius', 5) * 2,
            boxShadow: "0px 1px 3px ".concat(jsutils.get(colors, 'opacity._50')),
            marginLeft: 0,
            cursor: 'pointer',
            height: height,
            width: width,
            position: 'absolute',
            top: 0,
            left: 0
          }, transition('left', 0.2))
        },
        on: {
          $web: {
            left: width,
            boxShadow: "1px 1px 3px ".concat(jsutils.get(colors, 'opacity._50')),
            backgroundColor: jsutils.get(colors, 'surface.primary.colors.main')
          }
        }
      },
      disabled: {
        opacity: 0.4
      }
    }
  };
  var switchClose = jsutils.deepMerge(switchDefault, {
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
  var defStyles = {
    default: switchDefault,
    close: switchClose
  };
  return jsutils.checkCall(config.switch, defStyles) || jsutils.deepMerge(defStyles, config.switch);
};

var form$1 = function form$1(config) {
  return {
    checkbox: checkbox(config),
    checkGroup: checkGroup(config),
    form: form(config),
    input: input(config),
    option: option(config),
    radio: radio(config),
    select: select(config),
    switch: switchStyles(config)
  };
};

var layout = function layout() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
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
  return jsutils.checkCall(config.layout, defStyles) || jsutils.deepMerge(defStyles, config.layout);
};

var transform = function transform() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var defStyles = {
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
  return jsutils.checkCall(config.transform, defStyles) || jsutils.deepMerge(defStyles, config.transform);
};

var typography = function typography() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var _getThemeDefaults = themeDefaults.getThemeDefaults(),
      font = _getThemeDefaults.font,
      colors = _getThemeDefaults.colors,
      margin = _getThemeDefaults.margin;
  var fontDefs = font || {
    components: {}
  };
  var compFontDefs = fontDefs.components;
  var defStyles = {
    font: {
      family: {
        $native: {},
        $web: {
          fontFamily: fontDefs.family || 'Verdana, Geneva, sans-serif'
        }
      }
    },
    default: {
      color: colors.opacity._85,
      fontSize: fontDefs.size || 16,
      letterSpacing: fontDefs.spacing || 0.15,
      margin: 0
    },
    caption: _rollupPluginBabelHelpers._objectSpread2({
      color: colors.opacity._60,
      fontSize: 12,
      letterSpacing: 0.4
    }, compFontDefs.caption),
    h1: _rollupPluginBabelHelpers._objectSpread2({
      fontWeight: '300',
      fontSize: 40,
      letterSpacing: -1.5
    }, compFontDefs.h1),
    h2: _rollupPluginBabelHelpers._objectSpread2({
      fontWeight: '300',
      fontSize: 32,
      letterSpacing: -0.5
    }, compFontDefs.h2),
    h3: _rollupPluginBabelHelpers._objectSpread2({
      color: colors.opacity._60,
      fontSize: 28
    }, compFontDefs.h3),
    h4: _rollupPluginBabelHelpers._objectSpread2({
      fontSize: 24,
      letterSpacing: 0.25
    }, compFontDefs.h4),
    h5: _rollupPluginBabelHelpers._objectSpread2({
      fontSize: 20
    }, compFontDefs.h5),
    h6: _rollupPluginBabelHelpers._objectSpread2({
      color: colors.opacity._60,
      fontSize: 16,
      letterSpacing: 0.15,
      fontWeight: '500'
    }, compFontDefs.h6),
    label: _rollupPluginBabelHelpers._objectSpread2({
      minWidth: '100%',
      fontSize: 14,
      letterSpacing: 0.15,
      fontWeight: '700',
      marginBottom: margin.size / 4
    }, compFontDefs.label),
    paragraph: _rollupPluginBabelHelpers._objectSpread2({
      fontSize: fontDefs.size || 16,
      letterSpacing: 0.5
    }, compFontDefs.paragraph),
    subtitle: _rollupPluginBabelHelpers._objectSpread2({
      fontSize: 14,
      letterSpacing: fontDefs.spacing || 0.15
    }, compFontDefs.subtitle)
  };
  return jsutils.checkCall(config.typography, defStyles) || jsutils.deepMerge(defStyles, config.typography);
};

var __margin;
var clearMargin = function clearMargin() {
  return __margin = undefined;
};
var margin = function margin(defaults) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOpObj;
  var size = jsutils.get(defaults, 'layout.margin');
  __margin = function __margin(amount) {
    var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return spaceHelper(amount, sides, 'margin');
  };
  __margin.size = size;
  __margin.full = {
    margin: size
  };
  __margin.all = __margin.full;
  __margin.vert = {
    marginLeft: size,
    marginRight: size
  };
  __margin.left = {
    marginLeft: size
  };
  __margin.right = {
    marginRight: size
  };
  __margin.hor = {
    marginTop: size,
    marginBottom: size
  };
  __margin.top = {
    marginTop: size
  };
  __margin.bottom = {
    marginBottom: size
  };
  return Object.assign(__margin, config.margin);
};

var __padding;
var clearPadding = function clearPadding() {
  return __padding = undefined;
};
var padding = function padding(defaults) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOpObj;
  var size = jsutils.get(defaults, 'layout.padding');
  __padding = function __padding(amount) {
    var sides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return spaceHelper(amount, sides, 'padding');
  };
  __padding.size = size;
  __padding.full = {
    padding: size
  };
  __padding.all = __padding.full;
  __padding.vert = {
    paddingLeft: size,
    paddingRight: size
  };
  __padding.left = {
    paddingLeft: size
  };
  __padding.right = {
    paddingRight: size
  };
  __padding.hor = {
    paddingTop: size,
    paddingBottom: size
  };
  __padding.top = {
    paddingTop: size
  };
  __padding.bottom = {
    paddingBottom: size
  };
  return Object.assign(__padding, config.padding);
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
var colors$1 = {
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
var layout$1 = {
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
var form$2 = {
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
var modal$1 = {
	width: 600
};
var defaults = {
	states: states,
	colors: colors$1,
	layout: layout$1,
	font: font,
	form: form$2,
	modal: modal$1
};

var clearThemeStyles = function clearThemeStyles() {
  clearMargin();
  clearPadding();
  clearFlexStyles();
  colors$3.clearColorsStyles();
  clearHelpersStyles();
  clearTransitionStyles();
  themeDefaults.setThemeDefaults();
};
var buildThemeDefaults = function buildThemeDefaults() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  clearThemeStyles();
  var themeDefaults$1 = jsutils.deepMerge(defaults, config.defaults);
  themeDefaults$1.colors = colors$3.colors(themeDefaults$1, config);
  themeDefaults$1.margin = margin(themeDefaults$1, config);
  themeDefaults$1.padding = padding(themeDefaults$1, config);
  themeDefaults.setThemeDefaults(themeDefaults$1);
  return themeDefaults.getThemeDefaults();
};

var theme = function theme() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOpObj;
  var tapTheme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOpObj;
  var defaults = buildThemeDefaults(config);
  return jsutils.deepMerge(_rollupPluginBabelHelpers._objectSpread2({
    colors: defaults.colors,
    margin: defaults.margin,
    padding: defaults.padding,
    form: form$1(config),
    flex: flex(config),
    layout: layout(config),
    helpers: helpers(config),
    display: display(config),
    transform: transform(config),
    transition: transition(config),
    typography: typography(config)
  }, components(config)), tapTheme);
};

exports.theme = theme;
//# sourceMappingURL=theme.js.map
