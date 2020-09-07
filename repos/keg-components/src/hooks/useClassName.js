import { useCallback } from 'react'
import { checkCall, isObj } from '@keg-hub/jsutils'

/**
 * Returns a function that should be set as the element ref
 * <br/>Returned function updates the element to include a className
 * <br/>Class Name can from from the className prop, dataSet.class value and the defClass value 
 * @param {String} className - Class to add to the element
 * @param {Object} dataSet - data-* attributes, uses the data-class attribute to set the className
 * @param {Object|function} ref - Ref object passed to the consuming component
 * @param {string} defClass - Default class to add to the component
 *
 * @returns {function} - Ref function to be added to the component
 */
export const useClassName = (className, dataSet, ref, defClass) => {

  return useCallback(element => {
    if(element){
      defClass && element.classList.add(defClass)
      dataSet && dataSet.class && dataSet.class.split(' ').map(toAdd => element.classList.add(toAdd))
      className && className.split(' ').map(toAdd => element.classList.add(toAdd))
    }

    isObj(ref) && (current in ref)
      ? ref.current = element
      : checkCall(ref, element)

  }, [ dataSet, className, ref, defClass ])

}