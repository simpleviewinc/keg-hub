import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { StoryWrap } from 'StoryWrap'
import { Text } from '../typography/text'
import { Label } from '../typography/label'
import { Subtitle } from '../typography/subtitle'

import { SectionList } from '../list/sectionList'

const goatData = [{
  title: `Goat Sections`,
  data: [
    'Goat of Olde',
    'Goat Bio',
    'Goat Grub'
  ],
}]

const sideBarConfig = {
  speed: 1,
  bounciness: 1,
}

export const Basic = props => {
  
  const [toggled, setToggled] = useState(false)

  return (
    <StoryWrap>
      <Sidebar
        to={0}
        initial={-150}
        type={'spring'}
        toggled={toggled}
        onToggled={setToggled}
        config={sideBarConfig}
      >
        <SectionList
          sections={goatData}
          renderSectionHeader={({ section }) => (
            <Label style={{ marginBottom: 5 }}>
              { section.title }
            </Label>
          )}
          renderItem={({ item }) => {
            return (
              <Subtitle style={{ marginBottom: 5, paddingLeft: 10 }}>
                { item }
              </Subtitle>
            )
          }}
        />
      </Sidebar>
    </StoryWrap>
  )
}
