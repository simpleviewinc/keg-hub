const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const path = require('path')
const cliIndex = path.join(__dirname, '../../../', 'keg')

/**
 * Ensure the cli index is executable
 *
 * @returns {void}
 */
const makeExecutable = async () => {
  // Call command to make executable
  const { stderr } = await cmdExec(
    `chmod +x ${cliIndex}`,
    {
      groupID: process.getgid(),
      userID: process.getuid(),
      maxBuffer: Infinity,
      env: process.env,
      cwd: path.join(__dirname, '../')
    }
  )
  
  // If there was an error throw it
  if (stderr) throw new Error(stderr)

}

makeExecutable()