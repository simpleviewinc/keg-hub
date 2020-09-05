import React from 'react'
import { TouchableOpacity } from 'react-native'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'
import { useClassName } from '../../hooks/useClassName'
import { noOpObj } from '../../utils/helpers/noop'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

const isWeb = getPlatform() === 'web'
const Text = KegText('link')

const Element = React.forwardRef((props, ref) => {
  const {
    classNames=noOpObj,
    dataSet=noOpObj,
    elProps,
    children,
    href,
    onPress,
    target,
    style,
    ...attrs
  } = props

  const linkRef = useClassName(classNames.link, dataSet, ref, 'keg-link')
  
  return (
    <TouchableOpacity
      dataSet={ dataSet }
      {...elProps}
      {...attrs}
      ref={linkRef}
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
    </TouchableOpacity>
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
