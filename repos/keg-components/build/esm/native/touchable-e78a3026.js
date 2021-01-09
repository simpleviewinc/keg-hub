import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { Touchable as Touchable$1 } from './touchable.js';

var Touchable = StyleInjector(Touchable$1, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable.propTypes = Touchable$1.propTypes;

export { Touchable as T };
//# sourceMappingURL=touchable-e78a3026.js.map
