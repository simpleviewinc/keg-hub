import { getPlatform } from 'KegGetPlatform'
import { ensureClassArray } from '../../utils/helpers/ensureClassArray'
const isWeb = getPlatform() === 'web'

/**
 * Helper to update the classNames on a Dom node
 * @param {Object} element - Dom node element
 * @param {RefObject<Array<string>>} classesRef - Array of classes currently on the element
 * @param {string} defClass - Default keg-components class always on the element
 * @param {string|Array[string]} className - Class or classes to add to the element
 *
 * @returns {void}
 */
export const updateClassNames = (element, classesRef, defClass, className) => {
  if (!isWeb || !('classList' in element)) return

  // Add the default classes to the classList
  defClass && element.classList.add(defClass)

  // Ensure we have a flat array
  const classArr = ensureClassArray(className)

  // Loop over the previous classes, and see if any have been removed
  classesRef.current.map(
    cls => cls && classArr.indexOf(cls) === -1 && element.classList.remove(cls)
  )

  // Update our ref with the new classes
  // Which will allows us to check them for updates on next render
  classesRef.current = classArr

  // Add the classes to the element
  classArr.map(cls => element.classList.add(...cls.split(' ')))
}
