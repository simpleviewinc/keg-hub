require('module-alias/register')

const { get } = require('@svkeg/jsutils')
const { getGlobalConfig } = require('KegUtils/globalConfig/getGlobalConfig')
const { getGitKey } = require('KegUtils/git/getGitKey')

/**
 * Gets the save git key in globalConfig and prints is, so the bash script can pick it up
 * If no key is found, it does nothing
 *
 * @returns {void}
 */
const findGitKey = async () => {
  const gitKey = await getGitKey(getGlobalConfig())
  gitKey && console.log(gitKey)
}

;(async () => {
  await findGitKey()
})()