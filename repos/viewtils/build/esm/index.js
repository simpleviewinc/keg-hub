export { c as cls } from './cls-afe5abea.js';
export { h as hexToRgba, o as opacity, s as shadeHex, t as toRgb, a as transition } from './transition-97bf9242.js';
export { e as ensureElement, s as scrollList } from './scrollList-6fd189b5.js';
export { g as getChecked, a as getElementLayout, b as getImgSrc, c as getInputValueKey, e as getOnChangeHandler, f as getOnLoad, h as getPlatform, i as getPressHandler, j as getReadOnly, k as getTarget, l as getTextFromChangeEvent, d as getValueFromChildren } from './getTextFromChangeEvent-1e047a73.js';
export { h as handleRefUpdate, i as isValidComponent, a as renderCustomOrDefault, r as renderFromType } from './renderCustomOrDefault-18a045e4.js';
import { noOpObj, queryToObj, objToQuery } from '@keg-hub/jsutils';
import 'react';

const logTypes = [`log`, `trace`, `debug`, `info`, `dir`, `warn`, `error`];
const Logger = (type, ...toLog) => {
  const method = logTypes.includes(type) ? type === `warn` ? `info` : type : toLog.unshift(type) && `log`;
  console[method] && console[method](...toLog);
};
logTypes.map(type => Logger[type] = (...toLog) => Logger(type, ...toLog));

const getQueryData = () => {
  var _document, _document$location;
  return typeof document === 'undefined' ? noOpObj : queryToObj((_document = document) === null || _document === void 0 ? void 0 : (_document$location = _document.location) === null || _document$location === void 0 ? void 0 : _document$location.search);
};

let IN_POP_STATE = false;
const listenToPopState = cb => {
  const listener = async event => {
    IN_POP_STATE = true;
    isFunc(cb) && (await cb(getQueryData() || noOpObj));
    IN_POP_STATE = false;
  };
  window.addEventListener('popstate', listener);
  return () => window.removeEventListener('popstate', listener);
};
const inPopStateUpdate = () => IN_POP_STATE;

const getWindowProps = () => {
  return typeof window === "undefined" ? noOpObj : (() => ({
    location: window.location,
    history: window.history
  }))();
};
const buildQuery = (current, update, merge) => {
  const query = merge ? { ...current,
    ...update
  } : update;
  return objToQuery(query);
};
const updateUrlQuery = (update = noOpObj, merge, listener) => {
  if (inPopStateUpdate()) return;
  const {
    location,
    history
  } = getWindowProps();
  const current = queryToObj(location.search);
  history.pushState(noOpObj, '', buildQuery(current, update, merge));
};

export { Logger, getQueryData, inPopStateUpdate, listenToPopState, updateUrlQuery };
//# sourceMappingURL=index.js.map
