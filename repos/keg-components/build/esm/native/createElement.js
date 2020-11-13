import { c as _toConsumableArray } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { unstable_createElement } from 'react-native';

var createElement = function createElement(Element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }
  var childs = props.children || children;
  return unstable_createElement.apply(void 0, [Element, props].concat(_toConsumableArray(childs)));
};

export { createElement };
//# sourceMappingURL=createElement.js.map
