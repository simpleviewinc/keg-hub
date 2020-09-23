import { button } from './button'
import { card } from './card'
import { divider } from './divider'
import { drawer } from './drawer'
import { filePicker } from './filePicker'
import { icon } from './icon'
import { image } from './image'
import { indicator } from './indicator'
import { link } from './link'
import { loading } from './loading'
import { section } from './section'
import { textBox } from './textBox'
import { modal } from './modal'
import { header } from './header'
import { textToggle } from './textToggle'

export const components = config => {
  return {
    button: button(config),
    card: card(config),
    divider: divider(config),
    drawer: drawer(config),
    filePicker: filePicker(config),
    icon: icon(config),
    image: image(config),
    indicator: indicator(config),
    link: link(config),
    loading: loading(config),
    section: section(config),
    textBox: textBox(config),
    modal: modal(config),
    header: header(config),
    textToggle: textToggle,
  }
}
