

const fromImage = (task, action) => ({
  alias: [ 'fr' ],
  description: 'Image to use as the FROM directive when building. Overwrites KEG_IMAGE_FROM env when set. KEG_IMAGE_FROM env must be set as the FROM value in the Dockerfile.',
  example: `keg ${task} ${action} --from <custom-image-url>`,
})

const tagVariable = (task, action) => ({
  alias: [ 'tagvariable', 'variable', 'tVar', 'tvar', 'Var', 'var', 'tagV', 'tagv', 'tv' ],
  allowed: [
    'branch',
    'branch:commit',
    'branch:package',
    'branch:version',
    'br',
    'br:cm',
    'br:pkg',
    'br:vr',
    'b:c',
    'b:p',
    'b:v',
    'commit',
    'commit:package',
    'commit:version',
    'cm',
    'cm:pkg',
    'cm:vr',
    'c:p',
    'c:v',
    'env',
    'env:branch',
    'env:commit',
    'env:package',
    'env:version',
    'env:br',
    'env:cm',
    'env:pkg',
    'env:vr',
    'package',
    'pkg',
    false
  ],
  description: 'Create a tag through variable replacement using one or more parts',
  example: `keg ${task} ${action} --variable branch:version`,
  type: 'array'
})

module.exports = {
  fromImage,
  tagVariable,
}