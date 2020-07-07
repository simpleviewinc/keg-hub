# AskIt
Wrapper around [inquirer](https://www.npmjs.com/package/inquirer) to make asking questions in Node CLIs easier.

## Setup

### Install It
Add to your package.json

  ```js
    "askIt": "git+https://github.com/lancetipton/askIt.git"
  ```

### Use It
See an [example here](https://github.com/lancetipton/askIt/blob/master/scripts/validate.js)

```js
;(() => {

  const { ask, separator, models } = require('askIt')

  // See src/models/models for more information
  const questionModelObject = {
    // Add the default input model
    ...models.input,
    // Override with custom values
    type: 'Question type',
    name: 'Name of the question',
    message: 'Question to ask',
    default: 'Default value if user enters nothing',
  }

  // Pass the model directly to the ask method
  // Returns a value entered by the user or the default
  const askResponse = await ask({ ...questionModelObject })

  // Ask a true / false question
  // Returns a boolean
  const confirmResponse = await ask.confirm('Ask a confirm question?')

  // Ask for text input
  // Returns a string of the entered text
  const inputResponse = await ask.input('Ask for text input')
  
  // Ask for a password / secret - input will be hidden
  // Returns a string of the entered text
  const passwordResponse = await ask.password('Ask for hidden text input')

  // Ask for user to select an option from a list of options
  // Returns the index of the select option within the passed in array
  const listResponse = await ask.promptList([
    'Option 1',
    'Option 2',
    'Option 3',
  ])

})()

```

## API

### ask
  * *@type* `function`
  * *@param*  `Object` - a question model object
    * See [src/models/models.js](https://github.com/lancetipton/askIt/blob/master/src/models/models.js)
  * **ask.confirm**
    * *@type* `function`
    * *@param*  `string` - The true / false question to ask
    * Helper method to ask a true/false question
    * Accepts a `string` used as the question asked to the user
  * **ask.input**
    * *@type* `function`
    * *@param*  `string` - The text input question to ask
    * Helper method to ask a text input question
  * **ask.password**
    * *@type* `function`
    * *@param*  `string` - The text input question to ask
    * Same as `ask.input`, except user input is hidden
  * **ask.promptList**
    * *@type* `function`
    * *@param*  `array` - List of options to present to the user
    * Asks the user to select from a list of options
    * @returns - `index` of the selected item from the passed in `options`
****
### separator
  * *@type* `function`
  * Helper that returns `new inquirer.Separator()`

### models
  * *@type* `Object`
  * Prebuilt question models with defaults already set
  * Expected to be overwritten with custom values as needed
  * **Question model object**
    * Matches the [inquirer questions](https://github.com/SBoudrias/Inquirer.js#questions) model

