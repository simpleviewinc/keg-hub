import React, { Component } from 'react'
import { Provider } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { stringHasher } from '../helpers/stringHasher'
import { checkCall, isStr } from '@keg-hub/jsutils'

const overrideTags = ['title', 'meta']
const canUseDOM = hasDomAccess()

/**
 * HeadProvider - Component used to apply styles to the Dom when on a web Platform
 */
export class HeadProvider extends Component {

  // For tags that can be overwritten
  ids = new Map()

  // For tags that can check for duplication
  hashes = new Map()

  /**
   * Updates an existing tag for tags that can be overwritten
   * @member HeadProvider.state
   * @function
   * @param {string} tag - Dom Element tag name that uses the styles of the passed in ID
   * @param {string|number} id - Id of the styles tag to be added
   * 
   * @returns {Object} Index of the newly added tag
   */
  updateOverrideTag = () => {
    this.setState(state => {
      const names = state[tag] || []
      return { [tag]: [...names, name] }
    })

    // Track ids for updating and removal at a later time
    const { ids } = this
    const index = ids.has(tag) ? ids.get(tag) + 1 : 0
    ids.set(tag, index)

    return index
  }

  checkDuplication = (tag, children, index) => {
    if(!isStr(children)) return true

    const hash = isStr(children) && stringHasher(children)
    if(hash === index) return true
    
    const exists = this.hashes.has(hash)

    if(exists) return false

    // Hash is being set here, which causes every setInitialHash to fail
    // Need a way to also set the ID from the has of the first element that renders
    // Then in setInitialHash check if the id matches the hash, and just return the hash
    // Otherwise return -1
    this.hashes.set(hash, tag)
    return true
  }


  setInitialHash = (tag, children) => {
    if(!isStr(children)) return -1

    const hash = isStr(children) && stringHasher(children)

    if(this.hashes.has(hash)) return -1
    
    
    this.hashes.set(hash, tag)

    return hash
  }

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
    addTag: (tag, children, id) => {
      return overrideTags.includes(tag)
        ? this.updateOverrideTag(tag, id)
        : this.setInitialHash(tag, children)
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
    shouldRender: (tag, index, children) => {
      return !overrideTags.includes(tag)
        ? this.checkDuplication(tag, children, index)
        : checkCall(() => {
            const names = this.state[tag]
            return names && names.lastIndexOf(names[index]) === index
          })
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
    removeTag: (tag, index) => {
      this.setState(state => {
        return !state[tag]
          // this will need to be update at some point to remove the last tag
          // when it's actually removed from the dom
          ? null
          : checkCall(() => {
              const names = state[tag]
              names[index] = null
              return { [tag]: names }
            })
      })
    },

  }

  render() {
    return canUseDOM && (
      <Provider value={this.state}>
        {this.props.children}
      </Provider>
    )
  }
}
