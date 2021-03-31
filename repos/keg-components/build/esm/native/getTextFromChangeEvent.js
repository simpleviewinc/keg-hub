import { get } from '@keg-hub/jsutils';

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  return get(event, 'nativeEvent.text');
};

export { getTextFromChangeEvent };
//# sourceMappingURL=getTextFromChangeEvent.js.map
