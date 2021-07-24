import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Text } from '../typography/text'
import { useScroll } from 'KegUseScroll'
import { useClassName } from 'KegClassName'
import { useThemePath } from '../../hooks/useThemePath'
import { useScrollClassName } from 'KegScrollClassName'
import { checkCall, noPropObj, noPropArr, get, isFunc, isObj, isStr } from '@keg-hub/jsutils'
import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
  createRef,
} from 'react'
import { SectionList as RNSectionList, SafeAreaView } from 'react-native'
import {
  renderFromType,
  getElementLayout,
  scrollList,
} from '../../utils/components'

/**
 * Helper hook to add __kegIndex to the sections
 * This allows referencing them as needed without requiring the consumer to add the index
 *
 * @param {Array} sections - Groups of items to be displayed in the SectionList component
 *
 * @return {Array} - sections array with the __kegIndex added
 */
const useIndexedSections = (sections, indexBy) => {
  return useMemo(() => {
    return sections.map((section, index) => {
      return {
        ...section,
        __kegIndex: get(section, indexBy) || section.key || section.index || index,
      }
    })
  }, [sections])
}

/**
 * Helper hook to allow tracking scrolling between section
 * @param {function} onScrollSectionChange - Consumer Callback for when a section is scrolled
 * @param {number} sectionChangeOffset - Offset the final scroll position by some amount (px)
 * @param {Object} sectionRefs - React ref of all Section divider components.
 * @param {Object} activeSection - Most recent Section in the view calling this hook
 * @param {function} setActiveSection - Update which section is active
 * @param {Object} isScrollingRef - React ref to track if we are scrolling
 *
 * @returns {function} - Method to call when a section is scrolled
 */
const useSectionChangeOnScroll = (
  onScrollSectionChange,
  sectionChangeOffset,
  activeSection,
  setActiveSection,
  sectionRefs,
  isScrollingRef
) => {
  useScroll(
    null,
    useCallback((__, scrollUpdate) =>
      calculateActiveSection({
        onScrollSectionChange,
        sectionChangeOffset,
        activeSection,
        setActiveSection,
        sectionRefs,
        isScrollingRef,
        scrollUpdate,
      })
    )
  )
}

/**
 * Calculates and sets the active section based on current scroll value
 * @param {Object} props
 * @param {function} props.onScrollSectionChange - Consumer Callback for when a section is scrolled
 * @param {number} props.sectionChangeOffset - Offset the final scroll position by some amount (px)
 * @param {Object} props.sectionRefs - React ref of all Section divider components.
 * @param {Object} props.activeSection - Most recent Section in the view calling this hook
 * @param {function} props.setActiveSection - Update which section is active
 * @param {Object} props.isScrollingRef - React ref to track if we are scrolling
 * @param {Object} props.scrollUpdate - contains current scrollX and scrollY values {scrollX, scrollY}
 *
 * @returns {Void}
 */
const calculateActiveSection = props => {
  const {
    onScrollSectionChange,
    sectionChangeOffset,
    activeSection,
    setActiveSection,
    sectionRefs,
    isScrollingRef,
    scrollUpdate,
  } = props

  if (!onScrollSectionChange || isScrollingRef.current || !scrollUpdate) return

  const { scrollY } = scrollUpdate
  // Subtract the custom offset to the scroll position
  // Because offset should be relative to the element, not the scroll pos
  const scrollLoc = scrollY - sectionChangeOffset

  // Loop the sections can check their position against the scroll position
  // Find closest section that's more then the current scroll position
  const currentSection = Object.entries(sectionRefs.current).reduce(
    (foundSection, [ __, sectionData ]) => {
      const checkTop = sectionData?.layout?.top
      const foundTop = foundSection?.layout?.top

      if (
        !foundSection ||
        (scrollLoc >= checkTop && foundTop < checkTop) ||
        (foundTop > scrollLoc && foundTop > checkTop)
      )
        foundSection = sectionData

      return foundSection
    },
    false
  )

  if (!currentSection || currentSection.index === activeSection) return

  checkCall(onScrollSectionChange, currentSection.index)
  setActiveSection(currentSection.index)
}

/**
 * Helper hook to allow switching / scrolling to a section when a section change happens
 * @param {boolean} doScrolling - Is automatic scrolling turned on
 * @param {function} onSectionChange - Consumer Callback method for when a section changes
 * @param {number} scrollOffset - Offset the final scroll position by some amount (px)
 * @param {Object} sectionRefs - React ref of all Section divider components.
 * @param {Object} listRef - React ref of the SectionList component
 * @param {Object} isScrollingRef - React ref to track if we are scrolling
 * @param {number} scrollCooldown - Amount of time to wait before allowing scrolling (ms)
 * @param {function} setActiveSection - Update which section is active
 *
 * @returns {function} - Method to call when the current section is changed
 */
