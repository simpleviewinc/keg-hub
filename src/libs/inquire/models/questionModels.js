
/**
### Question
  A question object is a hash containing question related values

  * type: (String) Type of the prompt. Defaults: input - Possible values: input, number, confirm, list, rawlist, expand, checkbox, password, editor

  * name: (String) The name to use when storing the answer in the answers hash. If the name contains periods, it will define a path in the answers hash.

  * message: (String|Function) The question to print. If defined as a function, the first parameter will be the current inquirer session answers. Defaults to the value of name (followed by a colon).
  default: (String|Number|Boolean|Array|Function) Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.

  * choices: (Array|Function) Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers. Array values can be simple numbers, strings, or objects containing a name (to display in list), a value (to save in the answers hash) and a short (to display after selection) properties. The choices array can also contain a Separator.

  * validate: (Function) Receive the user input and answers hash. Should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.

  * filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash.

  * transformer: (Function) Receive the user input, answers hash and option flags, and return a transformed value to display to the user. The transformation only impacts what is shown while editing. It does not modify the answers hash.

  * when: (Function, Boolean) Receive the current user answers hash and should return true or false depending on whether or not this question should be asked. The value can also be a simple boolean.
  pageSize: (Number) Change the number of lines that will be rendered when using list, rawList, expand or checkbox.

  * prefix: (String) Change the default prefix message.

  * suffix: (String) Change the default suffix message.
*/

const { isFunc, isObj, isStr } = require('@ltipton/jsutils')

const defaultModel = {
  name: 'question',
}

const buildModel = (type, custom) => ({
  ...defaultModel,
  ...type,
  message: (isStr(custom) || isFunc(custom)) && custom,
  ...(isObj(custom) && custom)
})

const checkbox = custom => buildModel({
  type: 'checkbox',
  name: 'checkbox',
  default: [],
}, custom)

const confirm = custom => buildModel({
  type: 'confirm',
  name: 'confirm',
  default: false,
}, custom)

// The editor to use is determined by reading the $VISUAL or $EDITOR environment variables. If neither of those are present, notepad (on Windows) or vim (Linux or Mac) is used.
const editor = custom => buildModel({
  type: 'editor',
  name: 'editor',
  default: 0,
}, custom)

const expand = custom => buildModel({
  type: 'expand',
  name: 'expand',
  default: 0,
  choices: [ '' ],
}, custom)

const input = custom => buildModel({
  type: 'input',
  name: 'input'
  default: '',
}, custom)


const list = custom => buildModel({
  type: 'list',
  name: 'list',
  default: 0,
  choices: [ '' ],
}, custom)

const number = custom => buildModel({
  type: 'number',
  name: 'number',
  default: 0,
}, custom)

const rawlist = custom => buildModel({
  type: 'rawlist',
  name: 'rawlist',
  default: 0,
  choices: [ '' ],
}, custom)

const password = custom => buildModel({
  type: 'password',
  name: 'password',
  default: '',
}, custom)

module.exports = {
  checkbox,
  confirm,
  editor,
  expand,
  input,
  list,
  number,
  password,
  rawlist,
}