"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlObj = exports.objToUrlParams = exports.getUrlParams = exports.getUrlParamObj = void 0;

var _object = require("./object");

const getUrlParamObj = url => {
  const currentParams = {};
  const params = url.indexOf('?') !== -1 && url.split('?')[1];
  if (!params) return currentParams;
  const split = params.split('&');
  split.length && split.map(item => {
    const itemSplit = item.split('=');

    if (itemSplit.length === 2) {
      currentParams[decodeURIComponent(itemSplit[0])] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentParams;
};

exports.getUrlParamObj = getUrlParamObj;

const getUrlParams = () => {
  let params = window.location.search;
  return params.indexOf('?') === 0 ? params.slice(1) : params;
};

exports.getUrlParams = getUrlParams;

const objToUrlParams = obj => {
  let firstSet;
  return (0, _object.reduceObj)(obj, (key, value, urlStr) => {
    if (!value) return urlStr;
    const useVal = isStr(value) ? value : (0, _object.isObj)(value) ? JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? `${encodeURIComponent(key)}=${encodeURIComponent(useVal)}` : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`;
    firstSet = true;
    return urlStr;
  }, '');
};

exports.objToUrlParams = objToUrlParams;

const getUrlObj = url => {
  const urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const result = urlRegEx.exec(url || window.location.href);
  const attrs = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
  const urlData = attrs.reduce((data, attr) => {
    if (typeof result[attr] === "undefined") result[attr] = "";
    if (result[attr] !== "" && (attrs[attr] === "port" || attrs[attr] === "slash")) result[attr] = `:${result[attr]}`;
    data[attr] = result[attr];
    return data;
  }, {});
  urlData['path'] = "/" + urlData['path'];
  return urlData;
};

exports.getUrlObj = getUrlObj;