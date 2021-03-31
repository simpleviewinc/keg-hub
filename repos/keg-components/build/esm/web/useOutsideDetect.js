import { useEffect } from 'react';

var eventIsOutside = function eventIsOutside(evt, ref) {
  return (ref === null || ref === void 0 ? void 0 : ref.current) && !ref.current.contains(evt.target);
};
var useOutsideDetect = function useOutsideDetect(ref, onOutsideClick) {
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      return eventIsOutside(event, ref) && (onOutsideClick === null || onOutsideClick === void 0 ? void 0 : onOutsideClick(event));
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export { useOutsideDetect };
//# sourceMappingURL=useOutsideDetect.js.map
