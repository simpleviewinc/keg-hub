import React from 'react'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import { Touchable } from '../touchable'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'
import { useClassName } from '../../hooks/useClassName'
import { noPropObj } from '../../utils/helpers/noop'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

const isWeb = getPlatform() === 'web'
const Text = KegText('link')

const Element = React.forwardRef((props, ref) => {
  const {
    classNames=noPropObj,
    dataSet=noPropObj,
    elProps,
    children,
    href,
    onPress,
    target,
    style,
    ...attrs
  } = props

  return (
    <Touchable
      className={spacedJoin(classNames.link, 'keg-link')}
      dataSet={ dataSet }
      {...elProps}
      {...attrs}
      ref={ref}
    >
      <Text
        className={spacedJoin(classNames.text, 'keg-link-text')}
        style={style}
        href={href}
        accessibilityRole='link'
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
