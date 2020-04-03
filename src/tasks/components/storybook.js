// storybook
const storybook = () => {
  console.log(`--- add component command ---`)
}

module.exports = {
  name: 'storybook',
  alias: [ 'sb' ],
  action: storybook,
  description: `Run storybook in development mode`,
  example: 'keg component storybook <options>'
}