import { deepMerge, isArr, isObj, isStr, get } from 'jsutils'

export const join = (arg1, arg2, ...sources) => {
  return isObj(arg1) && isArr(arg2) && (isStr(arg2[0]) || isArr(arg2[0]))
    ? deepMerge( ...arg2.map(arg => get(arg1, arg)) )
    : deepMerge(arg1, arg2, ...sources)
}