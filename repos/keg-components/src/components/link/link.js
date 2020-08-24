import React from 'react'
import { TouchableOpacity } from 'react-native'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'

const isWeb = getPlatform() === 'web'
const Text = KegText('link')

const Element = React.forwardRef(
  ({ elProps, children, href, onPress, target, style, ...props }, ref) => (
    <TouchableOpacity
      {...elProps}
      {...props}
      ref={ref}
    >
      <Text
        style={style}
        href={href}
        accessibilityRole='link'
        target={target}
      >
        { children }
      </Text>
    </TouchableOpacity>
  )
)

const Link = props => <LinkWrapper
  {...props}
  Element={Element}
  isWeb={isWeb}
/>

Link.propTypes = {
  href: PropTypes.string,
  onPress: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}

export { Link, Link as A }
