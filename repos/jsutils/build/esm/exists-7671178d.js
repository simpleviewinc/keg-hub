import { i as isArr } from './isArr-a4420764.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isStr } from './isStr-481ce69b.js';
import { s as softFalsy } from './softFalsy-b9d5bbac.js';
import { i as isNum } from './isNum-cc6ad9ca.js';

const either = (val1, val2, check) => !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isEmpty = val => isObj(val) ? Object.keys(val).length === 0 : isArr(val) ? val.length === 0 : isStr(val) ? val.trim().length === 0 : isNum(val) ? val < 1 : false;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

const exists = value => value === value && value !== undefined && value !== null;

export { isSame as a, isValidDate as b, exists as c, either as e, isEmpty as i };
//# sourceMappingURL=exists-7671178d.js.map
