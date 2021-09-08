

/**
 * Adds a dom node to the dom.
 * First checks if it exists, and it it does not, then it adds it to the Dom
 * @param {string} selectorId - CSS selector for check if the dom node already exists
 * @param {string} type - Type of dom node to add to the dom
 * @param {location} location - Dom Location where the node should be added, relative to the document
 *
 * @returns {Object} - The dom node that was added to the dom
 */
export const ensureElement = (selectorId, type, location) => {
  let domNode = document[location].querySelector(`#${selectorId}`)
  if(domNode) return domNode

  domNode = document.createElement(type)
  domNode.id = selectorId
  document[location].append(domNode)

  return domNode
}