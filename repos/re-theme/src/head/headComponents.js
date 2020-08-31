import React from 'react'
import { HeadElement } from './headElement'

export const Title = props => (<HeadElement tag="title" {...props} />)

export const Style = props => (<HeadElement tag="style" {...props} />)

export const Meta = props => (<HeadElement tag="meta" {...props} />)

export const Link = props => (<HeadElement tag="link" {...props} />)
