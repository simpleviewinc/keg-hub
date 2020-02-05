/** @module url */
'use strict';

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

const queryToObj = string => {
  const currentQueryItems = {};
  const stringSplit = string.split('?');
  const querystring = stringSplit[stringSplit.length - 1];
  if (!querystring) return currentQueryItems;
  const split = querystring.split('&');
  split.length && split.map(item => {
    const components = item.split('=');
    if (components.length <= 1) return currentQueryItems; // split on the first instance of '=', so we join the rest if any

    const itemSplit = [components.shift(), components.join('=')];

    if (itemSplit.length === 2) {
      // if the value contains special char ',' then make it into an array
      const array = decodeURIComponent(itemSplit[1]).split(',');
      if (array && array.length > 1) currentQueryItems[itemSplit[0]] = array; // check if key already exists
      else if (itemSplit[0] in currentQueryItems) {
          // convert to array or append to it
          const val = currentQueryItems[itemSplit[0]];
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

const objToQuery = obj => {
  let firstSet;
  return (0, _object.reduceObj)(obj, (key, value, urlStr) => {
    if (!value) return urlStr;
    const useVal = (0, _string.isStr)(value) || (0, _number.isNum)(value) || (0, _boolean.isBool)(value) ? value : (0, _collection.isColl)(value) ? (0, _array.isArr)(value) ? value.join(',') : JSON.stringify(value) : null;
    if (!useVal) return urlStr;
    urlStr = !firstSet ? `?${encodeURIComponent(key)}=${encodeURIComponent(useVal)}` : `${urlStr}&${encodeURIComponent(key)}=${encodeURIComponent(useVal)}`;
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

const isValidUrl = string => {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regexp.test(string);
};

exports.isValidUrl = isValidUrl;