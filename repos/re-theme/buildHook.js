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
  catch(err){
    console.error(err.stack)
  }

}

// Not being used at the moment, but it keeping incase we need it in the future
export default function buildHook(platform){
  return {
    name: 'buildHook',
    buildEnd: async () => {
      return

      try {

        // if(!process.env.DOC_APP_PATH || platform === 'native') return
        // const hookFile = path.join(process.env.DOC_APP_PATH, 'src/retheme-hook.js')
        // await runCmd(`rm -rf ${ hookFile }`)
        // await runCmd(`echo "import '../node_modules/@simpleviewinc/re-theme/build/cjs'\n\nconst time=new Date()\n export { time }" > ${ hookFile }`)

      }
      catch(err){
        console.error(err.stack)
      }

    }
  }
} 