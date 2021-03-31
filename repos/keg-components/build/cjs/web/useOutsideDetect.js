'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var eventIsOutside = function eventIsOutside(evt, ref) {
  return (ref === null || ref === void 0 ? void 0 : ref.current) && !ref.current.contains(evt.target);
};
var useOutsideDetect = function useOutsideDetect(ref, onOutsideClick) {
  React.useEffect(function () {
    var handleClickOutside = function handleClickOutside(event) {
      return eventIsOutside(event, ref) && (onOutsideClick === null || onOutsideClick === void 0 ? void 0 : onOutsideClick(event));
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      return document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

exports.useOutsideDetect = useOutsideDetect;
//# sourceMappingURL=useOutsideDetect.js.map
