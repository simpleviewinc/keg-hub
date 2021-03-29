'use strict';

var isFunc = require('./isFunc-f93803cb.js');
var isObj = require('./isObj-6b3aa807.js');

const reduceObj = (obj, cb, start = {}) => isObj.isObj(obj) && isFunc.isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;

exports.reduceObj = reduceObj;
//# sourceMappingURL=reduceObj-f41cbf8d.js.map
