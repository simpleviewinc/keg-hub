import { isFunc } from '@keg-hub/jsutils';
import { isValidElement } from 'react';

var isValidComponent = function isValidComponent(Component) {
  return isValidElement(Component) || isFunc(Component);
};

export { isValidComponent };
//# sourceMappingURL=isValidComponent.js.map
