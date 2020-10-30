import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import cleanup from 'rollup-plugin-cleanup'
import sourcemaps from 'rollup-plugin-sourcemaps'
import alias from '@rollup/plugin-alias'
import buildHook from './buildHook'
import { create } from 'domain'
const { getAliases } = require('./aliases.config')

const { DEV_MODE, BUILD_HOOK } = process.env
const babelConfig = require('./babel.config.js')

const path = require('path')
const fs = require('fs')

const getFilesFromDir = (dir, exclude=[]) => {
  const files = fs.readdirSync(dir)
  // if any file/folder name matches what's in the exclude array, filter it out
  return exclude.length 
    ? files.filter(file => !exclude.some(excludeItem => file.includes(excludeItem))) 
    : files
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const removeExtension = file => {
  return file.split('.').slice(0, -1).join('.')
}
const createComponentName = component => {
  let tempComponentName
  tempComponentName = removeExtension(component)
  tempComponentName = capitalizeFirstLetter(tempComponentName)
  return tempComponentName
}
const checkFilesAndChildren = (items, rootDir) => {
  return items.reduce((components, item) => {
    if(item === 'index.js') return components

    // indexChildFolder(path.join(rootDir, item))

    const tempItem = {}
    tempItem['name'] = createComponentName(item)
    tempItem['file'] = item
    components.push(tempItem)

    return components
  }, [])
}

const parentFolders = [
  'components',
  // 'hocs',
  // 'hooks',
  // 'theme', // don't think we need this exported in the bundl
  // 'utils'
]

const ignoreList = [
  // folders
  'internal',
  '__tests__',

  // files
  // 'index.js', // only ignore in the rootArray
  '.stories.',
  '.examples.',
  '.wrapper.',
  '.native.'
]

const createObject = (dir, items=[]) => {

  const obj = {}
  console.log(items)
  items.forEach((item) => {
    const newPath = path.join(dir, item)
    const isDir = fs.lstatSync(newPath).isDirectory()

    // if item is a folder, go iterate over it
    if (isDir) {
      const newItems = getFilesFromDir(newPath, ignoreList)
      const newObj = createObject(newPath, newItems)
      // append to the original object
      Object.assign(obj, newObj)
    }
    else {
      // ex: button: 'src/components/button',
      // take the index file of that
      const indexPath = path.join(dir, 'index.js')
      fs.existsSync(indexPath) &&
        Object.assign(obj, {
          [item.replace('.js', '')]: indexPath
        })        
        // obj[item.replace('.js', '')] = indexPath
    }

  })

  return obj
}
const getFiles = (rootDir) => {
  const rootArr = getFilesFromDir(rootDir, [...ignoreList, 'index.js'])
  console.log(rootArr, 'root dirs')

  const inputs = {}
  rootArr.forEach((val) => {
    
    if (!parentFolders.includes(val)) return
    // parentList will always be a folder structure - TODO account for files
    const newPath = path.join(rootDir, val)
    const newList = getFilesFromDir(newPath, ignoreList)
    Object.assign(inputs, createObject(newPath, newList))
  })

  return inputs
}

// TODO:
/**
 * right now even .native is being compiled together
 * getAliases resolves this if input is the index.js
 * put any files that has a web and native counterpart in a folder so the alias plugin can pick it up
 */
const files = getFiles('./src')
console.log(files,'files')
const inputs = {
  svgIcons: 'src/assets/icons/svgIcon',
  ...files,
  index: 'src/index.js' // testing
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
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.RE_PLATFORM": JSON.stringify(platform),
      "process.env.PLATFORM": JSON.stringify(platform),
    }),
    resolve(),
    json(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
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
      input: inputs,//`./src/index.js`,
      output: [
        {
          dir: `./build/esm/${platform}`,
          // dir: `./build/cjs/kegComponents${ext}`,
          format: 'cjs',
          sourcemap: true
        },
        {
          dir: `./build/esm/${platform}`,
          // dir: `./build/esm/kegComponents${ext}`,
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

