import React from 'react'
import { ReThemeProvider } from '../context/reThemeProvider'
import { HeadProvider } from './headProvider'

export const ReThemeHeadProvider = props => {
  return (
    <ReThemeProvider {...props} >
      <HeadProvider>
        { props.children }
      </HeadProvider>
    </ReThemeProvider>
  )
}
