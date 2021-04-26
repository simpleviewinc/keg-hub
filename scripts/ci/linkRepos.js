const { exec } = require('child_process');

const link = async (repoName, alias) => {
  return await exec(`keg && cd repos/${repoName} && keg tap link ${alias}`)
}

// map of aliases to repo names
const repos = {
  core: 'keg-core',
  components: 'keg-components',
  retheme: 're-theme',
  resolver: 'tap-resolver',
  jsutils: 'jsutils',
}

const linkRepos = () => {
  Object
    .entries(repos)
    .map(async ([ alias, name ]) =>
      await link(name, alias)
    )
}

module.exports = { linkRepos }