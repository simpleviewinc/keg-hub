import React, { useState, useEffect, useRef } from 'react'
import { TextToggle } from './textToggle'
import { Text, View, Icon, Button, Input } from '../'
import { ChevronDown } from '../../assets/icons'
import { useStylesCallback } from '@keg-hub/re-theme'

const shortText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const extraLongText = `${longText}${longText}`

const buildCustomToggleStyles = (_, helpers) => {
  return {
    main: {
      flexDirection: 'row',
    },
    text: {
      textDecorationLine: 'underline',
      fontWeight: '600',
    },
    icon: {
      container: {
        marginHorizontal: 3,
      },
      icon: {
        fontSize: 18,
        transform: [{ rotate: helpers.isExpanded ? '180deg' : '0deg' }],
      },
    },
  }
}

const CustomToggleContent = ({ isExpanded }) => {
  const styles = useStylesCallback(buildCustomToggleStyles, [isExpanded], {
    isExpanded,
  })

  return (
    <View style={styles.main}>
      <Text style={styles.text}>{ isExpanded ? 'Less' : 'More' }</Text>
      <Icon
        styles={styles.icon}
        Component={ChevronDown}
      />
    </View>
  )
}

const TogglePositionStyles = {
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  button: {
    main: {
      marginHorizontal: 8,
    },
  },
}

export const Basic = () => {
  return <TextToggle text={longText} />
}

export const CustomToggle = () => {
  return <TextToggle
    text={longText}
    CustomToggle={CustomToggleContent}
  />
}

export const TogglePosition = () => {
  const [ position, setPosition ] = useState('left')
  return (
    <View>
      <View style={TogglePositionStyles.buttonsContainer}>
        <Button
          styles={TogglePositionStyles.button}
          themePath='button.contained.secondary'
          onClick={() => setPosition('left')}
          content={'set left'}
        />
        <Button
          styles={TogglePositionStyles.button}
          themePath='button.contained.secondary'
          onClick={() => setPosition('center')}
          content={'set center'}
        />
        <Button
          styles={TogglePositionStyles.button}
          themePath='button.contained.secondary'
          onClick={() => setPosition('right')}
          content={'set right'}
        />
      </View>
      <TextToggle
        togglePosition={position}
        text={extraLongText}
      />
    </View>
  )
}

export const NoToggle = () => {
  return (
    <View>
      <TextToggle
        text={shortText}
        collapsedHeight={100}
      />
    </View>
  )
}

const placeHolderText = '50'
export const DynamicCollapsedHeight = () => {
  const [ collapsedHeight, setCollapsedHeight ] = useState(
    parseInt(placeHolderText)
  )
  const [ inputVal, setInputVal ] = useState(placeHolderText)
  const inputRef = useRef(null)

  useEffect(() => {
    !inputRef.current &&
      console.error(
        `Input ref did not get set. Something is wrong with the input component!`
      )

    inputRef.current.focus()
    if (inputVal !== placeHolderText) inputRef.current.value = inputVal
  }, [inputVal])
  return (
    <View>
      <View style={{ flexDirection: 'row', marginBottom: 15 }}>
        <Input
          ref={inputRef}
          style={{ marginRight: 15 }}
          onValueChange={setInputVal}
          value={inputVal}
        />
        <Button
          themePath='button.contained.primary'
          onClick={() =>
            setCollapsedHeight(parseInt(inputRef.current.value) || 50)
          }
          content={'apply height'}
        />
      </View>
      <TextToggle
        text={longText}
        collapsedHeight={collapsedHeight}
      />
    </View>
  )
}
TextToggle.defaultProps = {
  isExpandedInit: false,
  togglePosition: 'right',
  collapsedHeightPercentage: 0.5,
  fadeColor: 'white',
}

// Re-export the Component with the default props defined to be used in the MDX story
export { TextToggle }
