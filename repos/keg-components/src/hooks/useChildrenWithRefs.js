import React, { useRef, useMemo, useCallback } from 'react'
import { handleRefUpdate } from '../utils/helpers/handleRefUpdate'

/**
 * Returns the dynamic props object for the child
 * @param {Object<string, RefObject>} childRefs - the map of child refs
 * @param {ReactElement} child - the child component
 * @param {number} index - the index the child is rendered at (only used if child doesn't have a `key` defined)
 */
const buildPropsForChild = (childRefs, child, index) => {
  // the ref-setter for each child will make use of that child's key identifier,
  // or the index if the key is not defined
  const key = child?.key || index || child
  const existingRef = child?.ref
  return {
    key,
    ref: childRef => {
      handleRefUpdate(existingRef, childRef)
      childRefs.current[key] = childRef
    },
  }
}

/**
 * Returns a memoized function for cloning a child react element
 * @param {RefObject<Object>} childRefs - the ref to the object of child refs
 * @return {Function} - the fn to clone a child
 */
const useCloneChildCallback = childRefs =>
  useCallback(
    (child, index = 0) => {
      const props = buildPropsForChild(childRefs, child, index)
      return React.isValidElement(child)
        ? React.cloneElement(child, props)
        : child
    },
    [childRefs]
  )

/**
 * If `enable` is true, returns a cloned array of the children, each with the
 * ref props set. Otherwise, returns the children unmodified. If the refs props were used,
 * the child refs will be accessible in a ref object in the return tuple. Also handles
 * merging any existing ref props the consumer defined.
 *
 * Notes:
 *  - it's assumed that the children
 * @param {*} children
 * @param {boolean?} enable - whether to actually clone the children with ref props or not. Defaults to true. We use this because hooks should not be called conditionally.
 * @return {Array<children, RefObject<Object<string, RefObject>>>} - an array for destructuring:
 *  [ children, childRefs ]
 * @example
 * const [ updatedChildren, childRefs ] = useChildrenWithRefs(children)
 * const doSomethingWithChildRefs = () => Object.values(childRefs.current)
 *  .map(ref => doSomething(ref.current))
 * return (
 *  <>
 *    <Button onPress={doSomethingWithChildRefs} />
 *    { updatedChildren }
 *  </>
 * )
 */
export const useChildrenWithRefs = (children, enable = true) => {
  // Store a map of child keys mapped to their refs.
  // The value is an object, not an array, because using an array
  // could quickly fill up with duplicate refs
  const childRefs = useRef({})

  // function to clone a child with the correct props
  const cloneChild = useCloneChildCallback(childRefs)

  const updatedChildren = useMemo(() => {
    // if enabled, clone the children, otherwise just return them
    return enable
      ? React.Children.count(children) > 1
        ? children.map(cloneChild)
        : cloneChild(children)
      : children
  }, [ enable, children ])

  return [ updatedChildren, childRefs ]
}
