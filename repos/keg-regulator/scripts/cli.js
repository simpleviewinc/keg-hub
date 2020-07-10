const path = require("path")
const { ask } = require("askIt")
const { spawnCmd } = require('spawn-cmd')
const { Logger } = require("askIt/src/logger")
const regulatorRoot = path.join(__dirname, '../')
const testsRoot = path.join(__dirname, '../tests')

// TODO: Add ability to load a config based on an ENV
// This way each environment could have a different config
// Also need to add config options for settings within selenium

/**
 * Config settings for the CLI
 * @type Object
 */
const cliConfig = {
  firstRun: true,
  autoArchive: false,
  archiveDir: path.join(testsRoot, `./reports`),
  exitOnError: true
}

/**
 * Exits the CLI
 * @type function
 *
 * @returns {void}
 */
const exitCLI = () => {
  Logger.spacedMsg(`Have a good day!`)
  process.exit(0)
}

/**
 * Clears the terminal
 * @type function
 *
 * @returns {void}
 */
const clearTerminal = () => {
  process.stdout.write('\033c')
}

/**
 * Handles errors in the cli
 * @type function
 * @param {Object} err - Error the was thrown
 *
 * @returns {boolean} - false
 */
const handelError = err => {
  Logger.error(err.stack)
  cliConfig.exitOnError && exitCLI()

  return false
}

/**
 * Wraps a task function and handles calling it
 * <br/>Once it's finished, it calls renderUI again
 * @type function
 * @param {function} cd - Task function to run
 *
 * @returns {void}
 */
const askWrap = cb => {
  return async (cmd, options) => {

    Logger.empty()

    try {
      const response = await cb(cmd, options)
    }
    catch(err){
      handelError(err)
    }

    return renderUI()
  }
}

/**
 * Checks if the autoArchive is toggled, and if so calls the archive script
 * @type function
 *
 * @returns {void}
 */
const checkAutoArchive = () => {

  // Run the archive script if autoArchive is set to true
  return cliConfig.autoArchive
    ? spawnCmd(`bash`, {
      args: [ `./scripts/archive.sh`, cliConfig.archiveDir ],
      cwd: testsRoot
    })
    : true
}

/**
 * Checks if tests have been run yet
 * <br/>If not, then calls the testGrid script
 * <br/>Otherwise calls the rerun.sh script
 * @type function
 *
 * @returns {void}
 */
const runTests = askWrap(async (cmd, options) => {

  // Set the run script based on if tests have been run or not
  const script = cliConfig.firstRun ? `testGrid` : `rerun`

  // Toggle first run to false so we know the tests have been run
  cliConfig.firstRun = false


  const opts = !options || !Array.isArray(options) || !options.length
    ? null
    : { env: { TEST_FILTER_TAGS: options.join(' ') } }

  // Execute the script
  await spawnCmd(`bash`, {
    args: [ `./scripts/${ script }.sh` ],
    cwd: testsRoot,
    ...(opts && { options: opts })
  })

  // Check if the tests should be archived
  return checkAutoArchive()

})

/**
 * Toggles the auto-archive option on and off
 * @type function
 *
 * @returns {void}
 */
const autoArchiveTests = askWrap(() => {

  // Toggle the autoArchive setting to be the opposite of what it is
  cliConfig.autoArchive = !cliConfig.autoArchive

  Logger.empty()
  Logger.highlight(`Auto archive test results set to`, `${ cliConfig.autoArchive }"`)
  Logger.empty()
  Logger.empty()

  return
})

/**
 * Checks if tests have been run
 * <br/>Then calls the archive.sh script
 * @type function
 *
 * @returns {void}
 */
const archiveTests = askWrap(() => {

  // Can only run archive after tests have been run
  // So check the first
  if(cliConfig.firstRun)
    return Logger.warn(`Tests must be run before they can be archived!`)

  clearTerminal()
  Logger.empty()

  return spawnCmd(`bash`, {
    args: [ `./scripts/archive.sh`, cliConfig.archiveDir ],
    cwd: testsRoot
  })

})

/**
 * Helper to show an error when unknown CLI cmd has been passed
 * @param {function} cmd - Cmd entered into the terminal
 * @type function
 *
 * @returns {void}
 */
const unknownCmd = askWrap(cmd => {
  Logger.empty()
  Logger.error(`Unknown command: "${ cmd }"`)
  Logger.empty()

  return
})


// TODO: Allow running tests by tag
// command should run something like -> node_modules\.bin\cucumber-js --tags @tag_name

/**
 * List of available commands that can be run
 * @type Object
 */
const commandList = {
  ar: { name: 'Archive', action: archiveTests, description: `Archive pervious tests results` },
  auto: { name: 'Auto', action: autoArchiveTests, description: `Toggle automatic archive of tests results on every run` },
  test: { name: 'test', action: runTests, description: `Run Keg-Regulator BDD tests` },
  q: { name: 'Quit', action: exitCLI, description: `Exit Keg-Regulator` },
}

/**
 * Prints available commands to the terminal
 * @type function
 *
 * @returns {void}
 */
const printCommands = () => {

  // Loops each command and show info on how to call them
  // Filter our some commands based on config settings
  Object.entries(commandList).map(([ cmd, meta ]) => {
    if(cmd === 'ar' && cliConfig.firstRun) return

    Logger.print(
      `  ${ Logger.colors.brightWhite('Command:') }`,
      `${ Logger.colors.brightCyan(cmd) }\n`, 
      ` ${ Logger.colors.brightWhite(`Description:`) }`,
      `${ Logger.colors.brightCyan(meta.description) }\n`,
    )
  })

  Logger.empty()
}

/**
 * Prints the CLI header to the terminal
 * @type function
 *
 * @returns {void}
 */
const printHeader = () => {
    const middle = `          Keg-Regulator Commands          `

    const line = middle.split('')
      .reduce((line, item, index) => (line+=' '))

    Logger.print(Logger.colors.underline.gray(line))
    Logger.print(line)
    Logger.print(middle)
    Logger.print(Logger.colors.underline.gray(line))

    Logger.empty()
  
}

/**
 * Asks the user to input a command
 * <br/>Then calls the function tied to the entered command
 * @type function
 *
 * @returns {void}
 */
const askForCommand = async () => {

  const command = await ask.input(`Enter a command`)

  const [ cmd, ...options ] = command.split(' ')

  // Get the meta data for the entered command
  const meta = commandList[cmd]

  // If no meta, then run the unknown cmd method
  // Otherwise call the action for the cmd
  return !meta
    ? unknownCmd(cmd)
    : meta.action(cmd, options)

}

/**
 * Renders the CLI ui, and asks the user to enter a command
 * @type function
 *
 * @returns {void}
 */
const renderUI = async () => {

  try {

    // Print the header and commands
    printHeader()
    printCommands()

    // Ask the user which command to run 
    await askForCommand()

  }
  catch(err){
    Logger.error(err.stack)
    process.exit(1)
  }

}

clearTerminal()
renderUI()