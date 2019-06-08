"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.sort");

require("core-js/modules/es.set");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniqArr = exports.randomizeArray = exports.randomArray = void 0;

const randomArray = (arr, amount) => {
  amount = amount || 1;
  const randoms = [];

  for (let i = 0; i < amount; i++) {
    randoms.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  return amount === 1 ? randoms[0] : randoms;
};

exports.randomArray = randomArray;

const randomizeArray = arr => {
  return arr.sort(() => {
    return 0.5 - Math.random();
  });
};

exports.randomizeArray = randomizeArray;

const uniqArr = (arr, key) => {
  return !key ? [...new Set(arr)] : arr.reduce((acc, cur) => [...acc.filter(obj => obj[key] !== cur[key]), cur], []);
};

exports.uniqArr = uniqArr;