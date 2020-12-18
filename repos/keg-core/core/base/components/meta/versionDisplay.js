import React, { useCallback } from 'react'
import { Button } from '@keg-hub/keg-components'
import { colors } from 'SVTheme/colors'
import { getWindow } from 'SVUtils/platform/getWindow'

// probably should make a native version that uses linking
const useOpenHomepageCallback = (homepage, version) => useCallback(
  () => {
    const versionEndpoint = version ? `/v${version}` : ''
    const uri = `${homepage}/releases/${versionEndpoint}`
    homepage && getWindow()?.open(uri)
  },
  [ homepage ]
)

/**
 * Simple button that displays the current version of the tap and, if clicked,
 * links the user to the release notes on github
 * @param {Object} props
 * @param {String} props.version - version to display (defaults to using the package.json version)
 */
export const VersionDisplay = props => {
  const { 
    version = process.env.TAP_VERSION || '<Missing Version>', 
    homepage = process.env.TAP_HOMEPAGE
  } = props

  console.log( FOO_BAR )

  const openHomepage = useOpenHomepageCallback(homepage, version)

  return (
    <Button
      onPress={openHomepage}
      styles={styles}
      content={'v' + version}
    />
  )
}

const styles = {
  main: {
    position: 'fixed',
    zIndex: 999999,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    backgroundColor: colors.second || 'gray',
    boxShadow: '0px 0px 6px',
  },
  content: {
    color: 'white',
    fontWeight: 'bold',
  },
}
