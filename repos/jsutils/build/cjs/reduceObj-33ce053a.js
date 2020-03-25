'use strict';

var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');

const reduceObj = (obj, cb, start = {}) => isObj.isObj(obj) && isFunc.isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;

exports.reduceObj = reduceObj;
