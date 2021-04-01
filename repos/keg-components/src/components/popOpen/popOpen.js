import React, { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { PopMain } from './popMain'
import { noOp, noOpObj } from '@keg-hub/jsutils'
import { Pressable, useWindowDimensions, View } from 'react-native'

const defPos = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
}

/**
 * Helper hook to memoize callback methods based on the passed in action prop
 * @param {Object} options
 *
 * @return {Object} - Contains methods to pass to components as props (onHover, onPress, etc)
 */
const useHandlers = options => {
  const {
    action,
    isInteractive,
    setPopoverVisible,
    onAction=noOp
  } = options

  return useMemo(() => {
    const handlers = {}
    if(!isInteractive) return handlers

    switch(action){
      case 'hover': {
        handlers.onHoverIn = () => {
          setPopoverVisible(true)
          onAction(true)
        }

        handlers.onHoverOut = () => {
          setPopoverVisible(false)
          onAction(false)
        }
        break
      }
      case 'press': {
        handlers.onPress = () => {
          setPopoverVisible((visible) => {
            onAction(!visible)
            return !visible
          })
        }
        break
      }
      default: {
        handlers.onLongPress = () => {
          setPopoverVisible((visible) => {
            onAction(!visible)
            return !visible
          })
        }
      }

    }

    return handlers
  }, [
    action,
    onAction,
    isInteractive,
    setPopoverVisible,
  ])
}

/**
 * Helper hook to memoize onLayout callbacks of the children and PopOver components
 * @param {Object} options
 *
 * @return {Object} - Contains methods to pass to components as the onLayout prop
 */
const usePopLayouts = options => {
  const {
    childrenRef,
    setChildrenLayout,
    popoverRef,
    setPopoverLayout
  } = options

  const onChildrenLayout = useCallback(() => {
    childrenRef.current?.measureInWindow((x, y, width, height) => {
      setChildrenLayout({ x, y, width, height })
    })
  }, [childrenRef.current])

  const onPopoverLayout = useCallback(() => {
    popoverRef.current?.measureInWindow((x, y, width, height) => {
      setPopoverLayout({ x, y, width, height })
    })
  }, [popoverRef.current])

  return { onChildrenLayout, onPopoverLayout }
}

/**
 * Helper hook to 
 * @param {Object} options
 *
 * @return {void}
 */
const usePopOffsetLayout = (options) => {
  const {
    childrenLayout,
    computedPosition,
    dimensions,
    popoverLayout,
    position,
    setComputedPosition,
    strictPosition,
  } = options

  useEffect(() => {
    let nextPosition = position

    !strictPosition && (() => {
      switch (position) {
        case 'left': {
          popoverLayout.x <= 0 && (nextPosition = 'right')
          break
        }
        case 'right': {
          popoverLayout.x + popoverLayout.width > dimensions.width && (nextPosition = 'left')
          break
        }
        case 'top': {
          popoverLayout.y <= 0 && (nextPosition = 'bottom')
          break
        }
        case 'bottom': {
          popoverLayout.y + popoverLayout.height >= dimensions.height && (nextPosition = 'top')
          break
        }
      }
    })()

    setComputedPosition(nextPosition)
  }, [
    position,
    strictPosition,
    popoverLayout,
    childrenLayout,
    dimensions
  ])

  useEffect(() => {
    let left = 0
    let top = 0

    switch (computedPosition) {
      case 'right':
      case 'left':
        top = (popoverLayout.height - childrenLayout.height) / 2
        break

      case 'top':
      case 'bottom':
        left = (popoverLayout.width - childrenLayout.width) / 2
        break
    }

    setPopoverOffset({ left, top })
  }, [computedPosition, popoverLayout, childrenLayout])
}



/**
 * PopOpen - Wrapper component, that renders the PopMain component when it should be visible
 */
export const PopOpen = props => {

  const {
    action='press',
    animated,
    animationType,
    backgroundColor,
    children,
    caret,
    caretPosition,
    content,
    numberOfLines,
    onAction=noOp,
    position='top',
    strictPosition=false,
    style=noOpObj,
    visible,
  } = props

  const dimensions = useWindowDimensions()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [popoverOffset, setPopoverOffset] = useState({ left: 0, top: 0 })
  const [popoverLayout, setPopoverLayout] = useState(defPos)
  const [childrenLayout, setChildrenLayout] = useState(defPos)
  const [computedPosition, setComputedPosition] = useState(position)
  const isInteractive = typeof visible === 'undefined'
  const childrenRef = useRef(null)
  const popoverRef = useRef(null)

  const handlers = useHandlers({
    action,
    isInteractive,
    setPopoverVisible,
    onAction
  })

  const {
    onChildrenLayout,
    onPopoverLayout
  } = usePopLayouts({
    childrenRef,
    setChildrenLayout,
    popoverRef,
    setPopoverLayout
  })

  usePopOffsetLayout({
    childrenLayout,
    computedPosition,
    dimensions,
    popoverLayout,
    position,
    setComputedPosition,
    strictPosition,
  })

  return (
    <View>
      <PopMain
        ref={popoverRef}
        animated={animated}
        animationType={animationType}
        backgroundColor={backgroundColor}
        caret={caret}
        caretPosition={caretPosition}
        numberOfLines={numberOfLines}
        onLayout={onPopoverLayout}
        position={computedPosition}
        visible={isInteractive ? popoverVisible : visible}
        style={[
          computedPosition === 'top' && styles.popoverTop,
          computedPosition === 'bottom' && styles.popoverBottom,
          computedPosition === 'left' && {
            alignItems: 'flex-end',
            right: childrenLayout.width,
          },
          computedPosition === 'right' && { left: childrenLayout.width },
          {
            position: 'absolute',
            transform: [
              { translateX: popoverOffset.left * -1 },
              { translateY: popoverOffset.top * -1 },
            ],
          },
          style,
        ]}
      />
      <Pressable
        ref={childrenRef}
        onLayout={onChildrenLayout}
        {...handlers}
      >
        {children}
      </Pressable>
    </View>
  )

}


PopOpen.propTypes = {
  action: PropTypes.string,  // 'press' | 'longpress' | 'hover',
  animated: PropTypes.boolean,
  animationType: PropTypes.string,
  backgroundColor: PropTypes.string,
  caret: PropTypes.boolean,
  caretPosition: PropTypes.string,
  children: PropTypes.node,
  content: PropTypes.node,
  numberOfLines: PropTypes.number,
  onAction: PropTypes.func,
  position: PropTypes.string,
  strictPosition: PropTypes.boolean,
  style: PropTypes.object,
  visible: PropTypes.boolean,
}