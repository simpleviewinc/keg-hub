const { exec } = require('child_process');
  
const link = (repoName, alias) => {
  return new Promise((res, rej) => {
    const cmd = `REPO_NAME=${repoName} ALIAS_NAME=${alias} bash ./linkRepos.sh`
    exec(cmd, err => {
      err ? rej(err) : res({repoName, alias})
    })
  })
}

const tryLink = async (name, alias) => {
  try {
    return await link(name, alias)
  }
  catch (err) {
    console.error('Linking Error:', err)
  }
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
    .reduce(
      async (acc, [ alias, name ]) => {
        await acc
        return tryLink(name, alias)
      },
      Promise.resolve()
    )
}

module.exports = { linkRepos }

;(require.main == module) && linkRepos()