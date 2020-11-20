const path = require('path')
const { Logger } = require('KegLog')
const platform = require('os').platform()
const qrcode = require('qrcode-terminal')
const { DOCKER } = require('KegConst/docker')
const { isObj, isStr } = require('@keg-hub/jsutils')
const { CONTAINER_PREFIXES, CLI_ROOT } = require('KegConst/constants')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { PACKAGE, IMAGE } = CONTAINER_PREFIXES
const { pipeCmd } = require('KegProc')

const NODE_MODULES_BIN = path.join(CLI_ROOT, `node_modules/.bin`)
const NGROK_BIN = './ngrok' + (platform === 'win32' ? '.exe' : '')

/**
 * Adds the http protocol to the found host header if it does not exist
 * @function
 * @param {string} hostHeader - Host Head used in the docker container application
 *
 * @returns {string} - Host Header with the http protocol added
 */
const addHostHeaderProto = hostHeader => {
  return hostHeader.indexOf('http') === 0
    ? hostHeader
    : `http://${hostHeader}`
}


/**
 * Adds the KEG_PROXY_HOST if it does not exist on the passed in host
 * @function
 * @param {string} host - Custom host to use for the proxy tunnel
 *
 * @returns {string} - Host Header with the KEG_PROXY_HOST added if needed
 */
const buildCustomHostHeader = host => {
  const fullHost = host.indexOf('.') !== -1
    ? host
    : `${host}.${DOCKER.KEG_PROXY_HOST}`
  
  return addHostHeaderProto(fullHost)
}

/**
 * Gets the host name from the containers name
 * <br/>Removes PACKAGE && IMAGE from the name
 * <br/>This will fail with using a NON-injected tap and no label exists
 * @function
 * @param {string} containerName - Name of the container
 *
 * @returns {string} - Name of the container with the KEG_PROXY_HOST added
 */
const getHostFromName = (containerName) => {
  const cleaned = containerName.replace(`${PACKAGE}-`, '').replace(`${IMAGE}-`, '')

  return `${cleaned}.${DOCKER.KEG_PROXY_HOST}`
}

/**
 * Gets the host header from the docker containers labels
 * @function
 * @param {Object} container - Docker container object from the docker cli
 *
 * @returns {string} - Host found in the docker containers labels
 */
const getHostFromLabel = (container={}) => {
  let hostHeader
  const labelsStr = container.labels
  const labelsObj = container.labelsObj
  
  if(!isObj(labelsObj) && isStr(labelsStr)){
    return labelsStr.indexOf('.rule=Host(`') === -1
      ? labelsStr.split('.rule=Host(`')[1].split('`),')[0]
      : false
  }

  hostHeader = Object.values(labelsObj)
    .reduce((host, value) => {
      return host || !value || value.indexOf('Host(`') === -1
        ? host
        : value.split('`')[1]
    }, '')

  return hostHeader || Object.entries(labelsObj)
    .reduce((host, [key, value]) => {
      return key === `com.keg.proxy.domain`
        ? `${value}.${DOCKER.KEG_PROXY_HOST}`
        : host
    }, '')
}

/**
 * Asks the user to select a docker container
 * <br/>Then gets the host header from it's name or labels
 * @function
 * @param {string} host - Custom host name to use passed in from the command line
 *
 * @returns {string} - Host Header found from the selected docker container
 */
const getHostHeader = async host => {
  if(host) return buildCustomHostHeader(host)

  const container = await containerSelect(containers => containers.filter(container => container.name !== 'keg-proxy'))

  return addHostHeaderProto(getHostFromLabel(container) || getHostFromName(container.name))
}

// TODO: Add better parsing for the log message
/**
 * Callback for the standard out of the ngrok process
 * <br/>Looks for the started tunnel message, and parses the ngrok url
 * <br/>Displays a QR code with or the ngrok url for easy access
 * @function
 * @param {boolean} qr - Should a qr code be displayed
 * @param {boolean} log - Should messages be logged
 * @param {boolean} tunnelSet - Has the ngrok tunnel be setup
 *
 * @returns {function} - Standard out callback for the ngrok process
 */
const onStdOut = (qr, log, tunnelSet=false) => {

 /**
  * Return a callback used by the ngrok process to log message
  * <br/>This is used to parse the ngrok tunnel url so it can be displayed 
  * <br/>We also use it to create a QR code for easy access
  * @function
  * @param {string} data - Output from the standard out ngrok process
  *
  * @returns {void}
  */
  return data => {

    // If logging is turned on and it's not the started tunnel message, then log the data
    if(tunnelSet || data.indexOf(`msg="started tunnel"`) === -1)
      return tunnelSet && log && Logger.stdout(data)

    // Set tunnel set to true so we can start logging
    tunnelSet = true

    const localUrl = data.split(`addr=`)[1].split(' ')[0]
    Logger.spacedMsg('Source:', Logger.color('magenta', localUrl))

    const tunnelUrl = data.split(`url=`)[1].split(' ')[0].split('\n')[0]
    Logger.spacedMsg('Tunnel:', Logger.color('green', tunnelUrl))

    // If no qr code is set then just return
    if(!qr) return

    // Show a qr code on the terminal that the user can use to quickly access the tunnel on a mobile device
    qr && qrcode.generate(tunnelUrl, { small: false })
    // Set the qr to false to we only log out one qr code
    qr = false

    Logger.empty()
  }

}

/**
 * Create a public tunnel the the url (by default, to `kegdev.xyz`)
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.params - arguments passed from the command line
 *
 * @returns {void}
 */
const tunnel = async args => {
  const { params } = args
  const { qr, source, port, host, log } = params

  const hostHeader = await getHostHeader(host)
  !hostHeader && Logger.warn('Could not find a valid host header from container meta-data!')

  const srcUri = source || port || `${DOCKER.PREFIXED.KEG_DOCKER_IP}:80`
  
  Logger.header('Starting tunnel...', 'white')

  let ngrokCmd = `${NGROK_BIN} http --log=stdout`
  hostHeader
    ? (ngrokCmd += ` -host-header=rewrite ${hostHeader}`)
    : (ngrokCmd += ` ${srcUri}`)

  await pipeCmd(ngrokCmd.trim(), {
    cwd: NODE_MODULES_BIN,
    onStdOut: onStdOut(qr, log),
  })

}

module.exports = {
  tunnel: {
    name: 'tunnel',
    alias: [ 't', 'tl', 'tn', 'tnl', 'tun', 'ngrok' ],
    action: tunnel,
    description: 'Creates a public tunnel to the running docker container available at kegdev.xyz',
    example: 'keg docker tunnel <options>',
    options: {
      host: {
        alias: [ 'header', 'rewrite' ],
        description: "Override the host header of the tunnel. By default, it uses the first found docker-package url",
        example: "keg docker tunnel --host core-develop"
      },
      qr:  {
        description: 'if true, `tunnel` will display a qr code that encodes the tunnel\'s public uri. This can make connecting a mobile device to the tunnel much easier.',
        example: 'keg docker tunnel --qr false',
        default: true,
      },
      source: {
        description: "optional override for the source url or ip of the tunnel. By default, this command tunnels kegdev.xyz",
        alias: [ 'src', 'url', 'ip' ],
        example: "keg docker tunnel --src http://localhost:19006"
      },
      port: {
        description: 'optional override for the source of the tunnel, using this specified port of localhost instead.',
        example: 'keg docker tunnel --port 19006',
      },
      log: {
        description: 'Log output from the tunnel process',
        example: 'keg docker tunnel --log',
        default: false
      }
    }
  }
}