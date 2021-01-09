import React from "react";
import { StoryWrap } from './storyWrap'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  viewMode: 'docs'
}

export const decorators = [
  (Story) => (
    <StoryWrap>
      <Story />
    </StoryWrap>
  ),
];