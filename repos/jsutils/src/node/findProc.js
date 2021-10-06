const { exec } = require('child_process')

/**
 * Parses the output of the search command
 * Loops over each line and checks if the line contains the passed in process name
 * @function
 * @private
 * @param {string} procName - The executable name to check
 * @param {string} output - Output of the process search command
 *
 * @returns {Object} - Status of the found process
 */
const parseOutput = (procName, output) => {
  return output.trim()
    .split(/\n|\r|\r\n/)
    .reduce((acc, line) => {

      const [pid, tty, time, ...rest] = line.trim()
        .split(' ')
        .filter(part => part)

      const cmd = rest.join(' ')
      cmd &&
        cmd.includes(procName) &&
        acc.push({
          tty,
          time,
          cmd,
          procName,
          running: true,
          pid: parseInt(pid, 10),
        })

      return acc
    }, [])
}

/**
 * Gets the command used to search for the process based on the platform
 * @function
 * @private
 * @param {string} procName The executable name to check
 * @param {string} platform - Name of the platform running the command
 *
 * @returns {string} - Search command to use
 */
const getPlatformCmd = (procName, platform) => {
  const proc = `"[${procName[0]}]${procName.substring(1)}"`

  switch (platform) {
    case 'linux':
    case 'darwin': return `ps -A | grep ${proc}`
    case 'win32': return `tasklist`
    default: return false
  }
}

/**
 * Searches for a currently process by name, and returns it if found
 * @function
 * @public
 * @param {string} procName The executable name to check
 * @param {Object} opts - Options to configure how the method runs
 *
 * @returns {Object} - Status of the found process
 */
const findProc = (procName, opts={}) => {
  return new Promise((res, rej) => {
    const platform = process.platform
    // Use the platform to know the correct search command
    const cmd = getPlatformCmd(procName, platform)
    if(!cmd) return rej(`Error: ${platform} platform not supported.`)

    // Run the search command, and compare the output
    exec(cmd, (err, stdout, stderr) => {
      err || stderr
        ? rej(stderr || err.message)
        : res(parseOutput(procName, stdout))
    })
  })
  .catch(err => {
    opts.log && console.error(err.message)
    return []
  })
}

module.exports = {
  findProc
}