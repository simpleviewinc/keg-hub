import React from 'react'
import { View } from 'SVComponents'
import { withTheme } from 're-theme'
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
      <View style={{ ...theme.tabs.wrapper }} >
        { children }
      </View>
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
