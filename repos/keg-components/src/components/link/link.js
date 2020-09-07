import React from 'react'
import { LinkWrapper } from './link.wrapper'
import { KegText } from 'KegText'
import { Touchable } from '../touchable'
import PropTypes from 'prop-types'
import { getPlatform } from 'KegGetPlatform'
import { noPropObj } from '../../utils/helpers/noop'
import { useClassList } from '../../hooks/useClassList'

const isWeb = getPlatform() === 'web'
const Text = KegText('link')

const Element = React.forwardRef((props, ref) => {
  const {
    classNames = noPropObj,
    dataSet = noPropObj,
    elProps,
    children,
    href,
    onPress,
    target,
    style,
    ...attrs
  } = props

  const linkCls = useClassList(classNames.link, ['keg-link'])
  const textCls = useClassList(classNames.text, ['keg-link-text'])

  return (
    <Touchable
      className={linkCls}
      dataSet={dataSet}
      {...elProps}
      {...attrs}
      ref={ref}
    >
      <Text
        accessibilityRole='link'
        className={textCls}
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
