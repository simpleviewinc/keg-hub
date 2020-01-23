import React from 'react'
import dynamic from 'next/dynamic'

const NoSsr = props => <React.Fragment>{ props.children }</React.Fragment>

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
})
