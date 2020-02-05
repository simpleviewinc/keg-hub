/** @module url */
'use strict';

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidUrl = exports.objToQuery = exports.queryToObj = void 0;

var _object = require("./object");

var _string = require("./string");

var _number = require("./number");

var _boolean = require("./boolean");

var _collection = require("./collection");

var _array = require("./array");

var queryToObj = function queryToObj(string) {
  var currentQueryItems = {};
  var stringSplit = string.split('?');
  var querystring = stringSplit[stringSplit.length - 1];
  if (!querystring) return currentQueryItems;
  var split = querystring.split('&');
  split.length && split.map(function (item) {
    var components = item.split('=');
    if (components.length <= 1) return currentQueryItems; // split on the first instance of '=', so we join the rest if any

    var itemSplit = [components.shift(), components.join('=')];

    if (itemSplit.length === 2) {
      // if the value contains special char ',' then make it into an array
      var array = decodeURIComponent(itemSplit[1]).split(',');
      if (array && array.length > 1) currentQueryItems[itemSplit[0]] = array; // check if key already exists
      else if (itemSplit[0] in currentQueryItems) {
          // convert to array or append to it
          var val = currentQueryItems[itemSplit[0]];
          currentQueryItems[itemSplit[0]] = (0, _array.isArr)(val) ? val.push(decodeURIComponent(itemSplit[1])) : [val, decodeURIComponent(itemSplit[1])];
        } else currentQueryItems[itemSplit[0]] = decodeURIComponent(itemSplit[1]);
    }
  });
  return currentQueryItems;
};
/**
 * Converts the input object to url querystring
 * @param {Object} obj - object with kvp to convert into a querystring
 * @function
 * @returns {String} querystring
 */


exports.queryToObj = queryToObj;

var objToQuery = function objToQuery(obj) {
  var firstSet;
  return (0, _object.reduceObj)(obj, function (key, value, urlStr) {
    if (!value) return urlStr;
    var useVal = (0, _string.isStr)(value) || (0, _number.isNum)(value) || (0, _boolean.isBool)(value) ? value : (0, _collection.isColl)(value) ? (0, _array.isArr)(value) ? value.join(',') : JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? "?".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal)) : "".concat(urlStr, "&").concat(encodeURIComponent(key), "=").concat(encodeURIComponent(useVal));
    firstSet = true;
    return urlStr;
  }, '');
};
/**
 * Checks if the given string is a valid URL
 * Must begin with ftp/http/https
 * @param {String} string - any string to check if it's a valid url
 * @function
 * @returns {Boolean}
 */


exports.objToQuery = objToQuery;

var isValidUrl = function isValidUrl(string) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(string);
};

exports.isValidUrl = isValidUrl;