import React, { Component } from 'react'
import { Provider } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'

/**
 * HeadProvider - Component used to apply styles to the Dom when on a web Platform
 */
export class HeadProvider extends Component {

  ids = new Map()

  canUseDOM = hasDomAccess()

  state = {

    /**
     * Adds a tag to the array referenced by the passed in id
     * @member HeadProvider.state
     * @function
     * @param {string} tag - Dom Element tag name that uses the styles of the passed in ID
     * @param {string|number} id - Id of the styles tag to be added
     * 
     * @returns {Object} Index of the newly added tag
     */
    addTag: (tag, id) => {
      const tags = this.ids.get(id) || []
      tags.push(tag)
      this.ids.set(id, tags)

      return tags.length - 1
    },

    /**
     * Checks if the style tag should be rendered
     * @member HeadProvider.state
     * @function
     * @param {string} tag - Dom Element tag name that uses the styles of the passed in ID
     * @param {number} index - Location of the tag in the tags array
     * @param {string|number} id - Id of the styles tag to be added
     * 
     * @returns {Object} Index of the newly added tag
     */
    shouldRender: (tag, index, id) => {
      return !this.state.enforceId(tag, id)
    },

    /**
     * Removes a tag from the tags array
     * @member HeadProvider.state
     * @function
     * @param {string} tag - Dom Element tag name that uses the styles of the passed in ID
     * @param {number} index - Location of the tag in the tags array
     * @param {string|number} id - Id of the styles tag to be removed
     * 
     * @returns {void}
     */
    removeTag: (tag, index, id) => {
      let tags = this.ids.get(id)
      index = index || tags.indexOf(tag)
      tags = index >= -1 && tags.splice(index, 1)

      !tags.length
        ? this.ids.delete(id)
        : this.ids.set(id, tags)
    },

    /**
     * Checks if a hash exits as an id
     * @member HeadProvider.state
     * @function
     * @param {string} hash - randomized string representation of a styles object
     * 
     * @returns {boolean} - True if the hash exists
     */
    hasHash: hash => {
      const tags = this.ids.get(hash)
      return Boolean(tags && tags.length)
    },

    /**
     * Checks if a tag is in an array tied to an id
     * <br/>If it's not then it will create the id in the Map pointing to an array containing the tag
     * @member HeadProvider.state
     * @function
     * @param {string} tag - Dom Element tag name that uses the styles of the passed in ID
     * @param {string|number} id - Id of the styles tag to be removed
     * 
     * @returns {void}
     */
    enforceId: (tag, id) => {
      const tags = this.ids.get(id) || []

      if(tags.includes(tag)) return id

      // Have to add the tag here, otherwise other components
      // that use the same Id will not know it's already been registered
      this.state.addTag(tag, id)

      return false
    }
  }

  render() {
    return this.canUseDOM && (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}
