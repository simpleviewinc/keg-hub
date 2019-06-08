"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlObj = exports.objToUrlParams = exports.getUrlParams = exports.getUrlParamObj = void 0;

var _object = require("./object");

var getUrlParamObj = function getUrlParamObj(url) {
  var currentParams = {};
  var params = url.indexOf('?') !== -1 && url.split('?')[1];
  if (!params) return currentParams;
  var split = params.split('&');
  split.length && split.map(function (item) {
    var itemSplit = item.split('=');

    if (itemSplit.length === 2) {
      currentParams[decodeURIComponent(itemSplit[0])] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentParams;
};

exports.getUrlParamObj = getUrlParamObj;

var getUrlParams = function getUrlParams() {
  var params = window.location.search;
  return params.indexOf('?') === 0 ? params.slice(1) : params;
};

exports.getUrlParams = getUrlParams;

var objToUrlParams = function objToUrlParams(obj) {
  var firstSet;
  return (0, _object.reduceObj)(obj, function (key, value, urlStr) {
    if (!value) return urlStr;
    var useVal = isStr(value) ? value : (0, _object.isObj)(value) ? JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal)) : "".concat(urlStr, "&").concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal));
    firstSet = true;
    return urlStr;
  }, '');
};

exports.objToUrlParams = objToUrlParams;

var getUrlObj = function getUrlObj(url) {
  var urlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  var result = urlRegEx.exec(url || window.location.href);
  var attrs = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
  var urlData = attrs.reduce(function (data, attr) {
    if (typeof result[attr] === "undefined") result[attr] = "";
    if (result[attr] !== "" && (attrs[attr] === "port" || attrs[attr] === "slash")) result[attr] = ":".concat(result[attr]);
    data[attr] = result[attr];
    return data;
  }, {});
  urlData['path'] = "/" + urlData['path'];
  return urlData;
};

exports.getUrlObj = getUrlObj;