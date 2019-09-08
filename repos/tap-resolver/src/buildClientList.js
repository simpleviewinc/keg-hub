const fs = require('fs')
const path = require('path')
const { get } = require('jsutils')
const { isDirectory, pathExists, validateApp } = require('./helpers')


/**
 * Adds a folder's sub-folders to an object as key = sub-folder name, value = sub-folder path.
 * @param {string} clientsList - path to parent folder to search for sub-folders
 * @param {Object} found - perviously found sub-folders
 * @param {Object} appConfig - Global app configuration
 *
 * @return {Object} updated passed in found object
 */
const loopClients = (clientsList, found={}, appConfig={}) => {

  // ensure the clients directory exists
  return isDirectory(clientsList)
    ? fs
      .readdirSync(clientsList)
      .reduce((allClients, name) => {

        // Don't add the root app to the all clients
        if(name == appConfig.name) return allClients

        // Create the client path
        const clientPath = path.join(clientsList, name)
        
        // Check if it's a directory
        if(isDirectory(clientPath))
          allClients[name] = clientPath

        // return the clients
        return allClients
      }, found)
    : {}
}

/**
 * Searches the node_modules and local clients folders for clients.
 * @param {string} nodeModuleClients - Path to node_modules clients folder
 * @param {string} localClients - path to local clients folder
 *
 * @return {Object} - found clients
 */
const clientFolders = async (nodeModuleClients, localClients, appConfig) => {
  // Check the node_module clients folder exists
  const existsNM = await pathExists(nodeModuleClients)

  // Get all node_module clients
  const foundNM = existsNM ? loopClients(nodeModuleClients, {}, appConfig) : {}

  // Check the local clients folder exists
  const existsLocal = await pathExists(localClients)

  // Get all local clients, overwrite and duplicate node_module clients
  const clients = existsLocal ? loopClients(localClients, foundNM, appConfig) : foundNM

  return clients
}

/**
 * Generates a client image cache file, which allows loading client specific images.
 * @param {string} appRoot - Base directory of the app
 * @param {Object} appConfig - Global app configuration
 *
 * @return {void}
 */
module.exports =  async (appRoot, appConfig) => {

  // Ensure the required app data exists
  validateApp(appRoot, appConfig)
  
  const {
    externalClients,
    localClients,
    clientList,
    clientListFile
  } = get(appConfig, [ 'clientResolver', 'paths' ], {})

  // Check for local client path
  const localClient = path.join(appRoot, localClients)

  // Check for external client path
  const nodeModuleClient = path.join(appRoot, externalClients)

  // Get's all the client folders in nm and locally
  let clientsObj = await clientFolders(nodeModuleClient, localClient, appConfig)
  
  // Get all the client names
  const allNames = Object.keys(clientsObj)

  // Convert the clientsObj into a string of key / value pair - client name / client path
  const clientsStr = Object
    .entries(clientsObj)
    .reduce((allClients, [ name, path ], index) => {

      // Check if it's the last client
      const end = index === (allNames.length - 1) ? '' : ',\n'

      // Add the key value pair
      allClients += `  '${name}': '${path}'${end}`

      // Return the clients string
      return allClients
    }, '')

  // Add the found clients to the list of clients
  const clientListData = `const clientPaths = {\n${clientsStr}\n}\nexport default clientPaths`

  // Build the clientList path
  const clientListPath = path.join(appRoot, clientList, clientListFile || 'clientList.js')
  
  // Write the clients file
  fs.writeFileSync(clientListPath, clientListData, 'utf8')
}
