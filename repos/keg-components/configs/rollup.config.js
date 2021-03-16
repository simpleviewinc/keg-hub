import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import alias from '@rollup/plugin-alias'
import buildHook from './buildHook'

const { getAliases } = require('./aliases.config')

const { DEV_MODE, BUILD_HOOK } = process.env
const babelConfig = require('./babel.config.js')

const path = require('path')
const fs = require('fs')

/**
 * gets the files at a given directory
 * @param {string} dir 
 * @param {Array<string>} exclude - used to filter out the files 
 * 
 * @returns {Array<string>} - a list of the file names with extension
 */
const getFilesFromDir = (dir, exclude=[]) => {
  const files = fs.readdirSync(dir)
  return exclude.length 
    ? files.filter(file => !exclude.some(excludeItem => file.includes(excludeItem))) 
    : files
}

const parentFolders = [
  'components',
  'hocs',
  'hooks',
  'utils'
]

const getIgnoreList = (isNative) => [
  // folders
  'internal',
  '__tests__',

  // files
  '.stories.',
  '.examples.',
  '.wrapper.',
  'index.js',
  !isNative && '.native.'
]

/**
 * returns the .native counterpart if it exists
 * @param {string} current - current filename
 * @param {Array<string>} list - array containing the files available
 * 
 * @returns {string|null}
 */
const getNativeFile = (current='', list=[]) => {
  return list.find(element => 
    element === current.replace('.js', '.native.js')
  ) || null
}

/**
 * Creates the mapping per directory
 * @param {string} dir
 * @param {boolean} isNative - if we're building for native or not
 * @param {Array<string>} items - array containing filenames and/or folder names
 * @param {Array<string>} ignoreList - which file/folders to ignore
 * 
 * @returns {object}
 */
const createExportMappings = (dir, isNative, items=[], ignoreList=[]) => {

  return items.reduce((obj, item) => {
    const newPath = path.join(dir, item)
    const isDir = fs.lstatSync(newPath).isDirectory()

    // if item is a folder, go iterate over it
    if (isDir) {
      const newItems = getFilesFromDir(newPath, ignoreList)
      const newObj = createExportMappings(newPath, isNative, newItems, ignoreList)
      // append to the original object
      Object.assign(obj, newObj)
    }
    else {
      const nativeFile = isNative && getNativeFile(item, items)
      const file = nativeFile || item
      const nameWithoutExtension = file.split('.')[0] || file
      Object.assign(obj, {
        // ex: button: 'dir/button.js'
        [nameWithoutExtension]: path.join(dir, file)
      })      
    }
    return obj

  }, {})
}

/**
 * dynamically generates the export mapping per file
 * @param {string} rootDir 
 * @param {string} platform - web or native
 * 
 * @returns {object} - something like 
 *   native: { linearGradient: src/components/linearGradient/linearGradient.native.js,... }
 *   web: { linearGradient: 'src/components/linearGradient/linearGradient.js', ... }
 */
const getMappings = (rootDir, platform) => {
  
  const isNative = platform === 'native'
  const ignoreList = getIgnoreList(isNative)
  
  const rootArr = getFilesFromDir(rootDir, ignoreList)
  const inputs = {}
  rootArr.forEach((val) => {
    if (!parentFolders.includes(val)) return

    const newPath = path.join(rootDir, val)
    const newList = getFilesFromDir(newPath, ignoreList)
    Object.assign(inputs, createExportMappings(newPath, isNative, newList, ignoreList))
  })

  return inputs
}

 /**
  * setup the input files for specific exports
  * @param {string} platform - web or native
  * 
  * @returns {object} - object containing specific exports
  */
const getInputs = (platform) => {
  return {
    theme: 'src/theme',
    index: 'src/index.js',
    ...getMappings('./src', platform)
  }
}

const shared = {
  external: [
    'react',
    'react-dom',
    'react-native',
    '@keg-hub/jsutils',
    '@keg-hub/re-theme',
    '@keg-hub/re-theme/colors',
    '@keg-hub/re-theme/styleInjector',
    '@keg-hub/re-theme/styleParser',
    'prop-types',
    'expo-fonts',
    'react-native-svg-web',
    'react-native-svg',
    'react-native-linear-gradient'
  ],
  watch: {
    clearScreen: false
  },
  plugins: platform => ([
   BUILD_HOOK === platform && DEV_MODE && buildHook(DEV_MODE),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        "process.env.RE_PLATFORM": JSON.stringify(platform),
        "process.env.PLATFORM": JSON.stringify(platform),
        "import 'prop-types';": "",
      }
    }),
    resolve(),
    json(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      ...babelConfig
    }),
    sourcemaps(),
    cleanup(),
  ])
}

export default Array
  .from([ 'web', 'native' ])
  .map(platform => {
    const ext = platform !== 'web' ? `.${platform}` : ''

    return {
      ...shared,
      input: getInputs(platform),
      output: [
        {
          dir: `./build/cjs/${platform}`,
          format: 'cjs',
          sourcemap: true
        },
        {
          dir: `./build/esm/${platform}`,
          format: 'esm',
          sourcemap: true
        },
      ],
      ...(process.env.DOC_APP_PATH && { watch: { chokidar: false } } || {}),
      plugins: [
        ...shared.plugins(platform),
        alias({
          entries: getAliases(ext),
        })
      ]
    }
  })

