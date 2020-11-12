import { components } from './components'
import { display } from './display'
import { flex } from './flex'
import { form } from './form'
import { helpers } from './helpers'
import { layout } from './layout'
import { transform } from './transform'
import { transition } from './transition'
import { typography } from './typography'
import { setThemeDefaults } from './themeDefaults'

export const theme = (config={}) => {
  const defaults = setThemeDefaults(config.defaults)

  return {
    display,
    flex,
    helpers,
    transform,
    transition,
    form: form(config),
    layout: layout(config),
    colors: defaults.colors,
    margin: defaults.margin,
    padding: defaults.padding,
    typography: typography(config),
    ...components(config),
  }
}
