'use strict';

var jsutils = require('@keg-hub/jsutils');

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
    [key]: isWeb ? jsutils.isObj(imgSrc) ? imgSrc.uri : imgSrc : jsutils.isStr(imgSrc) ? {
      uri: imgSrc
    } : imgSrc
  };
};

const getInputValueKey = (isWeb, onChange, onValueChange, readOnly) => {
  return !isWeb ? 'selectedValue' : jsutils.isFunc(onChange) || jsutils.isFunc(onValueChange) || readOnly ? 'value' : 'defaultValue';
};
const getValueFromChildren = (value, children) => {
  return value ? value : children ? jsutils.isArr(children) ? jsutils.get(children, ['0', 'props', 'children']) : jsutils.get(children, ['props', 'children']) : '';
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
  return jsutils.isFunc(action) && {
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
  return isWeb ? jsutils.get(event, 'target.value')
  : jsutils.get(event, 'nativeEvent.text');
};

exports.getChecked = getChecked;
exports.getElementLayout = getElementLayout;
exports.getImgSrc = getImgSrc;
exports.getInputValueKey = getInputValueKey;
exports.getOnChangeHandler = getOnChangeHandler;
exports.getOnLoad = getOnLoad;
exports.getPlatform = getPlatform;
exports.getPressHandler = getPressHandler;
exports.getReadOnly = getReadOnly;
exports.getTarget = getTarget;
exports.getTextFromChangeEvent = getTextFromChangeEvent;
exports.getValueFromChildren = getValueFromChildren;
//# sourceMappingURL=getTextFromChangeEvent-590ad0cc.js.map
