import React, { useCallback, useMemo } from 'react'
import { Button } from '@keg-hub/keg-components'
import { Linking } from 'react-native'

/**
 * @param {string} homepage 
 * @param {string} version 
 * @return {Function} - callback for opening the release notes page for the 
 * tap version
 */
const useOpenHomepageCallback = (homepage, version) => useCallback(
  () => {
    if (!homepage) return

    const versionEndpoint = version ? `/v${version}` : ''
    const uri = `${homepage}/releases/${versionEndpoint}`

    Linking
      .canOpenURL(uri)
      .then(supported => supported 
        ? Linking.openURL(uri)
        : console.warn('Don\'t know how to open uri', uri)
      )
  },
  [ homepage ]
)

/**
 * Simple button that displays the current version of the tap and, if clicked,
 * links the user to the release notes on github
 * @param {Object} props
 * @param {String} props.version - version to display (defaults to using the package.json version)
 * @param {String} props.homepage - homepage to link to
 * @param {Object} props.styles - custom styles for keg-components Button
 * 
 */
export const VersionDisplay = props => {
  const { 
    version = process.env.TAP_VERSION || '<Missing Version>', 
    homepage = process.env.TAP_HOMEPAGE,
    styles
  } = props

  const openHomepage = useOpenHomepageCallback(homepage, version)

  const buttonStyles = useMemo(() => ({ 
    ...versionStyles, 
    ...styles 
  }), [ styles ])

  return (
    <Button
      onPress={openHomepage}
      styles={buttonStyles}
      content={'v' + version}
    />
  )
}

const versionStyles = {
  main: {
    position: 'fixed',
    zIndex: 999999,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    boxShadow: '0px 0px 6px',
  },
  content: {
    color: 'white',
    fontWeight: 'bold',
  },
}
