import React from 'react';
import { isFunc, isArr } from '@keg-hub/jsutils';
import { isValidComponent } from './isValidComponent.js';

var renderFromType = function renderFromType(Element, props, Wrapper) {
  return isValidComponent(Element) ? isFunc(Element) ? React.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React.createElement(Wrapper, props, Element) : Element;
};

export { renderFromType };
//# sourceMappingURL=renderFromType.js.map
