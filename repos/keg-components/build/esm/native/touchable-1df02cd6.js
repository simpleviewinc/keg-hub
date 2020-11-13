import 'react';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { Touchable as Touchable$1 } from './touchable.js';

var Touchable = StyleInjector(Touchable$1, {
  displayName: 'Touchable',
  className: 'keg-touchable',
  important: ['transitionDuration', 'WebkitTransitionDuration']
});
Touchable.propTypes = Touchable$1.propTypes;

export { Touchable as T };
//# sourceMappingURL=touchable-1df02cd6.js.map
