import { exists } from '@keg-hub/jsutils';

const ensureElement = (selectorId, type, location) => {
  let domNode = document[location].querySelector(`#${selectorId}`);
  if (domNode) return domNode;
  domNode = document.createElement(type);
  domNode.id = selectorId;
  document[location].append(domNode);
  return domNode;
};

const scrollList = ({
  element = window,
  top,
  left,
  behavior = 'smooth'
}) => {
  element && element.scroll && element.scroll({
    behavior,
    ...(exists(top) && {
      top
    }),
    ...(exists(left) && {
      left
    })
  });
};

export { ensureElement as e, scrollList as s };
//# sourceMappingURL=scrollList-6fd189b5.js.map
