'use strict';

var get = require('./get-bfcf4646.js');

const cloneFunc = func => {
  const funcClone = function (...args) {
    return func instanceof funcClone ? (() => {
      return new func(...args);
    })() : get.get(func.prototype, 'constructor.name') ? new func(...args) : func.apply(func, args);
  };
  for (let key in func) func.hasOwnProperty(key) && (funcClone[key] = func[key]);
  Object.defineProperty(funcClone, 'name', {
    value: func.name,
    configurable: true
  });
  funcClone.toString = () => func.toString();
  return funcClone;
};

exports.cloneFunc = cloneFunc;
