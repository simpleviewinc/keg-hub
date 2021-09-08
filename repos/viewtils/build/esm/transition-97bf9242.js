import { isObj, isStr, isNum, isArr } from '@keg-hub/jsutils';

const toRgb$1 = (red, green, blue, alpha) => {
  const obj = isObj(red) ? red : {
    r: red,
    g: green,
    b: blue,
    a: alpha
  };
  obj.a = !obj.a && obj.a !== 0 ? 1 : obj.a;
  return `rgba(${obj.r}, ${obj.g}, ${obj.b}, ${obj.a})`;
};

const hexToRgba$1 = (hex, opacity, asObj) => {
  if (!hex) return console.warn('Can not convert hex to rgba', hex) || `rgba(255,255,255,0)`;
  hex = hex.indexOf('#') === 0 ? hex.replace('#', '') : hex;
  hex = hex.length === 3 ? `${hex}${hex}` : hex;
  opacity = opacity > 1 ? (opacity / 100).toFixed(4) : opacity;
  const rgbaObj = {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
    a: !opacity && opacity !== 0 ? 1 : opacity
  };
  return asObj ? rgbaObj : toRgb$1(rgbaObj);
};

const mapOpacity = (opacity, color) => {
  for (let amount = 100; amount >= 0; amount -= 5) opacity[`_${amount}`] = opacity((amount / 100).toFixed(2), color);
  return opacity;
};
const opacity = mapOpacity((amount, color) => {
  return isStr(color) && color.indexOf('#') === 0 ? hexToRgba(color, amount) : isObj(color) ? toRgb(color, amount) : `rgba(${color || '0,0,0'}, ${amount})`;
});

const convertToPercent = (num, percent) => {
  return parseInt(num * (100 + percent) / 100);
};
const checkColorMax = num => num < 255 ? num : 255;
const convertToColor = (num, percent) => {
  const asPercent = convertToPercent(num, percent);
  const withMax = checkColorMax(asPercent);
  const asStr = withMax.toString(16);
  return asStr.length == 1 ? `0${asStr}` : asStr;
};
const shadeHex = (color, percent) => {
  const rgba = hexToRgba$1(color, 1, true);
  return '#' + convertToColor(rgba.r, percent) + convertToColor(rgba.g, percent) + convertToColor(rgba.b, percent);
};

const transition = (props = [], speed = 250, timingFunc = 'ease') => {
  speed = isNum(speed) ? `${speed}ms` : isStr(speed) ? speed : `250ms`;
  return isStr(props) ? {
    transition: `${props} ${speed} ${timingFunc}`
  } : isArr(props) ? {
    transition: props.reduce((trans, prop) => {
      trans.push(`${prop} ${speed} ${timingFunc}`);
      return trans;
    }, []).join(', ')
  } : null;
};

export { transition as a, hexToRgba$1 as h, opacity as o, shadeHex as s, toRgb$1 as t };
//# sourceMappingURL=transition-97bf9242.js.map
