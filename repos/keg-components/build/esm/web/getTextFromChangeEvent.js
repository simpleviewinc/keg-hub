import { g as getPlatform } from './getPlatform-95568099.js';
import { get } from '@keg-hub/jsutils';

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  var isWeb = getPlatform() === 'web';
  return isWeb ? get(event, 'target.value')
  : get(event, 'nativeEvent.text');
};

export { getTextFromChangeEvent };
//# sourceMappingURL=getTextFromChangeEvent.js.map
