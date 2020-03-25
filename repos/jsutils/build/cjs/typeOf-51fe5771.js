'use strict';

const typeOf = val => Object.prototype.toString.call(val).slice(8, -1);

exports.typeOf = typeOf;
