/*
  * What newTap method should do
    1. Use @keg-hub/ask-it to get all needed into to create a new tap
    2. Clone the base tap repo from github locally
      * Still needs to be created
    3. Fill any templates in the base tap repo with data from step 1
    4. Add the taps location to the global config
      * This will then allow it to pull to location later when starting the tap
*/

/**
 * Creates a new tap project
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const newTap = (args) => {
  console.log(`--- newTap a cli command ---`)
}

module.exports = {
  new: {
    name: 'new',
    action: newTap,
    description: `Creates a new tap based on the passed in options`,
    example: 'keg tap new <options>'
  }
}