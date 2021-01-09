/* eslint-disable */

import React from 'react'
import { Text as KegText } from '../components/typography'
import { Button as KegButton } from '../components/button'
import { reStyle } from '@keg-hub/re-theme/reStyle'

const Text = reStyle(KegText)({
  color: 'green',
  textAlign: 'center',
})

export const GreenText = () => <Text>Green Text</Text>

const ReStyleHover = reStyle(
  KegButton,
  'styles'
)((theme, props) => ({
  default: {
    main: {
      backgroundColor: theme.colors.palette.blue03,
    },
  },
  hover: {
    main: {
      backgroundColor: props.hoverColor,
    },
  },
}))

export const HoverButton = () => {
  return <ReStyleHover content={'Hover Me'} hoverColor={`#02b4a3`} />
}
