import React from 'react'
import { KegText } from 'KegText'
const Paragraph = KegText('paragraph')

export const P = props => {
  return (
    <>
      <Paragraph {...props} />
      { '\n' }
    </>
  )
}
