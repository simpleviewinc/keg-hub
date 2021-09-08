import { isObj, isStr, isFunc, isArr, get } from '@keg-hub/jsutils';

const getChecked = (isWeb, isChecked) => {
  return {
    [isWeb ? 'checked' : 'value']: isChecked
  };
};

const getElementLayout = el => {
  const rect = el.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

const getImgSrc = (isWeb, src, source, uri) => {
  const imgSrc = src || source || uri;
  const key = isWeb ? 'src' : 'source';
  return {
    [key]: isWeb ? isObj(imgSrc) ? imgSrc.uri : imgSrc : isStr(imgSrc) ? {
      uri: imgSrc
    } : imgSrc
  };
};

const getInputValueKey = (isWeb, onChange, onValueChange, readOnly) => {
  return !isWeb ? 'selectedValue' : isFunc(onChange) || isFunc(onValueChange) || readOnly ? 'value' : 'defaultValue';
};
const getValueFromChildren = (value, children) => {
  return value ? value : children ? isArr(children) ? get(children, ['0', 'props', 'children']) : get(children, ['props', 'children']) : '';
};

const getOnChangeHandler = (isWeb, onChange, onValueChange) => {
  return {
    [isWeb ? 'onChange' : 'onValueChange']: onChange || onValueChange
  };
};

const getOnLoad = (isWeb, callback) => ({
  [isWeb ? 'onLoad' : 'onLoadEnd']: callback
});

const platform = process.env.RE_PLATFORM || process.env.PLATFORM || 'web';
const getPlatform = () => platform;

const getPressHandler = (isWeb, onClick, onPress) => {
  const action = onClick || onPress;
  return isFunc(action) && {
    [isWeb ? 'onClick' : 'onPress']: onClick || onPress
  } || {};
};

const getReadOnly = (isWeb, readOnly, disabled, editable = true) => {
  const key = isWeb ? 'disabled' : 'editable';
  const value = isWeb ? readOnly || disabled || !editable : !(readOnly || disabled || !editable);
  return {
    [key]: value
  };
};

const getTarget = (isWeb, target) => {
  return isWeb && target ? {
    target
  } : {};
};

const getTextFromChangeEvent = (isWeb, event) => {
  return isWeb ? get(event, 'target.value')
  : get(event, 'nativeEvent.text');
};

export { getElementLayout as a, getImgSrc as b, getInputValueKey as c, getValueFromChildren as d, getOnChangeHandler as e, getOnLoad as f, getChecked as g, getPlatform as h, getPressHandler as i, getReadOnly as j, getTarget as k, getTextFromChangeEvent as l };
//# sourceMappingURL=getTextFromChangeEvent-1e047a73.js.map