const useSectionChange = (
  doScrolling,
  onSectionChange,
  scrollOffset,
  setActiveSection,
  sectionRefs,
  listRef,
  isScrollingRef,
  scrollCooldown
) => {
  return useCallback(
    index => {
      // If there's no scrolling call the onSectionChange if it exists
      if (!doScrolling) return checkCall(onSectionChange, index)

      // Layout of the SectionHeader should be set in the useEffect hook
      // of the SectionHeader component so it can be accessed here
      const sectionData = sectionRefs.current[index]
      const layout = sectionData?.layout

      if (!layout)
        return console.warn(`Section layout not correctly set`, sectionData)

      // Update the is scrolling ref
      // So other scrolling methods don't try to scroll
      isScrollingRef.current = true

      // Call the scroll method, to scroll to the section header based on it's layout
      scrollList({
        listRef,
        animated: true,
        behavior: 'smooth',
        top: layout.top + scrollOffset,
      })

      // Call the passed in onSectionChange if it exists
      checkCall(onSectionChange, index)

      // Update the internal active section
      setActiveSection(index)

      // Wrap in a timeout to give it some cool down
      // No way to track when scrolling stops, so this is the best we have
      setTimeout(() => {
        // Turn is scrolling back off
        isScrollingRef.current = false
      }, scrollCooldown)
    },
    [
      scrollOffset,
      scrollCooldown,
      listRef.current,
      onSectionChange,
      setActiveSection,
      sectionRefs.current,
      isScrollingRef.current,
    ]
  )
}

/**
 * Displays a section header for each section, adding a view to helper with tracking
 * @param {Object} props
 * @param {number} props.index - Position of the section being rendered
 * @param {Object|function|node} props.renderSectionHeader - Callback passed from the consumer
 * @param {Object} props.sectionRefs - Ref Object to hold refs to the section header Dom Node
 * @param {Object} props.section - Current section being rendered
 * @param {Object} props.styles - Merged custom and theme styles
 * @param {function} props.onSectionChange - Callback called when a section is changed
 */
const SectionHeader = props => {
  const {
    index,
    onSectionChange,
    renderSectionHeader,
    sectionRefs,
    section,
    styles,
  } = props

  const sectionRef = useRef(null)

  useEffect(() => {
    // If no onSectionChange method
    // then we don't need to set the sectionRefs
    if (!isFunc(onSectionChange)) return

    sectionRefs.current[index] = sectionRef.current

    sectionRefs.current[index].element &&
      !sectionRefs.current[index].layout &&
      (sectionRefs.current[index].layout = getElementLayout(
        sectionRef.current.element
      ))

    return () => delete sectionRefs.current[index]
  }, [ sectionRef.current, index, onSectionChange ])

  // Wrap the renderSectionHeader method
  // With a fragment, and view so we can track the section headers
  // with an internal component and ref
  return (
    <>
      <View
        className={`keg-section-${index}`}
        ref={element => (sectionRef.current = { element, index })}
      />
      { checkCall(renderSectionHeader, { section, styles, onSectionChange }) }
    </>
  )
}

/**
 * Helper hook for the renderSectionHeader, that wraps our custom Section header in a callback
 * @param {function} renderSectionHeader - Consumers callback method to render their section headers
 * @param {function} onSectionChange - Consumers callback called whe a section is changed
 * @param {Object} sectionRefs - React ref of all Section divider components.
 * @param {Object} styles - Merged custom and theme styles
 *
 * @returns {function} - Render function for Section Headers
 */
const useRenderSectionHeader = (
  renderSectionHeader,
  onSectionChange,
  sectionRefs,
  styles
) => {
  // This gets used by the renderSectionHeader prop
  // It's not an issue with hooks, because the Callback hook
  // Has already been called before is passed as prop to the SectionList component
  // Which means we can call hooks in sub components
  return useCallback(
    ({ section }) => {
      return (
        <SectionHeader
          index={section.__kegIndex}
          renderSectionHeader={renderSectionHeader}
          onSectionChange={onSectionChange}
          section={section}
          sectionRefs={sectionRefs}
          styles={styles}
        />
      )
    },
    [ styles, onSectionChange, sectionRefs.current, renderSectionHeader ]
  )
}

/**
 * Helper hook to memoize the renderItem function
 * @param {function} renderItem - method to render a single item
 * @param {function} onSectionChange - method called when a section is changed
 *
 * @returns {React.Component} - response from the renderItem function
 */
const useRenderItem = (renderItem, onSectionChange) => {
  return useCallback(
    ({ item }) => {
      return checkCall(renderItem, { item, onSectionChange })
    },
    [ renderItem, onSectionChange ]
  )
}

/**
 * Helper hook to memoize the keyExtractor function for the SectionList
 * @param {function} keyExtractor - method to extract the key for the item
 *
 * @returns {function} - Memoized keyExtractor function
 */
const useKeyExtractor = (keyExtractor) => {
  return useCallback((item, index) => {
    return isFunc(keyExtractor)
      ? keyExtractor(item, index)
      : isObj(item) ? item.key || item.index || index : isStr(item) ? item : index
  }, [ keyExtractor ])
}

