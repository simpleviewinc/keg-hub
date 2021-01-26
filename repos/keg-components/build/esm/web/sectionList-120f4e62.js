import { _ as _objectSpread2, b as _slicedToArray, d as _objectWithoutProperties, e as _extends } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { exists, throttle, noOp, get, checkCall, isFunc, noPropArr, noPropObj } from '@keg-hub/jsutils';
import React__default, { useState, useRef, useCallback, useLayoutEffect, createRef, useMemo, useEffect } from 'react';
import { renderFromType } from './renderFromType.js';
import { SafeAreaView, SectionList as SectionList$2 } from 'react-native';
import { u as useClassName } from './useClassName-6851fdf6.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import { V as View } from './view-a64440c5.js';
import { Text } from './text.js';
import { useThemePath } from './useThemePath.js';
import { u as useScrollClassName } from './useScrollClassName-08a313a5.js';
import { g as getScrollValues } from './getScrollValues-1e13266a.js';

var getElementLayout = function getElementLayout(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var scrollList = function scrollList(_ref) {
  var top = _ref.top,
      left = _ref.left,
      _ref$behavior = _ref.behavior,
      behavior = _ref$behavior === void 0 ? 'smooth' : _ref$behavior;
  window.scroll(_objectSpread2(_objectSpread2({
    behavior: behavior
  }, exists(top) && {
    top: top
  }), exists(left) && {
    left: left
  }));
};

var useScroll = function useScroll() {
  var onScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noOp;
  var onScrollEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOp;
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var _useState = useState({
    scrollX: 0,
    scrollY: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      scroll = _useState2[0],
      setScroll = _useState2[1];
  var timeoutRef = useRef(null);
  var eventHandler = useCallback(throttle(function (event) {
    var isEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var scrollUpdate = getScrollValues();
    isEnd ? onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd(event, scrollUpdate) : onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, scrollUpdate);
    setScroll(scrollUpdate);
  }, amount), [amount, onScroll, onScrollEnd, setScroll]);
  var handlerTimeout = useCallback(function (event) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      eventHandler(event, true);
    }, 3 * amount);
    eventHandler(event);
  }, [amount, timeoutRef && timeoutRef.current, eventHandler]);
  useLayoutEffect(function () {
    window.addEventListener('scroll', handlerTimeout);
    return function () {
      return window.removeEventListener('scroll', handlerTimeout);
    };
  }, [handlerTimeout]);
  return scroll;
};

