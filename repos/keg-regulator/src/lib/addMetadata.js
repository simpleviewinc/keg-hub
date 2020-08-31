const fs = require('fs')
const { FileNotFoundError, FileEmptyError } = require('../utils/error')


/**
 * Updates the cucumber test output json file with metadata about the browser
 * @param {string} jsonFilePath - filepath to json file
 * @param {Object} options - metadata
 * @param {string} options.browser - browser the tests were run on
 * @param {string} options.browserVersion - version of browser
 * @param {string} options.platform - os/platform 
 * @param {string} options.platformVersion - version of platform
 * @throws {FileNotFoundError} if file not found
 * @throws {FileEmptyError} if file is found, but is empty or an empty array
 * @returns {void}
 */
const updateCucumberJSON = (jsonFilePath, options={}) => {
  if (!jsonFilePath) throw new Error('Expected jsonFilePath to be defined')
  const { 
    browser='chrome', 
    platform='linux', 
    platformVersion='latest', 
    browserVersion='latest' 
  } = options

  console.log(`Updating ${jsonFilePath} with metadata browser=${browser}, version=${browserVersion}`)

  // read the file's contents
  if (!fs.existsSync(jsonFilePath)) 
    throw new FileNotFoundError(jsonFilePath)

  const content = fs.readFileSync(jsonFilePath, 'utf8')
  if (!content)
    throw new FileEmptyError(jsonFilePath)
  
  const features = JSON.parse(content)
  if (!features || !features.length)
    throw new FileEmptyError(jsonFilePath)

  // create the new array of feature reports with metadata added
  const updatedFeatures = features.map(json => ({
    ...json,
    metadata: {
      ...(json.metadata || {}),
      device: 'Virtual Machine',
      browser: {
        name: browser,
        version: browserVersion
      },
      platform: {
        name: platform,
        version: platformVersion
      },
      timestamp: (new Date()).toString()
    }
  }))

  // write the file back
  fs.writeFileSync(
    jsonFilePath, 
    JSON.stringify(updatedFeatures)
  )
}

/**
 * Command line docs
 * Example: node addMetadata.js ./src/output/chrome.json chrome latest
 * @param arg1: file path to cucumber json
 * @param arg2: browser name
 * @param arg3: browser version (latest by default)
 */
const [ filepath, browser, version ] = process.argv.slice(2)

try {
  updateCucumberJSON(filepath, { browser, version })
}
catch (err)  {
  err instanceof FileNotFoundError || err instanceof FileEmptyError
    // this can happen if the user specified a tags filter that resulted in no json result output. It's not necessarily an error
    ? console.log('Cucumber json results not found. Skipping adding metadata to report...')
    // anything else should be an error
    : console.error(err)
}
