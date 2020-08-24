import { Values } from 'SVConstants'
import { deepFreeze } from '@svkeg/jsutils'
const { IssueTypes } = Values

/**
 * Error indicating an action was sent to the Items reducer with an invalid payload or state
 */
export class ItemsRequestError extends Error {
  /**
   * @param {Array} issues - an array of Issues, in the form {type, message}. @see MakeRequestIssue for possible values
   */
  constructor(issues) {
    super()
    this.issues = issues
    this.message = this.reduceIssuesIntoMessage(issues)
  }

  /**
   * Returns the issues reduced to a single string message. This is a helper for the ItemsRequestError constructor to set
   * the message of the error to this function's result.
   * @param {Array} issues - array of issue objects of form {type, message}. @see MakeRequestIssue for possible issues
   * @returns the issues reduced to a string
   */
  reduceIssuesIntoMessage(issues) {
    return issues.reduce(
      (str, { type, message }) => `${str} \n\t- ${type}: ${message}`,
      `Error: invalid items store request. Reason(s): `
    )
  }

  /**
   * @param {String} issueTypeName - a string identifying an issue. @see IssueTypes for possible values.
   * @returns true if this ItemsRequestError instance has an issue of the specified IssueType name
   */
  hasIssue(issueTypeName) {
    return this.issues.map(issue => issue.type).includes(issueTypeName)
  }
}

/**
 * A map of item request issue creators. @see IssueTypes for keys. Values are
 * functions that each return an issue object of form { type, message }.
 * used in redux exception handlers for the items reducer.
 */
export const MakeRequestIssue = deepFreeze({
  [IssueTypes.InvalidState]: state => ({
    type: IssueTypes.InvalidState,
    message: `State must be a defined object. Found: ${state}`,
  }),
  [IssueTypes.InvalidCategory]: category => ({
    type: IssueTypes.InvalidCategory,
    message: `Category must be defined. Found: ${category}`,
  }),
  [IssueTypes.MissingCategory]: (category, allCategories) => ({
    type: IssueTypes.MissingCategory,
    message: `Category ${category} does not exist in items store. Current categories: ${allCategories}`,
  }),
  [IssueTypes.InvalidItemsType]: items => ({
    type: IssueTypes.InvalidItemsType,
    message: `Items data must be either an object or an array. Found: ${
      items && typeof items
    }`,
  }),
  [IssueTypes.InvalidItemAndKey]: (item, key) => ({
    type: IssueTypes.InvalidItemAndKey,
    message: `Both item and key were undefined. One of these must be defined for an item request.`,
  }),
  [IssueTypes.MissingKey]: category => ({
    type: IssueTypes.MissingKey,
    message: `The key was undefined. This is required for a setItem request. Category: ${category}`,
  }),
  [IssueTypes.MismatchedItemTypes]: (
    existingType,
    nextType,
    category,
    key
  ) => ({
    type: IssueTypes.MismatchedItemTypes,
    message: `Cannot merge items of different types on upsert.  
      Path: ${category}/${key ? key : ''}
      Existing type at path: ${existingType}
      Received type: ${nextType}
    `,
  }),
})
