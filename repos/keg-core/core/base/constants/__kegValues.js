import { keyMap, deepMerge } from 'jsutils'
import { Values as TapValues } from 'SVConstants/values'

export const Values = deepMerge(
  {
    /**
     * HTTP request methods
     */
    HttpMethods: keyMap([ 'GET', 'POST', 'DELETE', 'PUT', 'PATCH' ], true),

    /**
     * Enum, describing issues with payload encountered on an Items reducer request.
     */
    IssueTypes: keyMap(
      [
        'InvalidState',
        'InvalidCategory',
        'MissingCategory',
        'InvalidItemsType',
        'InvalidItemAndKey',
      ],
      false
    ),

    /**
     * 1:1 Constants
     */
    ...keyMap(['PageNotFoundContainer'], false),
  },
  TapValues
)
