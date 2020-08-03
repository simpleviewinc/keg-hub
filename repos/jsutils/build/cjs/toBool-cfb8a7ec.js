'use strict';

var toStr$1 = require('./toStr-8e499966.js');
var isBool = require('./isBool-aa6af74e.js');

const isStrBool = val => val === 'false' || val === 'true';

const convertToStrBool = val => isBool.isBool(val) ? toStr$1.toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';

const toBool = val => isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';

exports.convertToStrBool = convertToStrBool;
exports.isStrBool = isStrBool;
exports.toBool = toBool;
