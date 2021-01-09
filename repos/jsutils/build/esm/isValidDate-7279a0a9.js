import { i as isFunc } from './isFunc-40ceeef8.js';
import { s as softFalsy } from './softFalsy-b9d5bbac.js';

const either = (val1, val2, check) => !isFunc(check) ? softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

export { isValidDate as a, either as e, isSame as i };
//# sourceMappingURL=isValidDate-7279a0a9.js.map
