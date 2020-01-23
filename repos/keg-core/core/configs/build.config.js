const path = require('path')
const rootDir = require('app-root-path').path
const appConf = require('tap-resolver/src/getAppConfig')(rootDir, true, false)
const { get, deepMerge } = require('jsutils')
const { AWS_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, NODE_ENV, ENV, TAP, AWS_PROFILE } = process.env

// Gets the base or tap to be deployed
const deployType = TAP || 'base'

const awsConfig = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
}

/**
 * Setup the build export folder
 *
 * @returns {string} - path where the build should be exported
 */
const getExportPath = () => {

  // Gets the build path from the app.json
  const exportFolder = get(appConf, [ 'keg', 'paths', 'exportFolder' ])

  if(!exportFolder)
    throw new Error(`Build Failed! No exportFolder path exists at keg.paths.exportFolder in the app.json`)

  // Setup the build export folder
  return exportFolder && path.join(rootDir, exportFolder, deployType)
}

/**
 * Default config for settings shared across all ENVs
 * @param {string} exportTo - location where the compiled app should be exported
 * @param {string} s3UploadPath - S3 bucket path, where the export should be uploaded
 *
 * @returns {Object} - default build config
 */
const defaultConfig = exportTo => ({
  paths: {
    // Where the compiled build should be exported
    exportTo,
  },
  aws: {
    profile: AWS_PROFILE,
    credentials: { ...awsConfig },
    s3: {
      bucket: AWS_BUCKET,
      options: {
        useFoldersForFileTypes: false
      }
    },
  },
  commands: {
    build: {
      args: [ 'build' ],
      cmd: 'next'
    },
    export: {
      args: [
        'export',
        '-o', exportTo,
        '--threads', 1,
        '--concurrency', 1
      ],
      cmd: 'next'
    }
  }
})

/**
 * Gets the default config, and merges it with the current ENV config
 * @param {Object} appConf - App.json config from project root
 * @param {string} s3UploadPath - S3 bucket path, where the export should be uploaded
 *
 * @returns {Object} - default build config
 */
module.exports = appConf => {

  const exportTo = getExportPath()
  
  // ENV specific config settings
  // Used to change things like S3 upload folder
  const config = {
    development: {},
    staging: {},
    qa: {},
    production: {}
  }
  
  // Merge the default config with the ENV config, then return
  return deepMerge(
    defaultConfig(exportTo),
    config[ENV || 'development']
  )
}