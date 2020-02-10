import { colors } from 'SVTheme/colors'
import { components } from 'SVTheme/components'
import { display } from 'SVTheme/display'
import { helpers } from 'SVTheme/helpers'
import { join } from 'SVTheme/join'
import { text } from 'SVTheme/text'
import { theme as tapTheme } from 'SVTheme/tapIndex'
import { padding, margin, flex, layout } from 'SVTheme/layout'
import { deepMerge } from 'jsutils'

export const theme = deepMerge(
  {
    components,
    colors,
    display,
    flex,
    helpers,
    join,
    layout,
    margin,
    padding,
    text,
  },
  tapTheme
)
