const addComponent = () => {
  console.log(`--- add component command ---`)
}

module.exports = {
  name: 'add',
  action: addComponent,
  description: `Add a new component to the keg-components repo`,
  example: 'keg component add <component name>'
}