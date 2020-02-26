const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const path = require('path')
const rootDir = path.join(__dirname, '../../../')
const cliIndex = path.join(rootDir, 'keg')

/**
 * Ensure the cli index is executable
 *
 * @returns {void}
 */
const makeExecutable = async () => {
  // Call command to make executable
  console.log(`Making keg executable...`)
  const { stderr } = await cmdExec(
    `chmod +x ${cliIndex}`,
    {
      groupID: process.getgid(),
      userID: process.getuid(),
      maxBuffer: Infinity,
      env: process.env,
      cwd: rootDir
    }
  )
  
  // If there was an error throw it
  if (stderr) throw new Error(stderr)

}

module.exports = {
  makeExecutable
}