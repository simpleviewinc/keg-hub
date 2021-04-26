const { exec } = require('child_process');
  
const link = (repoName, alias) => {
  return new Promise((res, rej) => {
    const cmd = `REPO_NAME=${repoName} ALIAS_NAME=${alias} bash ${__dirname}/linkRepo.sh`
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

// map of aliases to tap repo names, needed for ci actions
const taps = {
  retheme: 're-theme',
}

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