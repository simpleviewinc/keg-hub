import { g as getPlatform } from './getPlatform-e625f46a.js';
import { get } from '@keg-hub/jsutils';

var getTextFromChangeEvent = function getTextFromChangeEvent(event) {
  var isWeb = getPlatform() === 'web';
  return isWeb ? get(event, 'target.value')
  : get(event, 'nativeEvent.text');
};

export { getTextFromChangeEvent };
//# sourceMappingURL=getTextFromChangeEvent.js.map
