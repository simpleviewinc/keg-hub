
# Cli Task 

### Task Export
* A task file export should look like this
  ```js
  module.exports = {
    prefix: String,
    name: String,
    cmd: Any|String|Function,
    args: [ Array of Strings ],
    action: Function,
    description: String,
  }
  ```
**Api**
  * prefix - Group prefix for the command. Allow joining like commands **Required**
    * For example the prefix `tap`, would be for all tap commands
      * Command examples `tap run <name of tap>` | `tap install <name of tap>`
  * name - The name of the command. Each must be unique to the prefix **Required**
    * For example `tap run` and `keg run` is ok, but two `tap run` commands is not allowed.
  * cmd - This can string or a function **Optional**
    * Used for passing extra default arguments to the action,
    * If it's a function it will be called and the result will be passed to the action
    * If it's a string, it will be executed in a child_process
      * The child_process will be executed with `cmd` and `args`
      * Example => `child_process.spawn(cmd, args || [])`
    * Anything else will be passed to the action as the first argument
  * args - Passed to the child_process when `cmd` is a string **Optional**
    * Each item in the array sould be a single word, without spaces
    * For args with spaces, it should be separated into multiple items
      *  Example => `[ '-l /Users' ]`, should be `[ '-l', '/Users' ]`
  * action - Function to run for the task **Required**
    * Always run after the cmd, when the cmd is a function
    * The cmd or the cmd output (when it's a function) will be passed to the action
  * description - Long form description of the task **Required**
    * Is printed out to the terminal
    * Some helpers are included to provided better formatting
      * See the [terminal documentation](../utils/terminal.md)
