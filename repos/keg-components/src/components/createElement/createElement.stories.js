import React from 'react'
import { storiesOf } from '@storybook/react'
import { StoryWrap } from 'StoryWrap'
import { createElement } from './createElement'

const storyStyles = { textAlign: 'center' }

const testProps =  {
  id: 'button-id',
  classList: ['button-class'],
  role: 'button',
  style: {
    backgroundColor: '#02B4A3',
    color: '#FFFFFF',
    width: 150,
    height: 50,
  }
}

const renderElement = (comp, props, ...children) => {
  return createElement(comp, props, ...children)
}

storiesOf('Components/createElement', module).add('Default', () => (
  <StoryWrap style={storyStyles}>
    { renderElement('button', testProps, 'Custom Button') }
  </StoryWrap>
))
