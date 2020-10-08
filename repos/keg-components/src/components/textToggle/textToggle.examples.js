import React from 'react'
import { TextToggle } from './textToggle'


export const Basic = () => {
  return (
      <TextToggle
        text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. '}
      />    
  )

}

// Add the default props here, due to them being defined inline
// This way we can define default props without effecting the actual component
// TextToggle.defaultProps = {
//   type: 'timing',
//   config: {},
//   initial: 0,
//   toggled: false,
// }

// Re-export the Component with the default props defined to be used in the MDX story
export {
  TextToggle
}