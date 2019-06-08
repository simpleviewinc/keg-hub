"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqArr = exports.randomizeArray = exports.randomArray = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var randomArray = function randomArray(arr, amount) {
  amount = amount || 1;
  var randoms = [];

  for (var i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return amount === 1 ? randoms[0] : randoms;
};

exports.randomArray = randomArray;

var randomizeArray = function randomizeArray(arr) {
  return arr.sort(function () {
    return 0.5 - Math.random();
  });
};

exports.randomizeArray = randomizeArray;

var uniqArr = function uniqArr(arr, key) {
  return !key ? _toConsumableArray(new Set(arr)) : arr.reduce(function (acc, cur) {
    return [].concat(_toConsumableArray(acc.filter(function (obj) {
      return obj[key] !== cur[key];
    })), [cur]);
  }, []);
};

exports.uniqArr = uniqArr;