import React, { Component } from 'react'
import * as ReactDOM from 'react-dom'
import { Consumer } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'

export class HeadElement extends Component {

  headTags = null
  index = -1
  canUseDOM = hasDomAccess()

  componentDidMount() {
    const { tag, name, property } = this.props
    this.index = this.headTags.addTag(tag, name || property)
  }

  componentWillUnmount() {
    const { tag } = this.props
    this.headTags.removeTag(tag, this.index)
  }

  render() {
    const { tag: Tag, ...rest } = this.props

    return (
      <Consumer>
        {headTags => {

          this.headTags = headTags

          return this.canUseDOM &&
            headTags.shouldRender(Tag, this.index) &&
            ReactDOM.createPortal(<Tag {...rest} />, document.head)

        }}
      </Consumer>
    )
  }
}
