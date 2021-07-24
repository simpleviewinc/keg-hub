import React, { useState } from 'react'
import { Sidebar } from './sidebar'
import { StoryWrap } from 'StoryWrap'
import { Text } from '../typography/text'
import { Link } from '../link'
import { Label } from '../typography/label'
import { Subtitle } from '../typography/subtitle'

import { SectionList } from '../list/sectionList'

const goatData = [{
  title: `Sections`,
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

const listStyles = {
  main: {
    width: '100%',
    padding: 10,
  },
  content: {
    divider: {},
    container: {
      width: '100%',
    },
    list: {},
    hidden: {},
  },
}

const sidebarStyles = {
  main: {
    paddingTop: 0,
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
  }
}

export const Basic = props => {
  
  const [toggled, setToggled] = useState(false)

  return (
    <Sidebar
      to={0}
      initial={-200}
      type={'spring'}
      toggled={toggled}
      onToggled={setToggled}
      config={sideBarConfig}
      styles={sidebarStyles}
    >
      <SectionList
        activeSection={0}
        sections={goatData}
        styles={listStyles}
        keyExtractor={item => item}
        renderSectionHeader={({ section }) => {
          return (
            <Label
              key={section.title}
              style={{
                marginBottom: 10,
                paddingLeft: 0,
                paddingBottom: 5,
                borderBottom: `1px solid #edf2f9`,
              }}
            >
              { section.title }
            </Label>
          )
        }}
        renderItem={({ item }) => {
          return (
            <Subtitle style={{ marginBottom: 10, paddingLeft: 10 }}>
              <Link style={{ fontSize: 14, textDecorationLine: 'none' }} >
                { item }
              </Link>
            </Subtitle>
          )
        }}
      />
    </Sidebar>
  )
}

/**
 * Tells the story wrap decorator to not wrap the component in a container
 */
Basic.noStoreWrap = true