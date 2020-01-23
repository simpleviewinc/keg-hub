import { applyToCloneOf, isObj, isArr } from 'jsutils'
import { MakeRequestIssue } from './error'
import { Values } from 'SVConstants'
const { IssueTypes } = Values

/**
 * Returns object with boolean key isValid as true if the request is valid, else key is false and a string key 'reason' will be defined that lists the errors
 * @param {object} state - redux state object
 * @param {*} category - key for a category beneath state
 * @param {*} key - key of object within category. For arrays, an index; for objects, a key
 * @param {*} item - item object itself. Either key or item should be defined, not both.
 * @returns object of structure: { isValid: boolean, issues: [Issue] } -- issues is empty if isValid is true
 */
export const isValidItemRequest = (state, category, key, item) => {
  const issues = []

  // check all the requirements
  if (!isObj(state)) {
    const issue = MakeRequestIssue[IssueTypes.InvalidState](state)
    issues.push(issue)
  }

  if (!category) {
    const issue = MakeRequestIssue[IssueTypes.InvalidCategory](category)
    issues.push(issue)
  }

  if (!state[category]) {
    const issue = MakeRequestIssue[IssueTypes.MissingCategory](
      category,
      Object.keys(state)
    )
    issues.push(issue)
  }

  if (key === undefined && item === undefined) {
    const issue = MakeRequestIssue[IssueTypes.InvalidItemAndKey](item, key)
    issues.push(issue)
  }

  const isValid = issues.length === 0

  return { isValid, issues: Object.freeze(issues) }
}

/**
 * Returns object with boolean key isValid as true if the request is valid, else key is false and a string key 'reason' will be defined that lists the errors
 * @param {object} state - redux state object
 * @param {*} category - key for a category beneath state
 * @param {*} items - items object/array itself.
 * @returns object of structure: { isValid: boolean, issues: [Issue] } -- issues is empty if isValid is true
 */
export const isValidItemsRequest = (state, category, items) => {
  const issues = []

  // check all the requirements
  if (!isObj(state)) {
    const issue = MakeRequestIssue[IssueTypes.InvalidState](state)
    issues.push(issue)
  }

  if (!category) {
    const issue = MakeRequestIssue[IssueTypes.InvalidCategory](category)
    issues.push(issue)
  }

  if (!isArr(items) && !isObj(items)) {
    const issue = MakeRequestIssue[IssueTypes.InvalidItemsType](items)
    issues.push(issue)
  }

  const isValid = issues.length === 0

  return { isValid, issues: Object.freeze(issues) }
}

/**
 * Returns the next state with the error stored in category, if it is defined, or else the root
 * @param {object} state - state object
 * @param {*} category - items store category
 * @param {*} error - an Error object representing an invalid request
 * @returns clone of state with error inserted
 */
export const handleInvalidRequest = (state, category, error) =>
  stateWithError(state, category, error)

/* Helpers */
/**
 * Helper: Returns clone of the state, with the error set in the category
 * @param {object} state
 * @param {string} category
 * @param {Error} error
 */
const stateWithError = (state, category, error) => {
  return applyToCloneOf(state, clone => {
    // if category is defined, store error there. If it is not defined, store error in the root of the store
    const categoryData = category && clone[category] ? clone[category] : clone
    categoryData.error = error
  })
}
