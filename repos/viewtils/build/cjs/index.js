'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var cls = require('./cls-01b11ea5.js');
var transition = require('./transition-928d6430.js');
var scrollList = require('./scrollList-9966cc62.js');
var getTextFromChangeEvent = require('./getTextFromChangeEvent-590ad0cc.js');
var renderCustomOrDefault = require('./renderCustomOrDefault-afda50d9.js');
var jsutils = require('@keg-hub/jsutils');
require('react');

const logTypes = [`log`, `trace`, `debug`, `info`, `dir`, `warn`, `error`];
const Logger = (type, ...toLog) => {
  const method = logTypes.includes(type) ? type === `warn` ? `info` : type : toLog.unshift(type) && `log`;
  console[method] && console[method](...toLog);
};
logTypes.map(type => Logger[type] = (...toLog) => Logger(type, ...toLog));

const getQueryData = () => {
  var _document, _document$location;
  return typeof document === 'undefined' ? jsutils.noOpObj : jsutils.queryToObj((_document = document) === null || _document === void 0 ? void 0 : (_document$location = _document.location) === null || _document$location === void 0 ? void 0 : _document$location.search);
};

let IN_POP_STATE = false;
const listenToPopState = cb => {
  const listener = async event => {
    IN_POP_STATE = true;
    isFunc(cb) && (await cb(getQueryData() || jsutils.noOpObj));
    IN_POP_STATE = false;
  };
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
};
const inPopStateUpdate = () => IN_POP_STATE;

const getWindowProps = () => {
  return typeof window === "undefined" ? jsutils.noOpObj : (() => ({
    location: window.location,
    history: window.history
  }))();
};
const buildQuery = (current, update, merge) => {
  const query = merge ? { ...current,
    ...update
  } : update;
  return jsutils.objToQuery(query);
};
const updateUrlQuery = (update = jsutils.noOpObj, merge, listener) => {
  if (inPopStateUpdate()) return;
  const {
    location,
    history
  } = getWindowProps();
  const current = jsutils.queryToObj(location.search);
  history.pushState(jsutils.noOpObj, '', buildQuery(current, update, merge));
};

exports.cls = cls.cls;
exports.hexToRgba = transition.hexToRgba;
exports.opacity = transition.opacity;
exports.shadeHex = transition.shadeHex;
exports.toRgb = transition.toRgb;
exports.transition = transition.transition;
exports.ensureElement = scrollList.ensureElement;
exports.scrollList = scrollList.scrollList;
exports.getChecked = getTextFromChangeEvent.getChecked;
exports.getElementLayout = getTextFromChangeEvent.getElementLayout;
exports.getImgSrc = getTextFromChangeEvent.getImgSrc;
exports.getInputValueKey = getTextFromChangeEvent.getInputValueKey;
exports.getOnChangeHandler = getTextFromChangeEvent.getOnChangeHandler;
exports.getOnLoad = getTextFromChangeEvent.getOnLoad;
exports.getPlatform = getTextFromChangeEvent.getPlatform;
exports.getPressHandler = getTextFromChangeEvent.getPressHandler;
exports.getReadOnly = getTextFromChangeEvent.getReadOnly;
exports.getTarget = getTextFromChangeEvent.getTarget;
exports.getTextFromChangeEvent = getTextFromChangeEvent.getTextFromChangeEvent;
exports.getValueFromChildren = getTextFromChangeEvent.getValueFromChildren;
exports.handleRefUpdate = renderCustomOrDefault.handleRefUpdate;
exports.isValidComponent = renderCustomOrDefault.isValidComponent;
exports.renderCustomOrDefault = renderCustomOrDefault.renderCustomOrDefault;
exports.renderFromType = renderCustomOrDefault.renderFromType;
exports.Logger = Logger;
exports.getQueryData = getQueryData;
exports.inPopStateUpdate = inPopStateUpdate;
exports.listenToPopState = listenToPopState;
exports.updateUrlQuery = updateUrlQuery;
//# sourceMappingURL=index.js.map
