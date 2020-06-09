
import React from 'react'
import { storiesOf } from '@storybook/react'
import { AppHeader, Button, View, Text, Icon } from '../..'
import { StoryWrap } from 'StoryWrap'
import { action } from '@storybook/addon-actions'

storiesOf('Display | AppHeader', module)

  .add('AppHeader', () =>
    <StoryWrap style={{ paddingTop: 30 }} >

      <AppHeader
        title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
      />

      <p/>
      
      <AppHeader
        title={"Styled Title & height"}
        styles={{
          container:{ height: 100 },
          center: { content: { title: {color: '#1e6073', fontStyle: 'italic', fontWeight: 'bold'} } }
        }}
        RightComponent={<Button onClick={action('right button clicked')}> custom right button </Button>}
        leftIcon={'arrow-left'}
        onLeftClick={action("Left Section Clicked!")}
      />
       
      <p/>

      <AppHeader
        shadow
        title={"With Shadow, Custom Icon, no left action"}
        styles={{ container: { height: 70, backgroundColor: 'red' } }}
        leftIcon={'android'}
        rightIcon={'search'}
        onRightClick={action("Right Section Clicked!")}
      />

    </StoryWrap>
  )
  .add('Plain', () => 
    <StoryWrap style={{ paddingTop: 30 }} >
      <AppHeader />
    </StoryWrap>
  )
  .add('Custom Sections', () => 
    <StoryWrap style={{ paddingTop: 30 }} >
      <AppHeader
        title={'Title'} 
        LeftComponent={
          <View style={{backgroundColor: 'blue', width: '100%', height: '100%'}}>
            <Text> Custom left section </Text>
          </View>
        }
        RightComponent={
          <Icon name={'beer'}/>
        }
        CenterComponent={
          <Button themePath="button.contained.secondary" onClick={ action(" Center Button Clicked!") }>
            Custom center section btn
          </Button>
        }
      />
    </StoryWrap>
  )
