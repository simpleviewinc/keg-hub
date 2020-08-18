const { getGitKey } = require('KegUtils')

const printGitKey = async (args) => {
  const { globalConfig } = args
  const key = await getGitKey(globalConfig)
  console.log(key)
}

module.exports = {
  print: {
    name: 'print',
    action: printGitKey,
    description: `Prints the store github key in plain text`,
    example: 'keg git key print',
  }
}
