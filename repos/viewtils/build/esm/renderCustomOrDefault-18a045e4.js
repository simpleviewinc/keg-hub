import { isObj, checkCall, isFunc, isArr } from '@keg-hub/jsutils';
import React, { isValidElement } from 'react';

const handleRefUpdate = (ref, update) => {
  return !ref ? update : isObj(ref) && 'current' in ref ? ref.current = update : checkCall(ref, update);
};

const isValidComponent = Component => isValidElement(Component) || isFunc(Component);

const renderFromType = (Element, props, Wrapper) => {
  return isValidComponent(Element) ? isFunc(Element) ? React.createElement(Element, props) : Element : isArr(Element) ? Element : Wrapper ? React.createElement(Wrapper, props, Element) : Element;
};

const renderCustomOrDefault = (Component, DefComponent, props) => {
  return isValidComponent(Component) ? React.createElement(Component, props) : React.createElement(DefComponent, props);
};

export { renderCustomOrDefault as a, handleRefUpdate as h, isValidComponent as i, renderFromType as r };
//# sourceMappingURL=renderCustomOrDefault-18a045e4.js.map
