import { keyMap, deepMerge } from '@keg-hub/jsutils'
import { Values as TapValues } from 'KegConstants/values'
import { PluginValues } from './__kegPluginValues'

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
        'MissingKey',
        'InvalidItemsType',
        'InvalidItemAndKey',
        'MismatchedItemTypes',
      ],
      false
    ),

    /**
     * 1:1 Constants
     */
    ...keyMap(['PageNotFoundContainer'], false),
  },
  TapValues,
  PluginValues
)
