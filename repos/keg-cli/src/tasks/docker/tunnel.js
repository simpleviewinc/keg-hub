const ngrok = require('ngrok')
const { Logger } = require('KegLog')
const qrcode = require('qrcode-terminal')
const { DOCKER } = require('KegConst/docker')
const { isObj, isStr } = require('@keg-hub/jsutils')
const { CONTAINER_PREFIXES } = require('KegConst/constants')
const { containerSelect } = require('KegUtils/docker/containerSelect')
const { PACKAGE, IMAGE } = CONTAINER_PREFIXES

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
  const { qr, source, port, host } = params

  const hostHeader = await getHostHeader(host)
  !hostHeader && Logger.warn('Could not find a valid host header from container meta-data!')

  const srcUri = source || port || `${DOCKER.PREFIXED.KEG_DOCKER_IP}:80`
  
  Logger.header('Starting tunnel...', 'white')

  const tunnelUrl = await ngrok.connect({
    host_header: hostHeader,
    addr: srcUri
  })

  Logger.spacedMsg('Source:', Logger.color('magenta', srcUri))
  Logger.spacedMsg('Tunnel:', Logger.color('green', tunnelUrl))

  // show a qr code on the terminal that the user can use to quickly access the tunnel on a mobile device
  qr && qrcode.generate(tunnelUrl, { small: false })
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
      }
    }
  }
}