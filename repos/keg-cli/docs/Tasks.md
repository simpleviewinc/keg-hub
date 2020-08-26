
# Cli Task 

### Task Model
* A task file export should match the Task Model with the following keys
  ```js
  {
    alias: Array,
    name: String,
    options: Object,
    example: String,
    action: Function,
    description: String,
    locationContext: String,
  }
  ```
**Key Descriptions**
* `name` - The name of the command. Each must be unique the parent task **Required**
* `alias` - Alternate names of the `name` key, which can be used in-lue of the `name` key
* `description` - Long form description of the task **Required**
  * Is printed out to the terminal
  * Some helpers are included to provided better formatting
    * See the [terminal documentation](../utils/terminal.md)
* `options` - Allowed options of the task
  * See options model below for more information
* `locationContext` - **Docker Tasks Only** - Location a docker command should be run from
  * `docker-compose` - Commands should be run from the `keg-containers` folder
  * `docker` - 
* `action` - Function to run for the task **Required**
  * Gets passed an `arguments` object, with the following keys
    * `globalConfig` - See the `Global Config Object` for more information
    * `command` - Name of the current command being run
    * `options` - Arguments passed from the command line
    * `params` - Options converted into key/value pairs
      * Sets defaults where needed
      * Ensures all required options exist
        * If missing, an error is throw before the action is called
    * `tasks` - All loaded `tasks` of the `keg-cli`
    * `task` - the `task` object of the `action` being run


### Task Option Model
* A task option should match the Task Option Model with the following keys
```js
{
  name: String,
  alias: Array,
  allowed: Array,
  required: Boolean,
  enforced: String,
  description: String,
  default: Boolean,
}
```
**Key Descriptions**
* `name` - **Required** Name of the option. Key in the `params` object passed to a `task` action
* `alias` - Alternate names of the `name` key, which can be used in-lue of the `name` key 
* `allowed` - List of allowed values of the option. Will throw if value is not one of these options
* `required` - Makes the option required when calling the task. Will throw if the option does not exist
* `enforced` - States the `action` requires the argument, but will not throw if it doesn't exist
* `description` - Describes the option
* `default` - Value used when no value is passed for the option


