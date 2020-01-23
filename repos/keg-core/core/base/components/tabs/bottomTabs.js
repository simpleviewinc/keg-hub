import React from 'react'
import { View } from 'SVComponents'
import { withTheme } from 're-theme'
import { BottomNavigation } from 'material-bread'
import PropTypes from 'prop-types'

export const BottomTabs = withTheme(props => {
  const {
    onChange,
    theme,
    activeTab,
    children,
    backgroundColor,
    actionItems,
  } = props
  const tabStyle = { alignItems: 'center', ...theme.tabs.root }

  return (
    <View style={tabStyle}>
      <BottomNavigation
        style={{ ...theme.tabs.wrapper }}
        backgroundColor={
          backgroundColor || theme.tabs.wrapper.backgroundColor || 'transparent'
        }
        value={activeTab}
        handleChange={onChange}
        actionItems={actionItems}
      >
        { children }
      </BottomNavigation>
    </View>
  )
})

BottomTabs.propTypes = {
  onChange: PropTypes.func,
  activeTab: PropTypes.string,
  backgroundColor: PropTypes.string,
  actionItems: PropTypes.array,
  theme: PropTypes.object,
  style: PropTypes.object,
}
