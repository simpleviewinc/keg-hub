import React from 'react'
import { LinkWrapper } from './link.wrapper'
import PropTypes from 'prop-types'
import { KegText } from 'KegText'
const KegLink = KegText('link')

/**
 * Link
 * @summary Custom Link component. All props are optional
 *
 *
 */
const Element = React.forwardRef(({ elProps, children, ...props }, ref) => {
  return (
    <KegLink
      {...elProps}
      {...props}
      ref={ref}
    >
      { children }
    </KegLink>
  )
})

const Link = props => <LinkWrapper
  {...props}
  isWeb={true}
  Element={Element}
/>

Link.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  type: PropTypes.string,
}

export { Link, Link as A }
