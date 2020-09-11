import React from 'react'
import { HeadElement } from './headElement'

export const Title = props => (<HeadElement Tag="title" {...props} />)

export const Style = props => (<HeadElement Tag="style" {...props} />)

export const Meta = props => (<HeadElement Tag="meta" {...props} />)

export const Link = props => (<HeadElement Tag="link" {...props} />)
