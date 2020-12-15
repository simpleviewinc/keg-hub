### Spawn-CMD
  * Cross-Platform child_process library for Node

### Dependencies
* [app-root-path](https://github.com/inxilpro/node-app-root-path)
* [@keg-hub/jsutils](https://github.com/lancetipton/@keg-hub/jsutils)
* [tree-kill](https://github.com/pkrumins/node-tree-kill)
* [cross-spawn](https://github.com/moxystudio/node-cross-spawn)
* [shell-exec](https://github.com/tiaanduplessis/shell-exec)

## Install

  * Install with 'yarn' or 'npm'
    ```js
      // With Yarn
      yarn add @keg-hub/spawn-cmd
      // With NPM
      npm install @keg-hub/spawn-cmd
    ```
  * Add to your code
    ```js

      // * Require code
      const { spawnCmd } = require('@keg-hub/spawn-cmd')

      // Spawns a new terminal session and runs `ls -la` inside of it
      await spawnCmd('ls -la')

      // Pass in a config object as the second argument
      // See more information about the config in the config section
      const config = { args: [ '-la' ] cwd: __dirname }
      await spawnCmd('ls', config)

      // Pass in a directory to run the command from as the third argument
      const config = { args: [ '-la' ] cwd: __dirname }
      await spawnCmd('ls', config, path.join(__dirname, '../'))

    ```

### Config Object
  * args <Array> - Arguments to pass to the spawned command
  * cwd - Directory to run the command from
    * This can be overwirtten by passing the cwd as a third argument
  * onExit <Function> - Called when the process exits
  * onStdErr <Function> - Called on stderr output
  * onError <Function> - Called on an error other then stderr
  * onStdOut <Function> - Called on stdout
  * options <Object> - Settings to pass to the spawned process
    * Is joined with the default settings below
      ```js
        defaultSettings = {
          gid: process.getgid(),
          uid: process.getuid(),
          env: process.env,
          cwd: rootDir, // Project root directory, NOT spawn-cmd directory
          stdio: 'inherit',
        }
      ```

### Extra Command
 **asyncCmd**
  * Extra command that wraps around nodes `child_process.exec`
  * Makes it a promise wrapped in a try/catch
  * Also adds the commands exit code
  * Promise resolves consistently
  * Example => 
      ```js
        const { asyncCmd } = require('@keg-hub/spawn-cmd')
        
        ;(()=>{

          const { error, data, exitCode } = await asyncCmd('echo test')

          // String output of stderr
          console.log(error)

          // String output of stdout
          console.log(data)

          // Numbered exit code from the command
          // 0 === success, anything else is exit from error
          console.log(exitCode)

        })()
        

      ```