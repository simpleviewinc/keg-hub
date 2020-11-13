import { isObj, checkCall } from '@keg-hub/jsutils';

var handleRefUpdate = function handleRefUpdate(ref, update) {
  return !ref ? update : isObj(ref) && 'current' in ref ? ref.current = update : checkCall(ref, update);
};

export { handleRefUpdate };
//# sourceMappingURL=handleRefUpdate.js.map
