import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import './isBool-4d844d9e.js';
import './toBool-32bfbbdb.js';
import { i as isStr } from './isStr-481ce69b.js';
import './toStr-0e5fe94c.js';
import { s as softFalsy } from './softFalsy-b9d5bbac.js';
import './toNum-537197a6.js';
export { s as strToType } from './strToType-b680e356.js';
export { t as typeOf } from './typeOf-8c86a991.js';

const either = (val1, val2, check) => !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isEmpty = val => isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

export { either, isEmpty, isSame, isValidDate };
