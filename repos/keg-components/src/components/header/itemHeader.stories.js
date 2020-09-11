import React from 'react'
import { storiesOf } from '@storybook/react'
import { ItemHeader, Button, View, Image, Touchable } from '../'
import { Android, ArrowLeft, Search } from '../../assets/icons'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'

const buttonStyles = {
  main: { backgroundColor: 'transparent' },
  content: { color: 'black', fontWeight: 'bold' },
}
const CustomComponentButtons = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 5,
      }}
    >
      <Button
        onClick={action('About Clicked!')}
        styles={buttonStyles}
      >
        About
      </Button>
      <Button
        onClick={action('Contacts Clicked!')}
        styles={buttonStyles}
      >
        Contacts
      </Button>
      <Button
        onClick={action('Careers Clicked!')}
        styles={buttonStyles}
      >
        Careers
      </Button>
    </View>
  )
}

const SVIcon = () => {
  return (
    <Touchable
      activeOpacity={0.5}
      onPress={action('Image clicked')}
    >
      <Image
        styles={{
          resizeMode: 'contain',
          paddingLeft: 20,
          height: 40,
          width: 200,
          alignSelf: 'center',
        }}
        useLoading={false}
        src='https://www.trilogyed.com/blog/wp-content/uploads/2020/07/simpleview_primary-696x110.png'
      />
    </Touchable>
  )
}

const headerStyles = {
  main: { height: 90, backgroundColor: '#bebebe', paddingHorizontal: '20px' },
  content: {
    right: {
      main: {
        maxWidth: '50%',
        justifyContent: 'flex-end',
      },
    },
  },
}
const headerStyles2 = {
  main: { height: 70, backgroundColor: '#00A4E4' },
  content: {
    center: {
      content: {
        title: { color: 'black' },
      },
    },
  },
}

storiesOf('Header/ItemHeader', module)
  .add('Custom style & section', () => (
    <StoryWrap style={{ paddingTop: 30 }}>
      <ItemHeader
        styles={headerStyles}
        shadow
        LeftComponent={<SVIcon />}
        RightComponent={<CustomComponentButtons />}
      />

      <p />

      <ItemHeader
        shadow
        title={'Custom Icons, no left action'}
        styles={headerStyles2}
        LeftIconComponent={Android}
        RightIconComponent={Search}
        onRightClick={action('Right Section Clicked!')}
      />
    </StoryWrap>
  ))
  .add('Plain', () => (
    <StoryWrap style={{ paddingTop: 30 }}>
      <ItemHeader
        shadow
        title={'Keg Components'}
      />
      <p />

      <ItemHeader
        shadow
        title={
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
      />

      <p />
      <ItemHeader
        title={'Clickable left icon'}
        LeftIconComponent={
          <ArrowLeft
            style={{
              color: `#FFFFFF`,
              fontSize: 30,
              paddingLeft: 10,
            }}
          />
        }
        onLeftClick={action('Left Section Clicked!')}
      />
    </StoryWrap>
  ))
