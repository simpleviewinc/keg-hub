import { noOpObj } from '@keg-hub/jsutils'
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

export const theme = (config=noOpObj) => {
  const defaults = setThemeDefaults(config)

  return {
    colors: defaults.colors,
    margin: defaults.margin,
    padding: defaults.padding,
    form: form(config),
    flex: flex(config),
    layout: layout(config),
    helpers: helpers(config),
    display: display(config),
    transform: transform(config),
    transition: transition(config),
    typography: typography(config),
    ...components(config),
  }
}