/**
 * SectionList
 * @summary Default view component that wraps the React Native View component. All props are optional
 *
 * @param {Object} props - see SectionList PropTypes
 * @property {String} props.className - Value to set the className to (web platform only)
 * @property {String} props.innerClassName - Value to set the innerClassName to (web platform only)
 *
 */
export const SectionList = React.forwardRef((props, ref) => {
  const {
    activeSection: initialSection,
    className,
    innerClassName,
    indexSectionHeaderBy,
    keyExtractor,
    noSectionHeaderScroll,
    scrollCooldown = 2000,
    onScrollSectionChange,
    onSectionChange,
    renderListHeader,
    renderSectionHeader,
    renderItem,
    sectionChangeOffset = 10,
    sections = noPropArr,
    styles = noPropObj,
    themePath,
    type = 'default',
    ...args
  } = props

  const itemKeyExtractor = useKeyExtractor(keyExtractor)
  const sectionRefs = useRef({})
  const isScrollingRef = useRef(false)
  const listRef = ref || createRef()
  const safeClassRef = useClassName('keg-safearea-list', className)
  const classRef = useScrollClassName(
    `keg-sectionlist`,
    className,
    innerClassName,
    listRef
  )

  const listStyles = useThemePath(themePath || `list.section.${type}`, styles)
  const indexedSections = useIndexedSections(sections, indexSectionHeaderBy)
  const [ activeSection, setActiveSection ] = useState(
    initialSection || get(indexedSections, '0.__kegIndex')
  )

  const [ sectionsContent, setSectionsContent ] = useState(sections)

  useEffect(() => {
    if (sections === sectionsContent) return
    // if the section contents changes without scrolling,
    // we want to make sure we update the activeSection accordingly
    const scrollUpdate = {
      scrollY: window.pageYOffset,
    }
    calculateActiveSection({
      onScrollSectionChange,
      sectionChangeOffset,
      activeSection,
      setActiveSection,
      sectionRefs,
      isScrollingRef,
      scrollUpdate,
    })

    setSectionsContent(sections)
  }, [
    sections,
    onScrollSectionChange,
    sectionChangeOffset,
    activeSection,
    setActiveSection,
    sectionRefs,
    isScrollingRef,
  ])

  const onSectionChangeAction = useSectionChange(
    noSectionHeaderScroll !== true,
    onSectionChange,
    sectionChangeOffset,
    setActiveSection,
    sectionRefs,
    listRef,
    isScrollingRef,
    scrollCooldown
  )
  const onRenderItem = useRenderItem(renderItem, onSectionChangeAction)
  const onSectionHeaderRender = useRenderSectionHeader(
    renderSectionHeader,
    onSectionChangeAction,
    sectionRefs,
    listStyles
  )

  useSectionChangeOnScroll(
    onScrollSectionChange,
    sectionChangeOffset,
    activeSection,
    setActiveSection,
    sectionRefs,
    isScrollingRef
  )

  return (
    <View
      className='keg-sectionlist-container'
      style={listStyles?.main}
    >
      { renderListHeader &&
        renderFromType(
          renderListHeader,
          {
            ...props,
            styles: listStyles,
            onSectionChange: onSectionChangeAction,
          },
          Text
        ) }
      <SafeAreaView
        ref={safeClassRef}
        style={listStyles?.content.container}
      >
        <RNSectionList
          keyExtractor={itemKeyExtractor}
          {...args}
          ref={classRef}
          renderItem={onRenderItem}
          sections={indexedSections}
          style={listStyles?.content.list}
          renderSectionHeader={onSectionHeaderRender}
        />
      </SafeAreaView>
    </View>
  )
})

SectionList.propTypes = {
  ...RNSectionList.propTypes,
  activeSection: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  /**
   * Property on each section used to index each section header
   */
  indexSectionHeaderBy: PropTypes.string,
  innerClassName: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  noSectionHeaderScroll: PropTypes.bool,
  /**
   * Called when a section becomes active ( visible ) from scrolling
   */
  onScrollSectionChange: PropTypes.func,
  /**
   * Called when a section changes either through scrolling or programmatically
   * Is NOT called when onScrollSectionChange prop exists, and section is changed from scrolling
   */
  onSectionChange: PropTypes.func,
  scrollCooldown: PropTypes.number,
  /**
   * Render prop to render the list header
   */
  renderListHeader: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  /**
   * Render prop to render the header of each section
   */
  renderSectionHeader: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  /**
   * Render prop to render each item in each section
   */
  renderItem: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ]),
  /**
   * Offset the scroll position by some amount (px) when section header scrolling is enabled
   */
  sectionChangeOffset: PropTypes.number,
  sections: PropTypes.array,
  styles: PropTypes.object,
  themePath: PropTypes.string,
  type: PropTypes.string,
}
