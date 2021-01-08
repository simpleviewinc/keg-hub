import { eitherArr, isObj, isStr, isArr } from '@keg-hub/jsutils'

/**
 * Flattens the passed in class list into an single level array
 * <br/>Converts any objects with className props or strings into individual array items
 * @param {Array[*]} classList - List of classes to be flattened
 * @param {Array[string]} ensured - The flattened className array
 *
 * @returns {Array[string]} ensured - The flattened className array
 */
export const ensureClassArray = (classList, ensured = []) => {
  return eitherArr(classList, [classList]).reduce((classNames, item) => {
    isObj(item)
      ? item.className
          ? ensureClassArray(item.className, classNames)
          : // Loop over the item keys and call ensureClassArray if the item key values are objects
          // Otherwise we could add random strings to the classNames array
          Object.keys(item).map(
            key => isObj(item[key]) && ensureClassArray(item[key], classNames)
          )
      : isArr(item)
        ? ensureClassArray(item, classNames)
        : isStr(item) &&
        item.split(' ').map(item => item && classNames.push(item))

    return classNames
  }, ensured)
}
