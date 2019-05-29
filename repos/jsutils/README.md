# jsUtils

A small (60.8 KiB) utility library for commonly used helper methods.

## Install

  * Download the repo
    ```js
      // Clone repo
      git clone https://github.com/lancetipton/jsUtils.git
      // Or Add to package.json
      "dependencies": {
        "jsUtils": "git+https://github.com/lancetipton/jsUtils.git"
        ...
      },
    ```
  * Add to your code
    ```js
      // * Import into code
        import jsUtils from 'jsUtils'
        // Or only the methods you need
        import { capitalize } from 'jsUtils/string'
        import { reduceObj, mapObj } from 'jsUtils/object'

      // * Or require code
        const jsUtils = require('jsUtils')
      
      // * Add as html script
        <script src='/path/to/jsUtils/build/jsUtils.min.js'></script>
        // jsUtils will be available on the window 
        <script>
          const jsUtils = window.jsUtils
          
        </script>
    ```

## API Methods

### Object

  * **Obj.clearObj**
    * Removes all properties from an object
    * @param { object } obj - object to remove properties from
    * @param { array } filter - list of keys to not remove
    * @returns { null }
    
  * **Obj.cloneJson**
    * Clones an object by converting to JSON string and back
    * @param { object } obj - object to clone
    * @returns { object } copy of original object

  * **Obj.deepFreeze**
    * Recursively freezes and object
    * @param  { object } obj
    * @return { object } - frozen Object

  * **Obj.deepMerge**
    * Deep merges an array of objects together
    * @param { array } sources - array of objects to join
    * @returns { object | array } - merged object or array

  * **Obj.get**
    * Searches an object based on the path param
    * i.e. path = 'data.foo.bar' => will return obj.data.foo.bar
    * If bar does not exist, then will return obj.data.foo
    * @param  { object } obj - will search the object based on the path
    * @param  { string || array } path - . separated string to search the object
    * @return the final value found from the path

  * **Obj.isObj**
    * Checks is data is an object and not an array
    * @param { object } obj - data to check
    * @returns { boolean }

  * **Obj.jsonEqual**
    * Compares two objects by converting to JSON, and checking string equality
    * @param  { object || array } one - object to compare with param two
    * @param  { object || array } two - object to compare with param one
    * @return { boolean } status of equality

  * **Obj.mapObj**
    * Map over and objects props and values
    * @param  { object } obj
    * @return { array } -  returned values from callback

  * **Obj.pickKeys**
    * Creates a new object from passed in object with keys defined from array
    * @param  { object } target - object to pull keys from
    * @param  { array } keys - keys to add to new object
    * @return { object } new object with only keys from passed in keys array

  * **Obj.omitKeys**
    * Creates a new object from passed in object with keys not defined from array
    * @param  { object } target - object to pull keys from
    * @param  { array } keys - keys to not add to new object
    * @return { object } new object with only keys not in array

  * **Obj.reduceObj**
    * Loop over and objects props and values and reduce to new object
    * @param  { object } obj
    * @return { object } - updated object

  * **Obj.sanitizeCopy**
    * Copies object and sanitizes all html strings in an object's properties
    * @param  { object } obj to be sanitize
    * @return { object } - obj with strings sanitized

  * **Obj.set**
    * Adds a path to an object.
    * If the path already exists, but not in the correct format it will be replaced
    * path is built from a . separated string
    * i.e. path = 'data.foo.bar' => obj.data.foo.bar will be created on the object
    * @param  { object } obj - object to have the path added to it
    * @param  { string || array } path - path that should be created on the object, separated by .
    * @param  { any } finalValue - when ever the final value of the path should be
    * @return the obj param

  * **Obj.trimStringFields**
    * Trims objects string fields
    * @param  { object } object
    * @return { object } - object with string fields trimmed

  * **Obj.unset**
    * Removes a path from an object ( opposite of set )
    * @param  { object } obj - parent object containg attr to remove
    * @param  { string || array } path - path of attr to remove, separated by string
    * @return the passed in object, with the attribute found at the path removed
 
### String

  * **Str.camelCase**
    * Converts a string to camel case
    * @param  { string } string to be converted
    * @return { string } - string in camel case format

  * **Str.clean**
    * Converts `-` and `_` to white space and removes `.`
    * @param  { string } string to be converted
    * @return { string } - cleaned string

  * **Str.capitalize**
    * Converts first letter of a string to be capitalized
    * @param  { string } string
    * @return { string } - Passed in string, but capitalized

  * **Str.isEmail**
    * Check if string is a email
    * @param  { string } string to check
    * @return { boolean } - if it's a email

  * **Str.isPhone**
    * Check if string is a phone number
    * @param  { string } string to check
    * @return { boolean } - if it's a phone number

  * **Str.isStr**
    * Check if data is a string
    * @param  { string } string
    * @return { boolean } - if it's a string

  * **Str.isUrl**
    * Check if string is a url
    * @param  { string } string to check
    * @return { boolean } - if it's a url
 
  * **Str.isUuid**
    * Check if string is a uuid
    * @param  { string } string to check
    * @return { boolean } - if it's a uuid
 
  * **Str.parseJSON**
    * Convert JSON string into object, wrapped in a try / catch
    * @param  { string } string
    * @return { object } - JSON object

  * **Str.plural**
    * Adds an `s` to the end of a string, if one does not exist
    * @param  { string } str - string to convert
    * @return { string } string as a plural

  * **Str.removeDot**
    * Removes a `.` in a string
    * @param  { string } str - string to convert
    * @return { string } - string without the `.`

  * **Str.sanitize**
    * Sanitize a string of HTML content
    * @param  { string } string
    * @return { string } - cleaned string

  * **Str.singular**
    * Remove an `s` at the end of a string, if the last char is an `s`
    * @param  { string } str - string to convert
    * @return { string } string as singular

  * **Str.styleCase**
    * Converts a string to css in js format
    * Useful for converting css rules into js format, I.E. margin-top => marginTop
    * @param  { string } str - string to be converted
    * @return { string } - string in style case format

  * **Str.trainCase**
    * Converts a string to train case
    * @param  { string } string to be converted
    * @return { string } - string wit spaces converted to lodash and all lowercase

  * **Str.wordCaps**
    * Converts all words in a string to be capitalized
    * @param  { string } string to be converted
    * @return { string } - string with all words capitalized

### Method

  * **Method.checkCall**
    * Check if the passed in method is a function, and calls it
    * @param  { function } method - function to call
    * @param  { object } params - params to pass to the method on call
    * @return { any } - whatever the passed in method returns

  * **Method.debounce**
    * Ensures a function is not called to many times
    * @param  { function } func - function to call
    * @param  { number } wait - how long to wait between function calls
    * @param  { boolean } immediate - should call immediately
    * @return { void }
  
  * **Method.isFunc**
    * Check if the passed in item is a function
    * @param  { any } test 
    * @return { boolean } is a function
  
  * **Method.uuid**
    * Creates a uuid, unique up to around 20 million iterations. good enough for us
    * @param  { number } start of the uuid
    * @return { string } - build uuid

### Promise

  * **Promise.promisifyAll**
    * Converts Objects method properties into promiseAsync
    * allow using promisifyAll
    * @param  { object } object
    * @return { object } - promisified object

  * **Promise.promisify**
    * Polyfill to promisify a method that uses the standard node.js callback structure
    * @param  { function } method - method to turn into a promise
    * @return method as a promise