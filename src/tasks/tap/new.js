const newTap = (args) => {
  console.log(`--- newTap a cli command ---`)
}

module.exports = {
  name: 'new',
  action: newTap,
  description: `Creates a new tap based on the passed in options`,
  example: 'keg tap new <options>'
}