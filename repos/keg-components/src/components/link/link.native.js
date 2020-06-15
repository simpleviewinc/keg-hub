import React from 'react'
import { isStr, checkCall } from 'jsutils'
import { TouchableOpacity, Linking } from 'react-native'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import PropTypes from 'prop-types'

const Text = KegText('link')

const openLink = (url, onPress) => {
  return event => {
    isStr(url) &&
      Linking.openURL(url).catch(err =>
        console.error('Could not open url!', err)
      )

    checkCall(onPress, event, url)
  }
}

/**
 * Link
 * @summary Custom Link component. All props are optional
 *
 *
 */
const Element = React.forwardRef(
  ({ elProps, children, href, onPress, style, ...props }, ref) => (
    <TouchableOpacity
      {...elProps}
      {...props}
      ref={ref}
      onPress={openLink(href, onPress)}
    >
      <Text style={style}>{ children }</Text>
    </TouchableOpacity>
  )
)

const Link = props => <LinkWrapper
  {...props}
  Element={Element}
/>

Link.propTypes = {
  href: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}

export { Link, Link as A }
