import { isFunc, isArr } from '@keg-hub/jsutils';
import React__default from 'react';
import { isValidComponent } from './isValidComponent.js';

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent(Element) ? isFunc(Element) ? React__default.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React__default.createElement(Wrapper, props, Element) : Element;
};

export { renderFromType };
//# sourceMappingURL=renderFromType.js.map
