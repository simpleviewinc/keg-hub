const { allowedTagOpts } = require('../../getters/getTagVarMap')

const fromImage = (task, action) => ({
  alias: [ 'fr' ],
  description: 'Image to use as the FROM directive when building. Overwrites KEG_BASE_IMAGE env when set. KEG_BASE_IMAGE env must be set as the FROM value in the Dockerfile.',
  example: `keg ${task} ${action} --from <custom-image-url>`,
})

const tagVariable = (task, action) => ({
  alias: [ 'tagvariable', 'variable', 'tVar', 'tvar', 'Var', 'var', 'tagV', 'tagv', 'tv' ],
  allowed: allowedTagOpts,
  description: 'Create a tag through variable replacement using one or more parts',
  example: `keg ${task} ${action} --variable branch:version`,
  type: 'array'
})

module.exports = {
  fromImage,
  tagVariable,
}