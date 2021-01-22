'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
var renderFromType = require('./renderFromType.js');
var reactNative = require('react-native');
var useClassName = require('./useClassName-a237c005.js');
var styleInjector = require('@keg-hub/re-theme/styleInjector');
var view = require('./view-a5f2a568.js');
var text = require('./text.js');
var useThemePath = require('./useThemePath.js');
var useScrollClassName = require('./useScrollClassName-8290cc87.js');
var getScrollValues = require('./getScrollValues-f3b1bfa7.js');

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
  window.scroll(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    behavior: behavior
  }, jsutils.exists(top) && {
    top: top
  }), jsutils.exists(left) && {
    left: left
  }));
};

var useScroll = function useScroll() {
  var onScroll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jsutils.noOp;
  var onScrollEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : jsutils.noOp;
  var amount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
  var _useState = React.useState({
    scrollX: 0,
    scrollY: 0
  }),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      scroll = _useState2[0],
      setScroll = _useState2[1];
  var timeoutRef = React.useRef(null);
  var eventHandler = React.useCallback(jsutils.throttle(function (event) {
    var isEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var scrollUpdate = getScrollValues.getScrollValues();
    isEnd ? onScrollEnd === null || onScrollEnd === void 0 ? void 0 : onScrollEnd(event, scrollUpdate) : onScroll === null || onScroll === void 0 ? void 0 : onScroll(event, scrollUpdate);
    setScroll(scrollUpdate);
  }, amount), [amount, onScroll, onScrollEnd, setScroll]);
  var handlerTimeout = React.useCallback(function (event) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(function () {
      eventHandler(event, true);
    }, 3 * amount);
    eventHandler(event);
  }, [amount, timeoutRef && timeoutRef.current, eventHandler]);
  React.useLayoutEffect(function () {
    window.addEventListener('scroll', handlerTimeout);
    return function () {
      return window.removeEventListener('scroll', handlerTimeout);
    };
  }, [handlerTimeout]);
  return scroll;
};

var useIndexedSections = function useIndexedSections(sections, indexBy) {
  return React.useMemo(function () {
    return sections.map(function (section, index) {
      return _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, section), {}, {
        __kegIndex: jsutils.get(section, indexBy, index)
      });
    });
  }, [sections]);
};
var useSectionChangeOnScroll = function useSectionChangeOnScroll(onScrollSectionChange, sectionChangeOffset, activeSection, setActiveSection, sectionRefs, isScrollingRef) {
  useScroll(null, React.useCallback(function (__, scrollUpdate) {
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
    var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2),
        __ = _ref2[0],
        sectionData = _ref2[1];
    var checkTop = sectionData === null || sectionData === void 0 ? void 0 : (_sectionData$layout = sectionData.layout) === null || _sectionData$layout === void 0 ? void 0 : _sectionData$layout.top;
    var foundTop = (_foundSection = foundSection) === null || _foundSection === void 0 ? void 0 : (_foundSection$layout = _foundSection.layout) === null || _foundSection$layout === void 0 ? void 0 : _foundSection$layout.top;
    if (!foundSection || scrollLoc >= checkTop && foundTop < checkTop || foundTop > scrollLoc && foundTop > checkTop) foundSection = sectionData;
    return foundSection;
  }, false);
  if (!currentSection || currentSection.index === activeSection) return;
  jsutils.checkCall(onScrollSectionChange, currentSection.index);
  setActiveSection(currentSection.index);
};
var useSectionChange = function useSectionChange(doScrolling, onSectionChange, scrollOffset, setActiveSection, sectionRefs, listRef, isScrollingRef, scrollCooldown) {
  return React.useCallback(function (index) {
    if (!doScrolling) return jsutils.checkCall(onSectionChange, index);
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
    jsutils.checkCall(onSectionChange, index);
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
  var sectionRef = React.useRef(null);
  React.useEffect(function () {
    if (!jsutils.isFunc(onSectionChange)) return;
    sectionRefs.current[index] = sectionRef.current;
    sectionRefs.current[index].element && !sectionRefs.current[index].layout && (sectionRefs.current[index].layout = getElementLayout(sectionRef.current.element));
    return function () {
      return delete sectionRefs.current[index];
    };
  }, [sectionRef.current, index, onSectionChange]);
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(view.View, {
    className: "keg-section-".concat(index),
    ref: function ref(element) {
      return sectionRef.current = {
        element: element,
        index: index
      };
    }
  }), jsutils.checkCall(renderSectionHeader, {
    section: section,
    styles: styles,
    onSectionChange: onSectionChange
  }));
};
var useRenderSectionHeader = function useRenderSectionHeader(renderSectionHeader, onSectionChange, sectionRefs, styles) {
  return React.useCallback(function (_ref3) {
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
  return React.useCallback(function (_ref4) {
    var item = _ref4.item;
    return jsutils.checkCall(renderItem, {
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
      sections = _props$sections === void 0 ? jsutils.noPropArr : _props$sections,
      _props$styles = props.styles,
      styles = _props$styles === void 0 ? jsutils.noPropObj : _props$styles,
      themePath = props.themePath,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      args = _rollupPluginBabelHelpers._objectWithoutProperties(props, ["activeSection", "className", "innerClassName", "indexSectionHeaderBy", "noSectionHeaderScroll", "scrollCooldown", "onScrollSectionChange", "onSectionChange", "renderListHeader", "renderSectionHeader", "renderItem", "sectionChangeOffset", "sections", "styles", "themePath", "type"]);
  var sectionRefs = React.useRef({});
  var isScrollingRef = React.useRef(false);
  var listRef = ref || React.createRef();
  var safeClassRef = useClassName.useClassName('keg-safearea-list', className);
  var classRef = useScrollClassName.useScrollClassName("keg-sectionlist", className, innerClassName, listRef);
  var listStyles = useThemePath.useThemePath(themePath || "list.section.".concat(type), styles);
  var indexedSections = useIndexedSections(sections, indexSectionHeaderBy);
  var _useState = React.useState(initialSection || jsutils.get(indexedSections, '0.__kegIndex')),
      _useState2 = _rollupPluginBabelHelpers._slicedToArray(_useState, 2),
      activeSection = _useState2[0],
      setActiveSection = _useState2[1];
  var _useState3 = React.useState(sections),
      _useState4 = _rollupPluginBabelHelpers._slicedToArray(_useState3, 2),
      sectionsContent = _useState4[0],
      setSectionsContent = _useState4[1];
  React.useEffect(function () {
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
  return React__default.createElement(view.View, {
    className: "keg-sectionlist-container",
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.main
  }, renderListHeader && renderFromType.renderFromType(renderListHeader, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
    styles: listStyles,
    onSectionChange: onSectionChangeAction
  }), text.Text), React__default.createElement(reactNative.SafeAreaView, {
    ref: safeClassRef,
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.content.list
  }, React__default.createElement(reactNative.SectionList, _rollupPluginBabelHelpers._extends({}, args, {
    ref: classRef,
    renderItem: onRenderItem,
    sections: indexedSections,
    renderSectionHeader: onSectionHeaderRender
  }))));
});

var SectionList$1 = styleInjector.StyleInjector(SectionList, {
  displayName: 'SectionList',
  className: "keg-sectionlist"
});
SectionList$1.propTypes = SectionList.propTypes;

exports.SectionList = SectionList$1;
exports.getElementLayout = getElementLayout;
exports.scrollList = scrollList;
exports.useScroll = useScroll;
//# sourceMappingURL=sectionList-0e225263.js.map
