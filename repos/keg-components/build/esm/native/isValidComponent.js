import { isValidElement } from 'react';
import { isFunc } from '@keg-hub/jsutils';

var isValidComponent = function isValidComponent(Component) {
  return isValidElement(Component) || isFunc(Component);
};

export { isValidComponent };
//# sourceMappingURL=isValidComponent.js.map
