import { unstable_createElement as RNCreateElement } from 'react-native'

export const createElement = (Element, props, ...children) => {
  const childs = props.children || children

  return RNCreateElement(Element, props, ...childs)
}