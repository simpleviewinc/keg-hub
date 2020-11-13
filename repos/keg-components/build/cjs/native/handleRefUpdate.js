'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsutils = require('@keg-hub/jsutils');

var handleRefUpdate = function handleRefUpdate(ref, update) {
  return !ref ? update : jsutils.isObj(ref) && 'current' in ref ? ref.current = update : jsutils.checkCall(ref, update);
};

exports.handleRefUpdate = handleRefUpdate;
//# sourceMappingURL=handleRefUpdate.js.map
