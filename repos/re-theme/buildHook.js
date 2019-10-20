const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)

const runCmd = async (cmd) => {
  try {
    const output = await cmdExec(cmd)
    return output
  }
  catch(e){
    console.log(e.stack)
  }
  
}

export default function buildHook(){
  return {
    name: 'buildHook',
    buildEnd: async () => {

      await runCmd('rm -rf ~/zerista/repos/sv-keg/core/base/re-theme-touch.js')
      await runCmd('touch ~/zerista/repos/sv-keg/core/base/re-theme-touch.js')
      console.log(`---------- Finished Copy re-theme Files ----------`)
      // return new Promise((res, rej) => {

        // console.log(`---------- Copy ReTheme Files ----------`)
        // setTimeout(async () => {
        //   await runCmd('rm -rf ~/zerista/repos/sv-keg/node_modules/re-theme/src')
        //   await runCmd('rm -rf ~/zerista/repos/sv-keg/node_modules/re-theme/build')
        //   await runCmd('rm -rf ~/zerista/repos/sv-keg/node_modules/re-theme/index.js')
        // }, 100)

        // setTimeout(async () => {
        //   await runCmd('cp -Rf ~/zerista/repos/ReTheme/src ~/zerista/repos/sv-keg/node_modules/re-theme/src')
        //   await runCmd('cp -Rf ~/zerista/repos/ReTheme/index.js ~/zerista/repos/sv-keg/node_modules/re-theme/index.js')
        //   await runCmd('cp -Rf ~/zerista/repos/ReTheme/build ~/zerista/repos/sv-keg/node_modules/re-theme/build')
        // }, 100)

        // await runCmd('rm -rf ~/zerista/repos/sv-keg/core/base/re-theme-touch.js')
        // await runCmd('touch ~/zerista/repos/sv-keg/core/base/re-theme-touch.js')
        // console.log(`---------- Finished Copy re-theme Files ----------`)
      // })
    }
  }
}