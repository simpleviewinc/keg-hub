import React from 'react'
import { TextToggle } from './textToggle'
import {Text, View, Icon} from '../'
import { ChevronDown } from '../../assets/icons'
import { useStylesCallback } from '@keg-hub/re-theme'

const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const extraLongText = `${longText}${longText}`

const buildCustomToggleStyles = (_, helpers) => {
  return {
    main: {
      flexDirection: 'row'
    },
    text: {
      textDecorationLine: 'underline',
      fontWeight: '600'
    },
    icon: {
      container: {
        marginHorizontal: 3,
      },
      icon: {
        fontSize: 18,
        transform: [{rotate: helpers.isExpanded ? '180deg' : '0deg'}]
      }
    }
  }
}

export const Basic = () => {
  return (
      <TextToggle
        text={longText}
      />    
  )
}


export const CustomToggle = () => {
  return (
      <TextToggle
        text={longText}
        CustomToggle={CustomToggleContent}
      />    
  )
}


const CustomToggleContent = ({isExpanded}) => {

  const styles = useStylesCallback(buildCustomToggleStyles, [ isExpanded ], { isExpanded })

  return (
    <View style={styles.main}>
      <Text style={styles.text}>
        {isExpanded ? 'Less' : 'More'}
      </Text>
      <Icon
          styles={styles.icon}
          Component={ChevronDown}
        />
     
    </View>

  )
}


const limitHeightStyles = {
  textContainer: {
    maxHeight: 200
  }
}
export const LimitHeight = () => {
  return (
      <View>
        <TextToggle
          styles={limitHeightStyles}
          text={extraLongText}
          CustomToggle={CustomToggleContent}
        />    
      </View>
  )
}

TextToggle.defaultProps = {
  numOfLines: 4,
  isExpanded: false,
}

// Re-export the Component with the default props defined to be used in the MDX story
export {
  TextToggle
}