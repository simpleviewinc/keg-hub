import React, { useMemo } from 'react'
import { View, Link } from '@keg-hub/keg-components'

/**
 * @param {string} homepage 
 * @param {string} version 
 * @return {string} the uri to the tap's release notes for the specified version
 */
const getReleaseNotesURI = (homepage, version) => {
  const versionEndpoint = version ? `v${version}` : ''
  return `${homepage}/releases/${versionEndpoint}`
}

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

  const releaseURI = getReleaseNotesURI(homepage, version)

  const mergedStyles = useMemo(() => ({ 
    ...versionStyles, 
    ...styles 
  }), [styles])

  return (
    <View style={mergedStyles.main}>
      <Link
        href={releaseURI}
        style={mergedStyles.content}
        target={'_blank'}
      >
        { 'v' + version }
      </Link>
    </View>
  )
}

const versionStyles = {
  main: {
    position: 'fixed',
    zIndex: 999998,
    padding: 8,
    borderRadius: 8,
    bottom: 0,
    right: 0,
    margin: 10,
    backgroundColor: '#808080',
    boxShadow: '0px 0px 6px',
  },
  content: {
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}
