'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./isArr-39234014.js');
require('./isObj-6b3aa807.js');
require('./isFunc-f93803cb.js');
require('./isStr-8a57710e.js');
require('./isNum-c7164b50.js');
var isColl = require('./isColl-5757310a.js');
var get = require('./get-bfcf4646.js');
require('./cloneFunc-30c0acdd.js');
var shallowEqual = require('./shallowEqual-946ec12f.js');
var deepClone = require('./deepClone-2b548986.js');



exports.isColl = isColl.isColl;
exports.get = get.get;
exports.cleanColl = shallowEqual.cleanColl;
exports.deepEqual = shallowEqual.deepEqual;
exports.isEmptyColl = shallowEqual.isEmptyColl;
exports.mapColl = shallowEqual.mapColl;
exports.reduceColl = shallowEqual.reduceColl;
exports.repeat = shallowEqual.repeat;
exports.shallowEqual = shallowEqual.shallowEqual;
exports.unset = shallowEqual.unset;
exports.cloneObjWithPrototypeAndProperties = deepClone.cloneObjWithPrototypeAndProperties;
exports.deepClone = deepClone.deepClone;
exports.set = deepClone.set;
//# sourceMappingURL=collection.js.map
