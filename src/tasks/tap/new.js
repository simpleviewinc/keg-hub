/*
  * What newTap method should do
    1. Use inquirer to get all needed into to create a new tap
    2. Clone the base tap repo from github locally
      * Still needs to be created
    3. Fill any templates in the base tap repo with data from step 1
    4. Add the taps location to the global config
      * This will then allow it to pull to location later when starting the tap
*/
const newTap = (args) => {
  console.log(`--- newTap a cli command ---`)
}

module.exports = {
  name: 'new',
  action: newTap,
  description: `Creates a new tap based on the passed in options`,
  example: 'keg tap new <options>'
}