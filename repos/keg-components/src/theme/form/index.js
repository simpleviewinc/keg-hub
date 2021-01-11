import { form as formTheme } from './form'
import { checkbox } from './checkbox'
import { checkGroup } from './checkGroup'
import { input } from './input'
import { option } from './option'
import { radio } from './radio'
import { select } from './select'
import { switchStyles } from './switch'

export const form = config => {
  return {
    checkbox: checkbox(config),
    checkGroup: checkGroup(config),
    form: formTheme(config),
    input: input(config),
    option: option(config),
    radio: radio(config),
    select: select(config),
    switch: switchStyles(config),
  }
}
