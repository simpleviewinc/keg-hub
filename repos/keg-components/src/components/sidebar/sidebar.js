import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import { isValidComponent } from 'KegUtils'
import { useStyle, useDimensions } from '@keg-hub/re-theme'
import { SidebarToggle } from './sidebarToggle'
import { SidebarContainer, getSidebarWidth } from './sidebar.restyle'
import { checkCall, noOpObj, noOp, isNum } from '@keg-hub/jsutils'
import React, { 
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef
} from 'react'

/**
 * Checks if the animation should NOT run
 * @function
 * @private
 * @param {boolean} toggled - Current state of the Drawer toggled open
 * @param {number} current - Current height of the Drawer / animated.value
 * @param {number} heights - Ref that holds the initial and max heights of the slider
 *
 * @returns {boolean} - If the animation should NOT run
 */
const noAnimate = (toggled, current, { initial, to }) =>
  (!toggled && current === initial) || (toggled && current === to)

/**
 * Hook to build the styles for the sidebar component
 * @function
 * @private
 * @param {Object} props - See Sidebar component props
 *
 * @returns {Object} - Contains main animated.View and child sidebar styles from the theme
 */
const useSidebarStyles = ({ initial, styles, sidebarWidth, sidebarPos='left' }) => {
  const dims = useDimensions()  
  const sidebarStyles = useStyle('sidebar', styles)
  const width = getSidebarWidth(sidebarWidth, initial, sidebarStyles)

  const mainStyles = useMemo(() => {
    const location = sidebarPos === 'right' ? sidebarPos : 'left'
    return {
      flex: 1,
      zIndex: 5,
      position: 'fixed',
      height: dims.height,
      ...sidebarStyles?.main,
      width: width,
      [location]: initial
    }
  
  }, [sidebarPos, width, initial, sidebarStyles?.main, dims?.height])

  return { mainStyles, sidebarStyles }

}

/**
 * Hook to build the sidebar toggle functionality based on initial and to prop values
 * @function
 * @private
 * @param {Object} props - See Sidebar component props
 *
 * @returns {Object} - Contains current toggle state, and methods to update it
 */
const useSidebarToggle = props => {
  const { toggled, onToggled=noOp, initial, to } = props

  // Store the toggled state for reference later
  const [ isToggled, setIsToggled ] = useState(toggled)
  const [ originalToggled, setOriginalToggled ] = useState(toggled)

  // If the passed in toggled does not match the original toggled
  // Then update the toggled boolean to be rendered
  // This allows changing the toggled prop outside the sidebar
  // And still allowing the sidebar to update
  useEffect(() => {
    if(originalToggled === toggled) return

    setOriginalToggled(toggled)
    setIsToggled(toggled)
  }, [ toggled, originalToggled ])

  // Wrapper to toggle the sidebar
  // Also calls the onToggled prop if it's passed in
  const onTogglePress = useCallback(event => {
    const toggleUpdate = !isToggled
    setIsToggled(toggleUpdate)
    checkCall(onToggled, toggleUpdate)
  }, [ isToggled, setIsToggled, initial, to ])

  return {
    toggled,
    isToggled,
    setIsToggled,
    onTogglePress,
  }
}

/**
 * Hook to build the sidebar animation functionality
 * @function
 * @private
 * @param {Object} props - See Sidebar component props
 * @param {boolean} isToggled - Current toggled state of the sidebar
 *
 * @returns {Object} - Contains sidebar animation and a method to update it
 */
const useSidebarAnimate = (props, isToggled) => {
  const { config=noOpObj, initial, to, type='timing' } = props

  // Define the animated value as a ref
  const [ animation, setAnimation ] = useState(new Animated.Value(initial))

  // Cache the initial animation values
  const xPosRef = useRef({ initial, to })

  // Toggled flag defines how to update the animated value
  // To Open: isToggled === true === should animate open
  // To Close: isToggled === false === should animate close
  useLayoutEffect(() => {
    if(!xPosRef.current) return

    // Check if we should animate the slider
    // If the values have not changed, no need to animate
    if (noAnimate(isToggled, animation._value, xPosRef.current)) return

    const { initial, to } = xPosRef.current

    // // Define the from and to values for the animation based on isToggled flag
    const xPosChanges = isToggled
      ? { from: initial, to: to }
      : { from: to, to: initial }

    // Update the animation value to animate from
    animation.setValue(xPosChanges.from)

    // Start the animation, from value ==> to value
    const animationConfig = config
      ? { ...config, toValue: xPosChanges.to }
      : { toValue: xPosChanges.to }
    Animated[type](animation, animationConfig).start()

    // Add isToggled as a dep, so anytime it changes, we run the hook code
  }, [isToggled, type, config])

  return {animation, setAnimation}
}

/**
 * Sidebar
 * @param {Object} props
 * @param {Object} props.config - Defines the animation of the sidebar
 * @param {Array|Object|React.Component} props.children - Children to render inside the sidebar
 * @param {string} props.className - Root className of the sidebar
 * @param {number} props.initial - Initial position of the sidebar on the X axis
 * @param {function} props.onToggled - Called when the sidebar is toggled
 * @param {string} props.sidebarPos - Location of the sidebar on the page ( Left or Right )
 * @param {number} props.sidebarWidth - Width of the sidebar in pixels
 * @param {Object} props.styles - Styles to apply to the sidebar and its children
 * @param {number} props.to - Final position of the sidebar on the X axis when toggled
 * @param {Array|Object|React.Component} props.ToggleComponent - Component to override the default toggle component
 * @param {string} props.type - Type of animation to use ( e.g. 'spring' )
 *
 */
export const Sidebar = props => {
  const {
    children,
    sidebarWidth,
    ToggleComponent=SidebarToggle,
  } = props

  const {
    toggled,
    isToggled,
    setIsToggled,
    onTogglePress,
  } = useSidebarToggle(props)
  const { animation } = useSidebarAnimate(props, isToggled)
  const { mainStyles, sidebarStyles} = useSidebarStyles(props)

  return (
    <>
      <Animated.View style={[mainStyles, { left: animation }]}>
        <SidebarContainer 
          className='sidebar-container'
          style={sidebarStyles?.container}
        >
          { children }
        </SidebarContainer>
        { isValidComponent(ToggleComponent) && (
          <ToggleComponent
            toggled={isToggled}
            setIsToggled={setIsToggled}
            styles={sidebarStyles?.toggle}
            onPress={onTogglePress}
            sidebarSize={sidebarWidth}
          />
        )}
      </Animated.View>
    </>
  )
}

// Add the toggle component helper
Sidebar.Toggle = SidebarToggle

Sidebar.propTypes = {
  config: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  initial: PropTypes.number.isRequired,
  onToggled: PropTypes.func,
  sidebarPos: PropTypes.string,
  sidebarWidth: PropTypes.number,
  styles: PropTypes.object,
  to: PropTypes.number,
  ToggleComponent: PropTypes.oneOfType([ PropTypes.func, PropTypes.node ]),
  type: PropTypes.string,
}
