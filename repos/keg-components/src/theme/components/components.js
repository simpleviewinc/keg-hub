import { button } from './button'
import { card } from './card'
import { divider } from './divider'
import { drawer } from './drawer'
import { filePicker } from './filePicker'
import { icon } from './icon'
import { image } from './image'
import { indicator } from './indicator'
import { link } from './link'
import { list } from './list'
import { loading } from './loading'
import { section } from './section'
import { textBox } from './textBox'
import { modal } from './modal'
import { header } from './header'
import { textToggle } from './textToggle'

export const components = config => {
  return {
    ...button(config),
    ...card(config),
    ...divider(config),
    ...drawer(config),
    ...filePicker(config),
    ...icon(config),
    ...image(config),
    ...indicator(config),
    ...link(config),
    ...list(config),
    ...loading(config),
    ...section(config),
    ...textBox(config),
    ...modal(config),
    ...header(config),
    ...textToggle(config),
  }
}
