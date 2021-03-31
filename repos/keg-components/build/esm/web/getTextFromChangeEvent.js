import { get } from '@keg-hub/jsutils';

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  return get(event, 'target.value')
  ;
};

export { getTextFromChangeEvent };
//# sourceMappingURL=getTextFromChangeEvent.js.map
