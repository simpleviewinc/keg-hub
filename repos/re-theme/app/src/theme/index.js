import { app } from './app'
import { components } from './components'
import { display } from './display'
import { join } from './join'
import { padding, margin, flex, layout } from './layout'
import { setDefaultTheme } from 're-theme'
import { transition } from './transition'

export const theme = setDefaultTheme({
  app,
  components,
  display,
  flex,
  join,
  layout,
  margin,
  padding,
  transition,
})