var useIndexedSections = function useIndexedSections(sections, indexBy) {
  return useMemo(function () {
    return sections.map(function (section, index) {
      return _objectSpread2(_objectSpread2({}, section), {}, {
        __kegIndex: get(section, indexBy, index)
      });
    });
  }, [sections]);
};
var useSectionChangeOnScroll = function useSectionChangeOnScroll(onScrollSectionChange, sectionChangeOffset, activeSection, setActiveSection, sectionRefs, isScrollingRef) {
  useScroll(null, useCallback(function (__, scrollUpdate) {
    return calculateActiveSection({
      onScrollSectionChange: onScrollSectionChange,
      sectionChangeOffset: sectionChangeOffset,
      activeSection: activeSection,
      setActiveSection: setActiveSection,
      sectionRefs: sectionRefs,
      isScrollingRef: isScrollingRef,
      scrollUpdate: scrollUpdate
    });
  }));
};
var calculateActiveSection = function calculateActiveSection(props) {
  var onScrollSectionChange = props.onScrollSectionChange,
      sectionChangeOffset = props.sectionChangeOffset,
      activeSection = props.activeSection,
      setActiveSection = props.setActiveSection,
      sectionRefs = props.sectionRefs,
      isScrollingRef = props.isScrollingRef,
      scrollUpdate = props.scrollUpdate;
  if (!onScrollSectionChange || isScrollingRef.current || !scrollUpdate) return;
  var scrollY = scrollUpdate.scrollY;
  var scrollLoc = scrollY - sectionChangeOffset;
  var currentSection = Object.entries(sectionRefs.current).reduce(function (foundSection, _ref) {
    var _sectionData$layout, _foundSection, _foundSection$layout;
    var _ref2 = _slicedToArray(_ref, 2),
        __ = _ref2[0],
        sectionData = _ref2[1];
    var checkTop = sectionData === null || sectionData === void 0 ? void 0 : (_sectionData$layout = sectionData.layout) === null || _sectionData$layout === void 0 ? void 0 : _sectionData$layout.top;
    var foundTop = (_foundSection = foundSection) === null || _foundSection === void 0 ? void 0 : (_foundSection$layout = _foundSection.layout) === null || _foundSection$layout === void 0 ? void 0 : _foundSection$layout.top;
    if (!foundSection || scrollLoc >= checkTop && foundTop < checkTop || foundTop > scrollLoc && foundTop > checkTop) foundSection = sectionData;
    return foundSection;
  }, false);
  if (!currentSection || currentSection.index === activeSection) return;
  checkCall(onScrollSectionChange, currentSection.index);
  setActiveSection(currentSection.index);
};
var useSectionChange = function useSectionChange(doScrolling, onSectionChange, scrollOffset, setActiveSection, sectionRefs, listRef, isScrollingRef, scrollCooldown) {
  return useCallback(function (index) {
    if (!doScrolling) return checkCall(onSectionChange, index);
    var sectionData = sectionRefs.current[index];
    var layout = sectionData === null || sectionData === void 0 ? void 0 : sectionData.layout;
    if (!layout) return console.warn("Section layout not correctly set", sectionData);
    isScrollingRef.current = true;
    scrollList({
      listRef: listRef,
      animated: true,
      behavior: 'smooth',
      top: layout.top + scrollOffset
    });
    checkCall(onSectionChange, index);
    setActiveSection(index);
    setTimeout(function () {
      isScrollingRef.current = false;
    }, scrollCooldown);
  }, [scrollOffset, scrollCooldown, listRef.current, onSectionChange, setActiveSection, sectionRefs.current, isScrollingRef.current]);
};
var SectionHeader = function SectionHeader(props) {
  var index = props.index,
      onSectionChange = props.onSectionChange,
      renderSectionHeader = props.renderSectionHeader,
      sectionRefs = props.sectionRefs,
      section = props.section,
      styles = props.styles;
  var sectionRef = useRef(null);
  useEffect(function () {
    if (!isFunc(onSectionChange)) return;
    sectionRefs.current[index] = sectionRef.current;
    sectionRefs.current[index].element && !sectionRefs.current[index].layout && (sectionRefs.current[index].layout = getElementLayout(sectionRef.current.element));
    return function () {
      return delete sectionRefs.current[index];
    };
  }, [sectionRef.current, index, onSectionChange]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(View, {
    className: "keg-section-".concat(index),
    ref: function ref(element) {
      return sectionRef.current = {
        element: element,
        index: index
      };
    }
  }), checkCall(renderSectionHeader, {
    section: section,
    styles: styles,
    onSectionChange: onSectionChange
  }));
};
var useRenderSectionHeader = function useRenderSectionHeader(renderSectionHeader, onSectionChange, sectionRefs, styles) {
  return useCallback(function (_ref3) {
    var section = _ref3.section;
    return React__default.createElement(SectionHeader, {
      index: section.__kegIndex,
      renderSectionHeader: renderSectionHeader,
      onSectionChange: onSectionChange,
      section: section,
      sectionRefs: sectionRefs,
      styles: styles
    });
  }, [styles, onSectionChange, sectionRefs.current, renderSectionHeader]);
};
var useRenderItem = function useRenderItem(renderItem, onSectionChange) {
  return useCallback(function (_ref4) {
    var item = _ref4.item;
    return checkCall(renderItem, {
      item: item,
      onSectionChange: onSectionChange
    });
  }, [renderItem, onSectionChange]);
};
var SectionList = React__default.forwardRef(function (props, ref) {
  var initialSection = props.activeSection,
      className = props.className,
      innerClassName = props.innerClassName,
      indexSectionHeaderBy = props.indexSectionHeaderBy,
      noSectionHeaderScroll = props.noSectionHeaderScroll,
      _props$scrollCooldown = props.scrollCooldown,
      scrollCooldown = _props$scrollCooldown === void 0 ? 2000 : _props$scrollCooldown,
      onScrollSectionChange = props.onScrollSectionChange,
      onSectionChange = props.onSectionChange,
      renderListHeader = props.renderListHeader,
      renderSectionHeader = props.renderSectionHeader,
      renderItem = props.renderItem,
      _props$sectionChangeO = props.sectionChangeOffset,
      sectionChangeOffset = _props$sectionChangeO === void 0 ? 10 : _props$sectionChangeO,
      _props$sections = props.sections,
      sections = _props$sections === void 0 ? noPropArr : _props$sections,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? noPropObj : _props$styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      args = _objectWithoutProperties(props, ["activeSection", "className", "innerClassName", "indexSectionHeaderBy", "noSectionHeaderScroll", "scrollCooldown", "onScrollSectionChange", "onSectionChange", "renderListHeader", "renderSectionHeader", "renderItem", "sectionChangeOffset", "sections", "styles", "themePath", "type"]);
  var sectionRefs = useRef({});
  var isScrollingRef = useRef(false);
  var listRef = ref || createRef();
  var safeClassRef = useClassName('keg-safearea-list', className);
  var classRef = useScrollClassName("keg-sectionlist", className, innerClassName, listRef);
  var listStyles = useThemePath(themePath || "list.section.".concat(type), styles);
  var indexedSections = useIndexedSections(sections, indexSectionHeaderBy);
  var _useState = useState(initialSection || get(indexedSections, '0.__kegIndex')),
      _useState2 = _slicedToArray(_useState, 2),
      activeSection = _useState2[0],
      setActiveSection = _useState2[1];
  var _useState3 = useState(sections),
      _useState4 = _slicedToArray(_useState3, 2),
      sectionsContent = _useState4[0],
      setSectionsContent = _useState4[1];
  useEffect(function () {
    if (sections === sectionsContent) return;
    var scrollUpdate = {
      scrollY: window.pageYOffset
    };
    calculateActiveSection({
      onScrollSectionChange: onScrollSectionChange,
      sectionChangeOffset: sectionChangeOffset,
      activeSection: activeSection,
      setActiveSection: setActiveSection,
      sectionRefs: sectionRefs,
      isScrollingRef: isScrollingRef,
      scrollUpdate: scrollUpdate
    });
    setSectionsContent(sections);
  }, [sections, onScrollSectionChange, sectionChangeOffset, activeSection, setActiveSection, sectionRefs, isScrollingRef]);
  var onSectionChangeAction = useSectionChange(noSectionHeaderScroll !== true, onSectionChange, sectionChangeOffset, setActiveSection, sectionRefs, listRef, isScrollingRef, scrollCooldown);
  var onRenderItem = useRenderItem(renderItem, onSectionChangeAction);
  var onSectionHeaderRender = useRenderSectionHeader(renderSectionHeader, onSectionChangeAction, sectionRefs, listStyles);
  useSectionChangeOnScroll(onScrollSectionChange, sectionChangeOffset, activeSection, setActiveSection, sectionRefs, isScrollingRef);
  return React__default.createElement(View, {
    className: "keg-sectionlist-container",
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.main
  }, renderListHeader && renderFromType(renderListHeader, _objectSpread2(_objectSpread2({}, props), {}, {
    styles: listStyles,
    onSectionChange: onSectionChangeAction
  }), Text), React__default.createElement(SafeAreaView, {
    ref: safeClassRef,
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.content.list
  }, React__default.createElement(SectionList$2, _extends({}, args, {
    ref: classRef,
    renderItem: onRenderItem,
    sections: indexedSections,
    renderSectionHeader: onSectionHeaderRender
  }))));
});

var SectionList$1 = StyleInjector(SectionList, {
  displayName: 'SectionList',
  className: "keg-sectionlist"
});
SectionList$1.propTypes = SectionList.propTypes;

export { SectionList$1 as S, getElementLayout as g, scrollList as s, useScroll as u };
//# sourceMappingURL=sectionList-120f4e62.js.map
