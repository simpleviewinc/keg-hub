import { isObj, isArr, isStr } from '@keg-hub/jsutils';

var convertToPercent = function convertToPercent(num, percent) {
  return parseInt(num * (100 + percent) / 100);
};
var checkColorMax = function checkColorMax(num) {
  return num < 255 ? num : 255;
};
var convertToColor = function convertToColor(num, percent) {
  var asPercent = convertToPercent(num, percent);
  var withMax = checkColorMax(asPercent);
  var asStr = withMax.toString(16);
  return asStr.length == 1 ? "0".concat(asStr) : asStr;
};
var mapOpacity = function mapOpacity(opacity) {
  for (var amount = 100; amount >= 0; amount -= 5) {
    opacity["_".concat(amount)] = opacity((amount / 100).toFixed(2));
  }
  return opacity;
};
var hexToRgba = function hexToRgba(hex, opacity, asObj) {
  if (!hex) return console.warn('Can not convert hex to rgba', hex) || "rgba(255,255,255,0)";
  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex;
  opacity = opacity > 1 ? (opacity / 100).toFixed(4) : opacity;
  var rgbaObj = {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity
  };
  return asObj ? rgbaObj : toRgb(rgbaObj);
};
var opacity = mapOpacity(function (amount, color) {
  return isStr(color) && color.indexOf('#') === 0 ? hexToRgba(color, amount) : isObj(color) ? toRgb(color, amount) : "rgba(".concat(color || '0,0,0', ", ").concat(amount, ")");
});
var shadeHex = function shadeHex(color, percent) {
  var rgba = hexToRgba(color, 1, true);
  return '#' + convertToColor(rgba.r, percent) + convertToColor(rgba.g, percent) + convertToColor(rgba.b, percent);
};
var toRgb = function toRgb(red, green, blue, alpha) {
  var obj = isObj(red) ? red : {
    r: red,
    g: green,
    b: blue,
    a: alpha
  };
  obj.a = !obj.a && obj.a !== 0 ? 1 : obj.a;
  return "rgba(".concat(obj.r, ", ").concat(obj.g, ", ").concat(obj.b, ", ").concat(obj.a, ")");
};
var transition = function transition() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
  var timingFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'ease';
  return typeof props === 'string' ? {
    transition: "".concat(props, " ").concat(speed, "ms ").concat(timingFunc)
  } : isArr(props) ? {
    transition: props.reduce(function (trans, prop) {
      trans.push("".concat(prop, " ").concat(speed, "ms ").concat(timingFunc));
      return trans;
    }, []).join(', ')
  } : null;
};

export { hexToRgba, opacity, shadeHex, toRgb, transition };
//# sourceMappingURL=colors.js.map
