'use strict';

var isFunc = require('./isFunc-f93803cb.js');

const deepFreeze = obj => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(prop => {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || isFunc.isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};

exports.deepFreeze = deepFreeze;
//# sourceMappingURL=deepFreeze-d73ccc57.js.map
