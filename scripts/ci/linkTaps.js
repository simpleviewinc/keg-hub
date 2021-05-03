const { exec } = require('child_process');
  
  /**
   * Actually calls the `keg x link` task
   * @param {string} repoName 
   * @param {string} alias 
   * @returns {Promise}
   */
const link = (repoName, alias) => {
  return new Promise((res, rej) => {
    const cmd = `REPO_NAME=${repoName} ALIAS_NAME=${alias} bash ${__dirname}/linkRepo.sh`
    exec(cmd, err => {
      err ? rej(err) : res({repoName, alias})
    })
  })
}

/**
 * Attempts to link the tap
 * @param {string} name 
 * @param {string} alias 
 * @returns {Promise} - link promise
 */
const tryLink = async (name, alias) => {
  try {
    return await link(name, alias)
  }
  catch (err) {
    console.error('Linking Error:', err)
  }
}

// map of aliases to tap repo names, needed for other ci actions
// TODO: update this with keg-core once we make it an injected tap
const taps = {
  retheme: 're-theme',
  components: 'keg-components'
}

/**
 * Links all of the taps defined in `taps` object above
 */
const linkTaps = () => {
  Object
    .entries(taps)
    .reduce(
      async (acc, [ alias, name ]) => {
        await acc
        return tryLink(name, alias)
      },
      Promise.resolve()
    )
}

module.exports = { linkTaps }

;(require.main == module) && linkTaps()