'use strict';

var isFunc = require('./isFunc-f93803cb.js');
var softFalsy = require('./softFalsy-3d7ead1c.js');

const either = (val1, val2, check) => !isFunc.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

exports.either = either;
exports.isSame = isSame;
exports.isValidDate = isValidDate;
//# sourceMappingURL=isValidDate-015c2dde.js.map
