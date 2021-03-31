'use strict';

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-bb55ccbe.js');
var view_native = require('./view.native-b34604af.js');
var text = require('./text.js');
var useClassName_native = require('./useClassName.native-3d1a229b.js');
var useThemePath = require('./useThemePath.js');
var useScrollClassName_native = require('./useScrollClassName.native-c0cd7ecb.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var reactNative = require('react-native');
var renderFromType = require('./renderFromType.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var defLayout = {
  top: 0,
  left: 0
};
var getElementLayout = function getElementLayout() {
  return defLayout;
};

var scrollList = function scrollList(_ref) {
  var _listRef$current;
  var listRef = _ref.listRef,
      _ref$animated = _ref.animated,
      animated = _ref$animated === void 0 ? true : _ref$animated,
      top = _ref.top,
      left = _ref.left;
  return listRef === null || listRef === void 0 ? void 0 : (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollTo(_rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
    animated: animated
  }, jsutils.exists(top) && {
    y: top
  }), jsutils.exists(left) && {
    x: left
  }));
};

var defPos = {
  scrollX: 0,
  scrollY: 0
};
var useScroll = function useScroll() {
  return defPos;
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
    var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2);
        _ref2[0];
        var sectionData = _ref2[1];
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
  return React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].createElement(view_native.View, {
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
    return React__default['default'].createElement(SectionHeader, {
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
var SectionList = React__default['default'].forwardRef(function (props, ref) {
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
  var safeClassRef = useClassName_native.useClassName();
  var classRef = useScrollClassName_native.useScrollClassName("keg-sectionlist", className, innerClassName, listRef);
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
  return React__default['default'].createElement(view_native.View, {
    className: "keg-sectionlist-container",
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.main
  }, renderListHeader && renderFromType.renderFromType(renderListHeader, _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, props), {}, {
    styles: listStyles,
    onSectionChange: onSectionChangeAction
  }), text.Text), React__default['default'].createElement(reactNative.SafeAreaView, {
    ref: safeClassRef,
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.content.container
  }, React__default['default'].createElement(reactNative.SectionList, _rollupPluginBabelHelpers._extends({}, args, {
    ref: classRef,
    renderItem: onRenderItem,
    sections: indexedSections,
    style: listStyles === null || listStyles === void 0 ? void 0 : listStyles.content.list,
    renderSectionHeader: onSectionHeaderRender
  }))));
});

exports.SectionList = SectionList;
exports.getElementLayout = getElementLayout;
exports.scrollList = scrollList;
exports.useScroll = useScroll;
//# sourceMappingURL=sectionList.native-b996388b.js.map
