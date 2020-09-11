import React from 'react'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import { Touchable } from '../touchable'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'
import { useClassList } from 'KegClassList'

const isWeb = getPlatform() === 'web'
const Text = KegText('link')

const Element = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    elProps,
    href,
    onPress,
    style,
    target,
    ...attrs
  } = props

  return (
    <Touchable
      className={useClassList('keg-link', className)}
      {...elProps}
      {...attrs}
      touchRef={ref}
    >
      <Text
        accessibilityRole='link'
        className='keg-link-text'
        style={style}
        href={href}
        target={target}
      >
        { children }
      </Text>
    </Touchable>
  )
})

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
