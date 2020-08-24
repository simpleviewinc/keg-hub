const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const kegDir = path.join(__dirname, '../../../')

// Set the cmd options to ensure script is allowed to update permissions
const cmdOpts = {
  groupID: process.getgid(),
  userID: process.getuid(),
  maxBuffer: Infinity,
  env: process.env,
  cwd: kegDir,
}

/**
 * Runs yarn install from within the keg directory
 */
const doYarnInstall = async () => {
  console.log(`--- Running yarn install for Keg ---`)
  const { stderr } = await cmdExec(`yarn install`, cmdOpts)
  if (stderr) throw new Error(stderr)
}

/**
 * Checks if expo and react node_modules are install
 * If not, then calls doYarnInstall
 */
const checkForNodeModules = () => {
  console.log(`--- Checking for installed Keg node_modules! ---`)
  const checkModules = [
    path.join(kegDir, 'node_modules/expo'),
    path.join(kegDir, 'node_modules/react'),
    path.join(kegDir, 'node_modules/@svkeg/tap-resolver'),
  ]

  return checkModules.map(dir => fs.existsSync(dir))
}

;(async () => {
  const installed = checkForNodeModules()

  try {
    installed.indexOf(false) !== -1 && (await doYarnInstall())
    console.log(`--- Keg node_modules are installed! ---`)
  }
  catch (err) {}

  process.exit(0)
})()
