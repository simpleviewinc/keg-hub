import { isObj, mapEntries, isFunc } from '@keg-hub/jsutils';

var validateFunctions = function validateFunctions(functionObj) {
  return isObj(functionObj) && mapEntries(functionObj, function (name, func) {
    return [name, isFunc(func)];
  }) || {};
};

export { validateFunctions };
//# sourceMappingURL=validateFunctions.js.map
